import { Button } from "@/components/ui/button"
import { getCurrentUser } from "@/lib/auth"
import { resetFieldsAndCategories, resetLLMSettings } from "./actions"

export default async function DangerSettingsPage() {
  const user = await getCurrentUser()

  return (
    <div className="container">
      <h1 className="text-2xl font-bold mb-2 text-red-500">La Zone de Danger</h1>
      <p className="text-sm text-red-400 mb-8 max-w-prose">
        Les paramètres ici vont remplacer vos champs, catégories et invites existants. Utilisez-les uniquement si quelque
        chose est cassé.
      </p>
      <div className="space-y-10">
        <div className="space-y-2">
          <h3 className="text-lg font-bold">Paramètres LLM</h3>
          <p className="text-sm text-gray-500 mb-6 max-w-prose">
            Cela réinitialisera l&apos;invite système et autres paramètres LLM à leurs valeurs par défaut.
          </p>
          <form
            action={async () => {
              "use server"
              await resetLLMSettings(user)
            }}
          >
            <Button variant="destructive" type="submit">
              Réinitialiser l&apos;invite LLM principale
            </Button>
          </form>
        </div>
        <div className="space-y-2">
          <h3 className="text-lg font-bold">Champs, devises et catégories</h3>
          <p className="text-sm text-gray-500 mb-6 max-w-prose">
            Cela réinitialisera tous les champs, devises et catégories à leurs valeurs par défaut.
          </p>
          <form
            action={async () => {
              "use server"
              await resetFieldsAndCategories(user)
            }}
          >
            <Button variant="destructive" type="submit">
              Réinitialiser les champs, devises et catégories
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}
