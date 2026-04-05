import { ImportCSVTable } from "@/components/import/csv"
import { getCurrentUserOrNull } from "@/lib/auth"
import { getFields } from "@/models/fields"

export default async function CSVImportPage() {
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
  const fields = await getFields(user.id)
  return (
    <div className="flex flex-col gap-4 p-4">
      <ImportCSVTable fields={fields} />
    </div>
  )
}
