import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '../../auth/[...nextauth]/route'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function POST(request) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
    }

    const { teamCode } = await request.json()

    if (!teamCode?.trim()) {
      return NextResponse.json({ error: 'Team code is required' }, { status: 400 })
    }

    // Normalize team code to uppercase
    const normalizedCode = teamCode.trim().toUpperCase()

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

    // Find the team by code
    const team = await prisma.team.findUnique({
      where: { code: normalizedCode },
      include: {
        vitStudents: true,
        externalParticipants: true
      }
    })

    if (!team) {
      return NextResponse.json({ error: 'Invalid team code' }, { status: 404 })
    }

    // Check team member limit (max 4 members)
    const currentMemberCount = team.vitStudents.length + team.externalParticipants.length
    if (currentMemberCount >= 4) {
      return NextResponse.json({ 
        error: 'Team is full (maximum 4 members)',
        teamName: team.name 
      }, { status: 400 })
    }

    // Add user to the team
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
      message: `Successfully joined team "${team.name}"`,
      team: {
        id: team.id,
        name: team.name,
        code: team.code,
        description: team.description,
        memberCount: currentMemberCount + 1
      }
    })

  } catch (error) {
    console.error('Join team error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}