import { NextRequest, NextResponse } from "next/server"

// Middleware - All routes are public, no authentication redirect
export default async function middleware(request: NextRequest) {
  return NextResponse.next()
}

export const config = {
  matcher: [
    // Match all paths except special ones
    "/((?!api|_next|.*\\..*|monitoring|.*\\.json).*)",
  ],
}
