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

    const { 
      projectTitle, 
      projectDescription, 
      track, 
      githubLink, 
      figmaLink, 
      pptLink, 
      otherLinks 
    } = await request.json()

    // Find the user and their team
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

    const team = user.vitStudent?.team || user.externalParticipant?.team

    if (!team) {
      return NextResponse.json({ error: 'No team found for this user' }, { status: 404 })
    }

    // Update the team's project information
    const updatedTeam = await prisma.team.update({
      where: { id: team.id },
      data: {
        projectTitle: projectTitle || null,
        projectDescription: projectDescription || null,
        track: track || null,
        githubLink: githubLink || null,
        figmaLink: figmaLink || null,
        pptLink: pptLink || null,
        otherLinks: otherLinks || null,
        updatedAt: new Date()
      }
    })

    return NextResponse.json({ 
      success: true, 
      message: 'Project information updated successfully',
      team: updatedTeam
    })

  } catch (error) {
    console.error('Update project info error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
    }

    // Find the user and their team
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

    const team = user.vitStudent?.team || user.externalParticipant?.team

    if (!team) {
      return NextResponse.json({ error: 'No team found for this user' }, { status: 404 })
    }

    return NextResponse.json({ 
      success: true, 
      projectInfo: {
        projectTitle: team.projectTitle,
        projectDescription: team.projectDescription,
        track: team.track,
        githubLink: team.githubLink,
        figmaLink: team.figmaLink,
        pptLink: team.pptLink,
        otherLinks: team.otherLinks
      }
    })

  } catch (error) {
    console.error('Get project info error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}