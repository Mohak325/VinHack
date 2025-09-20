import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '../[...nextauth]/route'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET(request) {
  try {
    console.log('🔍 Auth callback: Starting authentication check...')
    
    const session = await getServerSession(authOptions)
    console.log('🔍 Auth callback: Session data:', {
      hasSession: !!session,
      userEmail: session?.user?.email || 'No email',
      userName: session?.user?.name || 'No name'
    })
    
    if (!session?.user?.email) {
      console.log('❌ Auth callback: No session or email found, redirecting to /login')
      return NextResponse.redirect(new URL('/login', request.url))
    }

    const email = session.user.email
    const isVitStudent = email.endsWith('@vitstudent.ac.in')
    console.log('🔍 Auth callback: Email analysis:', {
      email,
      isVitStudent,
      domain: email.split('@')[1] || 'No domain'
    })
    
    // Check if user is already registered
    const user = await prisma.user.findUnique({
      where: { email },
      include: {
        vitStudent: {
          include: { team: true }
        },
        externalParticipant: {
          include: { team: true }
        }
      }
    })

    console.log('🔍 Auth callback: User lookup result:', {
      userFound: !!user,
      isRegistered: user?.isRegistered || false,
      hasVitStudent: !!user?.vitStudent,
      hasExternalParticipant: !!user?.externalParticipant,
      vitStudentHasTeam: !!user?.vitStudent?.team,
      externalParticipantHasTeam: !!user?.externalParticipant?.team
    })

    // If not registered, redirect to appropriate form
    if (!user?.isRegistered) {
      if (isVitStudent) {
        console.log('📝 Auth callback: VIT student not registered, redirecting to /vit-form')
        return NextResponse.redirect(new URL('/vit-form', request.url))
      } else {
        console.log('📝 Auth callback: External participant not registered, redirecting to /external-forms')
        return NextResponse.redirect(new URL('/external-forms', request.url))
      }
    }

    // Check for team membership
    const hasTeam = user.vitStudent?.team || user.externalParticipant?.team
    console.log('🔍 Auth callback: Team check:', {
      hasTeam: !!hasTeam,
      teamId: hasTeam?.id || 'No team'
    })
    
    if (!hasTeam) {
      console.log('👥 Auth callback: User registered but no team, redirecting to /teams')
      return NextResponse.redirect(new URL('/teams', request.url))
    }

    // User is registered and has a team, proceed to onboarding
    console.log('✅ Auth callback: User fully registered with team, redirecting to /onboarding')
    return NextResponse.redirect(new URL('/onboarding', request.url))

  } catch (error) {
    console.error('❌ Auth callback error:', {
      message: error.message,
      stack: error.stack,
      name: error.name
    })
    return NextResponse.redirect(new URL('/auth/error', request.url))
  }
}