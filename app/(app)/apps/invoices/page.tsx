import { getCurrentUserOrNull } from "@/lib/auth"
import { getAppData } from "@/models/apps"
import { getCurrencies } from "@/models/currencies"
import { getSettings } from "@/models/settings"
import { InvoiceGenerator } from "./components/invoice-generator"
import { InvoiceTemplate } from "./default-templates"
import { manifest } from "./manifest"

export type InvoiceAppData = {
  templates: InvoiceTemplate[]
}

export default async function InvoicesApp() {
  const userOrNull = await getCurrentUserOrNull()
  const user = userOrNull || {
    id: "demo",
    name: "Demo User",
    email: "demo@taxhacker.local",
    avatar: null,
    createdAt: new Date(),
    updatedAt: new Date(),
    stripeCustomerId: null,
    membershipPlan: "unlimited",
    membershipExpiresAt: null,
    emailVerified: false,
    storageUsed: 0,
    storageLimit: -1,
    aiBalance: 0,
    businessName: null,
    businessAddress: null,
    businessBankDetails: null,
    businessLogo: null,
  } as any
  const settings = await getSettings(user.id)
  const currencies = await getCurrencies(user.id)
  const appData = (await getAppData(user, "invoices")) as InvoiceAppData | null

  return (
    <div>
      <header className="flex flex-wrap items-center justify-between gap-2 mb-8">
        <h2 className="flex flex-row gap-3 md:gap-5">
          <span className="text-3xl font-bold tracking-tight">
            {manifest.icon} {manifest.name}
          </span>
        </h2>
      </header>
      <InvoiceGenerator user={user} settings={settings} currencies={currencies} appData={appData} />
    </div>
  )
}
