import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
  async function middleware(req) {
    const { pathname, origin } = req.nextUrl

  const publicRoutes = ['/', '/auth/error']

    // Skip early for public routes
    if (publicRoutes.includes(pathname)) {
      return NextResponse.next()
    }

    // Relevant app routes we want to centrally manage
  const isTeamsRoot = pathname === '/teams'
    const isTeamsSub = pathname.startsWith('/teams/')
    const isOnboarding = pathname.startsWith('/onboarding')
    const isVitForm = pathname.startsWith('/vit-form')
    const isExternalForm = pathname.startsWith('/external-forms')
  const isLogin = pathname === '/login'

    const isManagedRoute =
      isTeamsRoot || isTeamsSub || isOnboarding || isVitForm || isExternalForm || isLogin

    if (!isManagedRoute) {
      return NextResponse.next()
    }

    // Fetch the user's status (registered, hasTeam)
    let status
    try {
      const res = await fetch(`${origin}/api/user/status`, {
        headers: {
          cookie: req.headers.get('cookie') || '',
        },
        cache: 'no-store',
      })

      if (res.status === 401) {
        // Allow unauthenticated users to view /login, protect other routes
        return isLogin
          ? NextResponse.next()
          : NextResponse.redirect(new URL('/login', req.url))
      }
      status = await res.json()
    } catch (e) {
      // On error, be conservative and keep user on current route
      return NextResponse.next()
    }

  const isRegistered = !!status?.isRegistered
  const hasTeam = !!status?.hasTeam
  const email = status?.user?.email || ''
  const isVitEmail = email.endsWith('@vitstudent.ac.in')

    // If user navigates to /login while authenticated, send them to the right place
    if (isLogin) {
      if (!isRegistered) {
        return NextResponse.redirect(new URL(isVitEmail ? '/vit-form' : '/external-forms', req.url))
      }
      return NextResponse.redirect(new URL(hasTeam ? '/onboarding' : '/teams', req.url))
    }

    // Registered users should not access registration forms again
    if (isRegistered && (isVitForm || isExternalForm)) {
      return NextResponse.redirect(new URL(hasTeam ? '/onboarding' : '/teams', req.url))
    }

    // Cross-guard form pages based on email domain for unregistered users only
    if (!isRegistered) {
      if (isVitForm && !isVitEmail) {
        return NextResponse.redirect(new URL('/external-forms', req.url))
      }
      if (isExternalForm && isVitEmail) {
        return NextResponse.redirect(new URL('/vit-form', req.url))
      }
    }

    // Route rules
    // 1) Unregistered users must go to the correct registration form
    if (!isRegistered && (isTeamsRoot || isTeamsSub || isOnboarding)) {
      return NextResponse.redirect(new URL(isVitEmail ? '/vit-form' : '/external-forms', req.url))
    }

    // 2) Registered but without a team: block onboarding, allow teams
    if (isRegistered && !hasTeam && isOnboarding) {
      return NextResponse.redirect(new URL('/teams', req.url))
    }

    // 3) Registered with a team: skip teams and forms, go to onboarding
    if (isRegistered && hasTeam && (isTeamsRoot || isTeamsSub || isVitForm || isExternalForm)) {
      return NextResponse.redirect(new URL('/onboarding', req.url))
    }

    // Otherwise, allow through
    return NextResponse.next()
  },
  {
    callbacks: {
      // Always allow middleware to run; we'll handle redirects ourselves
      authorized: ({ token, req }) => {
        return true
      },
    },
  }
)

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (all API routes to avoid middleware fetch loops)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files
     */
    '/((?!api|_next/static|_next/image|favicon.ico|assets|fonts).*)',
  ],
}