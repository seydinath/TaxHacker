import LLMSettingsForm from "@/components/settings/llm-settings-form"
import { getCurrentUserOrNull } from "@/lib/auth"
import config from "@/lib/config"
import { getFields } from "@/models/fields"
import { getSettings } from "@/models/settings"

export default async function LlmSettingsPage() {
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
  const fields = await getFields(user.id)

  return (
    <>
      <div className="w-full max-w-2xl">
        <LLMSettingsForm settings={settings} fields={fields} showApiKey={config.selfHosted.isEnabled} />
      </div>
    </>
  )
}
