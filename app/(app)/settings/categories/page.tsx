import { addCategoryAction, deleteCategoryAction, editCategoryAction } from "@/app/(app)/settings/actions"
import { CrudTable } from "@/components/settings/crud"
import { getCurrentUser } from "@/lib/auth"
import { randomHexColor } from "@/lib/utils"
import { getCategories } from "@/models/categories"
import { Prisma } from "@/prisma/client"

export default async function CategoriesSettingsPage() {
  const user = await getCurrentUser()
  const categories = await getCategories(user.id)
  const categoriesWithActions = categories.map((category) => ({
    ...category,
    isEditable: true,
    isDeletable: true,
  }))

  return (
    <div className="container">
      <h1 className="text-2xl font-bold mb-2">Catégories</h1>
      <p className="text-sm text-gray-500 mb-6 max-w-prose">
        Créez vos propres catégories qui reflètent mieux le type de revenus et de dépenses que vous avez. Définissez une
        invite LLM pour que l&apos;IA puisse déterminer automatiquement cette catégorie.
      </p>

      <CrudTable
        items={categoriesWithActions}
        columns={[
          { key: "name", label: "Nom", editable: true },
          { key: "llm_prompt", label: "Invite LLM", editable: true },
          { key: "color", label: "Couleur", type: "color", defaultValue: randomHexColor(), editable: true },
        ]}
        onDelete={async (code) => {
          "use server"
          return await deleteCategoryAction(user.id, code)
        }}
        onAdd={async (data) => {
          "use server"
          return await addCategoryAction(user.id, data as Prisma.CategoryCreateInput)
        }}
        onEdit={async (code, data) => {
          "use server"
          return await editCategoryAction(user.id, code, data as Prisma.CategoryUpdateInput)
        }}
      />
    </div>
  )
}
