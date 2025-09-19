import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '../../auth/[...nextauth]/route'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.email) {
      return NextResponse.json({ authenticated: false }, { status: 401 })
    }

    const email = session.user.email
    const isVitStudent = email.endsWith('@vitstudent.ac.in')
    
    const user = await prisma.user.findUnique({
      where: { email },
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

    const team = user?.vitStudent?.team || user?.externalParticipant?.team
    const profile = user?.vitStudent || user?.externalParticipant

    // Format team information if exists
    let teamInfo = null
    if (team) {
      const members = [
        ...team.vitStudents.map(student => ({
          id: student.id,
          name: student.name,
          type: 'vit',
          phone: student.phone,
          year: student.year,
          isCurrentUser: student.userId === user.id
        })),
        ...team.externalParticipants.map(participant => ({
          id: participant.id,
          name: participant.name,
          type: 'external',
          phone: participant.phone,
          year: participant.year,
          college: participant.collegeName,
          isCurrentUser: participant.userId === user.id
        }))
      ]

      teamInfo = {
        id: team.id,
        name: team.name,
        code: team.code,
        description: team.description,
        category: team.category,
        memberCount: members.length,
        members,
        createdAt: team.createdAt,
        projectInfo: {
          projectTitle: team.projectTitle,
          projectDescription: team.projectDescription,
          track: team.track,
          githubLink: team.githubLink,
          figmaLink: team.figmaLink,
          pptLink: team.pptLink,
          otherLinks: team.otherLinks
        }
      }
    }

    return NextResponse.json({
      authenticated: true,
      user: {
        id: user?.id,
        email: session.user.email,
        name: session.user.name,
        image: session.user.image
      },
      isVitStudent,
      isRegistered: user?.isRegistered || false,
      hasTeam: !!team,
      profile: profile ? {
        id: profile.id,
        name: profile.name,
        phone: profile.phone,
        year: profile.year,
        ...(profile.regNo && { regNo: profile.regNo }),
        ...(profile.accommodation && { accommodation: profile.accommodation }),
        ...(profile.collegeName && { college: profile.collegeName }),
        ...(profile.branch && { branch: profile.branch }),
        ...(profile.city && { city: profile.city })
      } : null,
      team: teamInfo
    })

  } catch (error) {
    console.error('User status error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
    }

    const { isRegistered } = await request.json()

    // Update user registration status
    await prisma.user.update({
      where: { email: session.user.email },
      data: { isRegistered }
    })

    return NextResponse.json({ success: true })

  } catch (error) {
    console.error('Update user status error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}