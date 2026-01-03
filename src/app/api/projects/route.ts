import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    console.log('📝 POST /api/projects - primljen zahtjev:', {
      projectName: body.projectName,
      userEmail: body.userEmail,
      userName: body.userName,
      estimatedPrice: body.estimatedPrice,
    });

    // Validacija obaveznih polja
    if (!body.projectName || !body.description) {
      console.error('❌ Nedostaju obavezna polja');
      return NextResponse.json({
        success: false,
        error: 'Nedostaju obavezna polja: projectName, description',
      }, { status: 400 });
    }

    if (!body.userEmail) {
      console.error('❌ Nedostaje userEmail');
      return NextResponse.json({
        success: false,
        error: 'Nedostaje userEmail',
      }, { status: 400 });
    }
    
    const projectRequest = await prisma.projectRequest.create({
      data: {
        projectName: body.projectName,
        projectType: body.projectType || 'unknown',
        description: body.description,
        requirements: body.requirements || '',
        deadline: body.deadline || null,
        estimatedPrice: body.estimatedPrice || 0,
        userName: body.userName || 'Anonymous',
        userEmail: body.userEmail,
        status: 'pending',
      },
    });

    console.log('✅ Projekt je sprema sa ID:', projectRequest.id);

    return NextResponse.json({
      success: true,
      message: 'Projekt je uspješno sprema',
      data: projectRequest,
    }, { status: 201 });
  } catch (error) {
    console.error('❌ Greška pri čuvanju zahtjeva:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Greška pri čuvanju zahtjeva',
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
