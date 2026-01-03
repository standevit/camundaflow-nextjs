import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    
    console.log("🔵 /api/projects/save - Session:", session?.user?.email);
    
    if (!session || !session.user?.email) {
      console.error("❌ Unauthorized - no session");
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await req.json();
    const { 
      projectName, 
      description, 
      coreFeatures,
      costBreakdown, 
      timeline, 
      techStack, 
      optionalFeatures,
      totalWithAllOptions
    } = body;

    console.log("📦 Received body:", { 
      projectName, 
      description, 
      coreFeatures,
      costBreakdown, 
      timeline, 
      techStack, 
      optionalFeatures,
      totalWithAllOptions 
    });

    if (!projectName) {
      console.error("❌ Missing projectName");
      return NextResponse.json(
        { error: "Project name is required" },
        { status: 400 }
      );
    }

    // Save project to ProjectRequest with COMPLETE requirements JSON
    const project = await prisma.projectRequest.create({
      data: {
        projectName: projectName,
        projectType: "cost-configurator",
        description: description || "",
        requirements: JSON.stringify({
          coreFeatures,
          costBreakdown,
          timeline,
          techStack,
          optionalFeatures,
          totalWithAllOptions,
        }),
        userName: session.user.name || "User",
        userEmail: session.user.email,
        status: "generated",
        estimatedPrice: costBreakdown?.base_price_eur || 0,
      },
    });

    console.log("✅ Project saved:", project.id);

    return NextResponse.json(
      { success: true, projectId: project.id },
      { status: 201 }
    );
  } catch (error) {
    console.error("❌ Save project error:", error);
    const errorMessage = error instanceof Error ? error.message : String(error);
    return NextResponse.json(
      { error: `Failed to save project: ${errorMessage}` },
      { status: 500 }
    );
  }
}
