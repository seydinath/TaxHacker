import { addProjectAction, deleteProjectAction, editProjectAction } from "@/app/(app)/settings/actions"
import { CrudTable } from "@/components/settings/crud"
import { getCurrentUserOrNull } from "@/lib/auth"
import { randomHexColor } from "@/lib/utils"
import { getProjects } from "@/models/projects"
import { Prisma } from "@/prisma/client"

export default async function ProjectsSettingsPage() {
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
  const projects = await getProjects(user.id)
  const projectsWithActions = projects.map((project) => ({
    ...project,
    isEditable: true,
    isDeletable: true,
  }))

  return (
    <div className="container">
      <h1 className="text-2xl font-bold mb-2">Projets</h1>
      <p className="text-sm text-gray-500 mb-6 max-w-prose">
        Utilisez les projets pour différencier le type d&apos;activités que vous faites, par exemple : Travail
        indépendant, Chaîne YouTube, Blog. Les projets sont simplement un moyen pratique de séparer les statistiques.
      </p>
      <CrudTable
        items={projectsWithActions}
        columns={[
          { key: "name", label: "Nom", editable: true },
          { key: "llm_prompt", label: "Invite LLM", editable: true },
          { key: "color", label: "Couleur", type: "color", defaultValue: randomHexColor(), editable: true },
        ]}
        onDelete={async (code) => {
          "use server"
          return await deleteProjectAction(user.id, code)
        }}
        onAdd={async (data) => {
          "use server"
          return await addProjectAction(user.id, data as Prisma.ProjectCreateInput)
        }}
        onEdit={async (code, data) => {
          "use server"
          return await editProjectAction(user.id, code, data as Prisma.ProjectUpdateInput)
        }}
      />
    </div>
  )
}
