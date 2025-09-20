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

    // Check if user has a team
    const currentTeam = user.vitStudent?.team || user.externalParticipant?.team
    if (!currentTeam) {
      return NextResponse.json({ error: 'You are not part of any team' }, { status: 400 })
    }

    const teamId = currentTeam.id

    // Remove user from the team
    if (user.vitStudent) {
      await prisma.vITStudent.update({
        where: { id: user.vitStudent.id },
        data: { teamId: null }
      })
    } else if (user.externalParticipant) {
      await prisma.externalParticipant.update({
        where: { id: user.externalParticipant.id },
        data: { teamId: null }
      })
    }

    // Check if team is now empty and delete it if so
    const remainingMembers = await prisma.team.findUnique({
      where: { id: teamId },
      include: {
        vitStudents: true,
        externalParticipants: true
      }
    })

    if (remainingMembers && 
        remainingMembers.vitStudents.length === 0 && 
        remainingMembers.externalParticipants.length === 0) {
      // Delete empty team
      await prisma.team.delete({
        where: { id: teamId }
      })
    }

    return NextResponse.json({
      success: true,
      message: `Successfully left team "${currentTeam.name}"`
    })

  } catch (error) {
    console.error('Leave team error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}