import GlobalSettingsForm from "@/components/settings/global-settings-form"
import { getCurrentUserOrNull } from "@/lib/auth"
import { getCategories } from "@/models/categories"
import { getCurrencies } from "@/models/currencies"
import { getSettings } from "@/models/settings"

export default async function SettingsPage() {
  const userOrNull = await getCurrentUserOrNull()
  const user = (userOrNull || {
    id: "demo",
    name: "Demo User",
    email: "demo@taxhacker.local",
    avatar: null,
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
    createdAt: new Date(),
    updatedAt: new Date(),
  }) as any
  const settings = await getSettings(user.id)
  const currencies = await getCurrencies(user.id)
  const categories = await getCategories(user.id)

  return (
    <>
      <div className="w-full max-w-2xl">
        <GlobalSettingsForm settings={settings} currencies={currencies} categories={categories} />
      </div>
    </>
  )
}
