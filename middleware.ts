import { default as globalConfig } from "@/lib/config"
import { getSessionCookie } from "better-auth/cookies"
import { NextRequest, NextResponse } from "next/server"

// Middleware pour les contrôles d'authentification
export default async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  
  // Apply auth check only if not in self-hosted mode and for protected routes
  if (globalConfig.selfHosted.isEnabled) {
    return NextResponse.next()
  }

  // Protected routes that require authentication
  const protectedPaths = [
    "/transactions",
    "/settings",
    "/export",
    "/import",
    "/unsorted",
    "/files",
    "/dashboard",
  ]

  const isProtectedRoute = protectedPaths.some(path => pathname.includes(path))
  
  if (isProtectedRoute) {
    const sessionCookie = getSessionCookie(request, { cookiePrefix: "taxhacker" })
    if (!sessionCookie) {
      return NextResponse.redirect(new URL(globalConfig.auth.loginUrl, request.url))
    }
  }
  
  return NextResponse.next()
}

export const config = {
  matcher: [
    // Match all paths except special ones
    "/((?!api|_next|.*\\..*|monitoring|.*\\.json).*)",
  ],
}
