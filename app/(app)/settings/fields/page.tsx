import { addFieldAction, deleteFieldAction, editFieldAction } from "@/app/(app)/settings/actions"
import { CrudTable } from "@/components/settings/crud"
import { getCurrentUserOrNull } from "@/lib/auth"
import { getFields } from "@/models/fields"
import { Prisma } from "@/prisma/client"

export default async function FieldsSettingsPage() {
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
  const fieldsWithActions = fields.map((field) => ({
    ...field,
    isEditable: true,
    isDeletable: field.isExtra,
  }))

  return (
    <div className="container">
      <h1 className="text-2xl font-bold mb-2">Champs Personnalisés</h1>
      <p className="text-sm text-gray-500 mb-6 max-w-prose">
        Vous pouvez ajouter de nouveaux champs à vos transactions. Les champs standards ne peuvent pas être supprimés
        mais vous pouvez modifier leurs invites ou les masquer. Si vous ne voulez pas qu&apos;un champ soit analysé
        par l&apos;IA mais rempli manuellement, laissez l&apos;&quot;Invite LLM&quot; vide.
      </p>
      <CrudTable
        items={fieldsWithActions}
        columns={[
          { key: "name", label: "Nom", editable: true },
          {
            key: "type",
            label: "Type",
            type: "select",
            options: ["string", "number", "boolean"],
            defaultValue: "string",
            editable: true,
          },
          { key: "llm_prompt", label: "Invite LLM", editable: true },
          {
            key: "isVisibleInList",
            label: "Afficher dans le tableau des transactions",
            type: "checkbox",
            defaultValue: false,
            editable: true,
          },
          {
            key: "isVisibleInAnalysis",
            label: "Afficher dans le formulaire d'analyse",
            type: "checkbox",
            defaultValue: false,
            editable: true,
          },
          {
            key: "isRequired",
            label: "Obligatoire",
            type: "checkbox",
            defaultValue: false,
            editable: true,
          },
        ]}
        onDelete={async (code) => {
          "use server"
          return await deleteFieldAction(user.id, code)
        }}
        onAdd={async (data) => {
          "use server"
          return await addFieldAction(user.id, data as Prisma.FieldCreateInput)
        }}
        onEdit={async (code, data) => {
          "use server"
          return await editFieldAction(user.id, code, data as Prisma.FieldUpdateInput)
        }}
      />
    </div>
  )
}
