import { getCurrentUserOrNull } from "@/lib/auth"
import { stripeClient } from "@/lib/stripe"
import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const user = await getCurrentUserOrNull()
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }
  
  // Demo users cannot access Stripe portal
  if (user.id === "demo") {
    return NextResponse.json({ error: "This feature is not available for demo users" }, { status: 403 })
  }

  if (!stripeClient) {
    return new NextResponse("Stripe client is not initialized", { status: 500 })
  }

  try {
    if (!user.stripeCustomerId) {
      return NextResponse.json({ error: "No Stripe customer ID found for this user" }, { status: 400 })
    }

    const portalSession = await stripeClient.billingPortal.sessions.create({
      customer: user.stripeCustomerId,
      return_url: `${request.nextUrl.origin}/settings/profile`,
    })

    return NextResponse.redirect(portalSession.url)
  } catch (error) {
    console.error("Stripe portal error:", error)
    return NextResponse.json({ error: "Failed to create Stripe portal session" }, { status: 500 })
  }
}
