import DashboardDropZoneWidget from "@/components/dashboard/drop-zone-widget"
import { StatsWidget } from "@/components/dashboard/stats-widget"
import DashboardUnsortedWidget from "@/components/dashboard/unsorted-widget"
import { WelcomeWidget } from "@/components/dashboard/welcome-widget"
import { Separator } from "@/components/ui/separator"
import { getCurrentUserOrNull } from "@/lib/auth"
import config from "@/lib/config"
import { getUnsortedFiles } from "@/models/files"
import { getSettings, SettingsMap } from "@/models/settings"
import { TransactionFilters } from "@/models/transactions"
import type { File } from "@/prisma/client"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Dashboard",
  description: config.app.description,
}

export default async function Dashboard({ searchParams }: { searchParams: Promise<TransactionFilters> }) {
  const filters = await searchParams
  const user = await getCurrentUserOrNull()

  // For demo/public access, provide default values
  let unsortedFiles: File[] = []
  let settings: SettingsMap = { 
    is_welcome_message_hidden: "false",
  }

  if (user && user.id !== "demo") {
    unsortedFiles = await getUnsortedFiles(user.id)
    settings = await getSettings(user.id)
  }

  return (
    <div className="flex flex-col gap-5 p-5 w-full max-w-7xl self-center">
      <div className="flex flex-col sm:flex-row gap-5 items-stretch h-full">
        <DashboardDropZoneWidget />

        <DashboardUnsortedWidget files={unsortedFiles} />
      </div>

      {settings.is_welcome_message_hidden !== "true" && <WelcomeWidget />}

      <Separator />

      <StatsWidget filters={filters} />
    </div>
  )
}
