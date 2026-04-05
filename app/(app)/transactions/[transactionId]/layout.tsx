import { getCurrentUserOrNull } from "@/lib/auth"
import { getTransactionById } from "@/models/transactions"
import { notFound } from "next/navigation"

export default async function TransactionLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ transactionId: string }>
}) {
  const { transactionId } = await params
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
  const transaction = await getTransactionById(transactionId, user.id)

  if (!transaction) {
    notFound()
  }

  return (
    <>
      <header className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Transaction Details</h2>
      </header>
      <main>
        <div className="flex flex-1 flex-col gap-4 pt-0">{children}</div>
      </main>
    </>
  )
}
