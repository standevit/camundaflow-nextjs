import { NextRequest, NextResponse } from "next/server";

const MAX_CONTEXT_LENGTH = 8000; // characters limit per request (increased for system prompt)

const PAGE_CONTEXT: Record<string, string> = {
  "/": "Hauptseite / Homepage - Übersicht über CamundaFlow Services",
  "/microservices": "Microservices Architektur - Patterns, Best Practices und Implementierung",
  "/camunda": "Camunda Platform - BPMN Engine, Workflow Automation und Prozessorchestrierung",
  "/ai-agents": "KI-Agenten - Integration von AI Agents in Workflows und Prozessautomatisierung",
  "/leistungen": "Dienstleistungen - Angebotene Services und Beratung",
  "/references": "Referenzen - Projektbeispiele und Kundenprojekte",
  "/contact": "Kontaktseite - Kontaktformular und Kontaktinformationen",
  "/dashboard": "Dashboard - Benutzer Dashboard",
  "/login": "Login Seite - Benutzer-Anmeldung",
  "/model-context-protocol": "Model Context Protocol (MCP) - Integration und Verwendung"
};

function buildSystemPrompt(currentPage?: string): string {
  let contextInfo = "";
  if (currentPage && PAGE_CONTEXT[currentPage]) {
    contextInfo = `\n\nAKTUELLE SEITE: Der Benutzer befindet sich auf: ${PAGE_CONTEXT[currentPage]}\nWenn der Benutzer nach "was ist hier", "diese Seite", "wo bin ich" oder ähnlichem fragt, beziehe dich auf diese Seite.`;
  }
  
  return `Du bist ein spezialisierter AI-Assistent für CamundaFlow, eine Website über Workflow-Automatisierung und Business Process Management (BPM).${contextInfo}

DEINE AUFGABE:
- Beantworte NUR Fragen zu folgenden Themen:
  * Camunda Platform (BPMN Engine, Workflow Automation)
  * BPMN 2.0 (Business Process Model and Notation)
  * Prozessautomatisierung und Workflow-Management
  * Business Process Management (BPM)
  * Prozessorchestrierung
  * AI-Agenten in Workflows
  * Model Context Protocol (MCP)
  * Skalierbarkeit von Prozessen
  * Human-centric Workflows
  * Migration zu Camunda

WICHTIG:
- Antworte IMMER sehr kurz und präzise (2-4 Sätze maximal)
- Wenn die Frage NICHT mit diesen Themen zusammenhängt, antworte höflich: "Entschuldigung, ich bin ein spezialisierter Assistent für Camunda und Workflow-Automatisierung. Ich kann nur Fragen zu diesen Themen beantworten. Hast du Fragen zu BPMN, Prozessautomatisierung oder Camunda?"
- Sei freundlich, präzise und hilfsbereit
- Verwende Sprache die gefragt wird
- Gib kurze praktische Beispiele wenn nötig`;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const userMessages = body.messages || [];
    const currentPage = body.currentPage as string | undefined;
    const context = body.context as string | undefined;

    // If context is "cost-configurator", don't prepend system prompt (it's already in messages)
    // Otherwise, prepend the standard CamundaFlow assistant prompt
    let messages;
    if (context === "cost-configurator") {
      // CostConfigurator already has its own system prompt in messages
      messages = userMessages;
    } else {
      // Regular chat - add CamundaFlow system prompt
      const systemPrompt = buildSystemPrompt(currentPage);
      messages = [
        { role: "system", content: systemPrompt },
        ...userMessages
      ];
    }

    // Validate context length to prevent excessive token usage
    const contextLength = JSON.stringify(messages).length;
    console.log(`[API] Received ${messages.length} messages, ${contextLength} chars (max: ${MAX_CONTEXT_LENGTH})`);
    if (contextLength > MAX_CONTEXT_LENGTH) {
      return NextResponse.json(
        { error: `Context too long (${contextLength} chars, max ${MAX_CONTEXT_LENGTH}). Try shorter messages or fewer chat history.` },
        { status: 400 }
      );
    }

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: "OPENAI_API_KEY not set. Please add it to your environment." },
        { status: 400 }
      );
    }

    const modelName = (body.model as string) || process.env.OPENAI_MODEL;
    if (!modelName) {
      return NextResponse.json(
        { error: "No model specified. Set OPENAI_MODEL in environment or provide 'model' in request body." },
        { status: 400 }
      );
    }

    const temperature = body.temperature !== undefined ? body.temperature : undefined;

    const resp = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: modelName,
        messages,
        ...(temperature !== undefined && { temperature }),
        stream: true,
      }),
    });

    if (!resp.ok || !resp.body) {
      const text = await resp.text();
      return NextResponse.json({ error: text }, { status: resp.status });
    }

    const stream = new ReadableStream({
      async start(controller) {
        const reader = resp.body!.getReader();

        try {
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            // forward chunks directly
            controller.enqueue(value);
          }
        } catch (err) {
          console.error("stream error:", err);
        } finally {
          controller.close();
          reader.releaseLock();
        }
      },
    });

    return new NextResponse(stream, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache, no-transform",
        Connection: "keep-alive",
      },
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
