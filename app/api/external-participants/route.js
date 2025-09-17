// app/api/external-participants/route.ts
import {NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';

const prisma = new PrismaClient();

// Validation schema
const externalParticipantSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100),
  collegeName: z.string().min(2, 'College name must be at least 2 characters').max(200),
  year: z.number().int().min(1).max(6, 'Year must be between 1 and 6'),
  phone: z.string().regex(/^\+?[\d\s-()]{10,15}$/, 'Invalid phone number format'),
  branch: z.string().min(2, 'Branch must be at least 2 characters').max(100),
  city: z.string().min(2, 'City must be at least 2 characters').max(100),
  teamId: z.string().optional(), // Optional team assignment
});

export async function POST(request) {
  try {
    const body = await request.json();
    
    // Validate input data
    const validatedData = externalParticipantSchema.parse(body);
    
    // Check if participant with same phone already exists
    const existingParticipant = await prisma.externalParticipant.findFirst({
      where: {
        phone: validatedData.phone
      }
    });
    
    if (existingParticipant) {
      return NextResponse.json(
        { 
          error: 'Participant with this phone number already registered',
          code: 'DUPLICATE_PHONE'
        },
        { status: 400 }
      );
    }
    
    // Create new external participant
    const participant = await prisma.externalParticipant.create({
      data: {
        name: validatedData.name,
        collegeName: validatedData.collegeName,
        year: validatedData.year,
        phone: validatedData.phone,
        branch: validatedData.branch,
        city: validatedData.city,
        teamId: validatedData.teamId || null,
      },
      include: {
        team: true, // Include team data if assigned
      }
    });
    
    return NextResponse.json({
      success: true,
      data: participant,
      message: 'Registration successful!'
    }, { status: 201 });
    
  } catch (error) {
    console.error('Registration error:', error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { 
          error: 'Validation failed',
          details: error.errors.map(err => ({
            field: err.path.join('.'),
            message: err.message
          }))
        },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const search = searchParams.get('search') || '';
    const college = searchParams.get('college') || '';
    const city = searchParams.get('city') || '';
    
    const skip = (page - 1) * limit;
    
    // Build where clause for filtering
    const where= {};
    
    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { collegeName: { contains: search, mode: 'insensitive' } },
        { branch: { contains: search, mode: 'insensitive' } },
      ];
    }
    
    if (college) {
      where.collegeName = { contains: college, mode: 'insensitive' };
    }
    
    if (city) {
      where.city = { contains: city, mode: 'insensitive' };
    }
    
    // Get participants with pagination
    const [participants, totalCount] = await Promise.all([
      prisma.externalParticipant.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          team: true,
        }
      }),
      prisma.externalParticipant.count({ where })
    ]);
    
    return NextResponse.json({
      success: true,
      data: participants,
      pagination: {
        page,
        limit,
        total: totalCount,
        totalPages: Math.ceil(totalCount / limit),
      }
    });
    
  } catch (error) {
    console.error('Fetch participants error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Get participant by ID
export async function GET_BY_ID(request, { params }) {
  try {
    const participant = await prisma.externalParticipant.findUnique({
      where: { id: params.id },
      include: {
        team: true,
      }
    });
    
    if (!participant) {
      return NextResponse.json(
        { error: 'Participant not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      success: true,
      data: participant
    });
    
  } catch (error) {
    console.error('Fetch participant error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}