import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '../auth/[...nextauth]/route'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// Generate a unique 6-character team code
function generateTeamCode() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  let result = ''
  for (let i = 0; i < 6; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return result
}

export async function POST(request) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
    }

    const { teamName, description } = await request.json()

    if (!teamName?.trim()) {
      return NextResponse.json({ error: 'Team name is required' }, { status: 400 })
    }

    // Check if user exists and is registered
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: {
        vitStudent: { include: { team: true } },
        externalParticipant: { include: { team: true } }
      }
    })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    if (!user.isRegistered) {
      return NextResponse.json({ error: 'User not registered' }, { status: 400 })
    }

    // Check if user already has a team
    const existingTeam = user.vitStudent?.team || user.externalParticipant?.team
    if (existingTeam) {
      return NextResponse.json({ 
        error: 'You are already part of a team',
        teamName: existingTeam.name 
      }, { status: 400 })
    }

    // Generate unique team code
    let teamCode
    let isUnique = false
    let attempts = 0
    
    while (!isUnique && attempts < 10) {
      teamCode = generateTeamCode()
      const existingTeam = await prisma.team.findFirst({
        where: { code: teamCode }
      })
      if (!existingTeam) {
        isUnique = true
      }
      attempts++
    }

    if (!isUnique) {
      return NextResponse.json({ error: 'Failed to generate unique team code' }, { status: 500 })
    }

    // Create the team
    const team = await prisma.team.create({
      data: {
        name: teamName.trim(),
        description: description?.trim() || null,
        code: teamCode,
        category: 'hackathon' // Default category
      }
    })

    // Assign user to the team
    if (user.vitStudent) {
      await prisma.vITStudent.update({
        where: { id: user.vitStudent.id },
        data: { teamId: team.id }
      })
    } else if (user.externalParticipant) {
      await prisma.externalParticipant.update({
        where: { id: user.externalParticipant.id },
        data: { teamId: team.id }
      })
    }

    return NextResponse.json({
      success: true,
      message: 'Team created successfully',
      team: {
        id: team.id,
        name: team.name,
        code: team.code,
        description: team.description
      }
    }, { status: 201 })

  } catch (error) {
    console.error('Create team error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function GET(request) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
    }

    // Get user's team information
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: {
        vitStudent: { 
          include: { 
            team: {
              include: {
                vitStudents: true,
                externalParticipants: true
              }
            }
          }
        },
        externalParticipant: { 
          include: { 
            team: {
              include: {
                vitStudents: true,
                externalParticipants: true
              }
            }
          }
        }
      }
    })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    const team = user.vitStudent?.team || user.externalParticipant?.team

    if (!team) {
      return NextResponse.json({ 
        hasTeam: false,
        message: 'User is not part of any team' 
      })
    }

    // Format team members
    const members = [
      ...team.vitStudents.map(student => ({
        id: student.id,
        name: student.name,
        type: 'vit',
        phone: student.phone,
        year: student.year
      })),
      ...team.externalParticipants.map(participant => ({
        id: participant.id,
        name: participant.name,
        type: 'external',
        phone: participant.phone,
        year: participant.year,
        college: participant.collegeName
      }))
    ]

    return NextResponse.json({
      hasTeam: true,
      team: {
        id: team.id,
        name: team.name,
        code: team.code,
        description: team.description,
        category: team.category,
        memberCount: members.length,
        members
      }
    })

  } catch (error) {
    console.error('Get team error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}