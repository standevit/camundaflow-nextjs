import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const projectRequest = await prisma.projectRequest.create({
      data: {
        projectName: body.projectName,
        projectType: body.projectType,
        description: body.description,
        requirements: body.requirements,
        deadline: body.deadline || null,
        estimatedPrice: body.estimatedPrice || 0,
        userName: body.userName,
        userEmail: body.userEmail,
        status: 'pending',
      },
    });

    return NextResponse.json({
      success: true,
      message: 'Projekt je uspješno sprema',
      data: projectRequest,
    }, { status: 201 });
  } catch (error) {
    console.error('Greška pri čuvanju zahtjeva:', error);
    return NextResponse.json({
      success: false,
      error: 'Greška pri čuvanju zahtjeva',
    }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const userEmail = request.nextUrl.searchParams.get('email');
    
    const projects = await prisma.projectRequest.findMany({
      where: userEmail ? { userEmail } : {},
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json({
      success: true,
      data: projects,
    });
  } catch (error) {
    console.error('Greška pri dohvatanju zahtjeva:', error);
    return NextResponse.json({
      success: false,
      error: 'Greška pri dohvatanju zahtjeva',
    }, { status: 500 });
  }
}
