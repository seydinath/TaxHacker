import ProfileSettingsForm from "@/components/settings/profile-settings-form"
import { getCurrentUserOrNull } from "@/lib/auth"

export default async function ProfileSettingsPage() {
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

  return (
    <>
      <div className="w-full max-w-2xl">
        <ProfileSettingsForm user={user} />
      </div>
    </>
  )
}
