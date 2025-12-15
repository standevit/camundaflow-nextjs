import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const messages = body.messages || [];

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
