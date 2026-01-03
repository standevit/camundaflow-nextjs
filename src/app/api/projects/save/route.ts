import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import prisma from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    
    if (!session || !session.user?.email) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await req.json();
    const { projectName, description, costBreakdown, timeline } = body;

    if (!projectName) {
      return NextResponse.json(
        { error: "Project name is required" },
        { status: 400 }
      );
    }

    // Save project to ProjectRequest
    const project = await prisma.projectRequest.create({
      data: {
        projectName: projectName,
        projectType: "cost-configurator",
        description: description || "",
        requirements: JSON.stringify({
          costBreakdown,
          timeline,
        }),
        userName: session.user.name || "User",
        userEmail: session.user.email,
        status: "generated",
        estimatedPrice: costBreakdown?.base_price_eur || 0,
      },
    });

    return NextResponse.json(
      { success: true, projectId: project.id },
      { status: 201 }
    );
  } catch (error) {
    console.error("Save project error:", error);
    const errorMessage = error instanceof Error ? error.message : String(error);
    return NextResponse.json(
      { error: `Failed to save project: ${errorMessage}` },
      { status: 500 }
    );
  }
}
