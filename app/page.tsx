import { redirect } from "next/navigation"

export default async function Home() {
  // Redirect to dashboard - it's the main entry point
  redirect("/dashboard")
}

export const dynamic = "force-dynamic"

