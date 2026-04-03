import { FilePreview } from "@/components/files/preview"
import { UploadButton } from "@/components/files/upload-button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { AnalyzeAllButton } from "@/components/unsorted/analyze-all-button"
import AnalyzeForm from "@/components/unsorted/analyze-form"
import { getCurrentUser } from "@/lib/auth"
import config from "@/lib/config"
import { getCategories } from "@/models/categories"
import { getCurrencies } from "@/models/currencies"
import { getFields } from "@/models/fields"
import { getUnsortedFiles } from "@/models/files"
import { getProjects } from "@/models/projects"
import { getSettings } from "@/models/settings"
import { FileText, PartyPopper, Settings, Upload } from "lucide-react"
import { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Non Triés",
  description: "Analyser les fichiers non triés",
}

export default async function UnsortedPage() {
  const user = await getCurrentUser()
  const files = await getUnsortedFiles(user.id)
  const categories = await getCategories(user.id)
  const projects = await getProjects(user.id)
  const currencies = await getCurrencies(user.id)
  const fields = await getFields(user.id)
  const settings = await getSettings(user.id)

  return (
    <>
      <header className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Vous avez {files.length} fichiers non triés</h2>
        {files.length > 1 && <AnalyzeAllButton />}
      </header>

      {config.selfHosted.isEnabled &&
        !settings.openai_api_key &&
        !settings.google_api_key &&
        !settings.mistral_api_key &&
        !settings.openai_compatible_base_url && (
          <Alert>
            <Settings className="h-4 w-4 mt-2" />
            <div className="flex flex-row justify-between pt-2">
              <div className="flex flex-col">
                <AlertTitle>La clé API du fournisseur LLM est requise pour analyser les fichiers</AlertTitle>
                <AlertDescription>
                  Veuillez définir votre clé API LLM dans les paramètres pour utiliser le formulaire d'analyse.
                </AlertDescription>
              </div>
              <Link href="/settings/llm">
                <Button>Aller aux Paramètres</Button>
              </Link>
            </div>
          </Alert>
        )}

      <main className="flex flex-col gap-5">
        {files.map((file) => (
          <Card
            key={file.id}
            id={file.id}
            className="flex flex-row flex-wrap md:flex-nowrap justify-center items-start gap-5 p-5 bg-gradient-to-br from-violet-50/80 via-indigo-50/80 to-white border-violet-200/60 rounded-2xl"
          >
            <div className="w-full max-w-[500px]">
              <Card>
                <FilePreview file={file} />
              </Card>
            </div>

            <div className="w-full">
              <AnalyzeForm
                file={file}
                categories={categories}
                projects={projects}
                currencies={currencies}
                fields={fields}
                settings={settings}
              />
            </div>
          </Card>
        ))}
        {files.length == 0 && (
          <div className="flex flex-col items-center justify-center gap-2 h-full min-h-[600px]">
            <PartyPopper className="w-12 h-12 text-muted-foreground" />
            <p className="pt-4 text-muted-foreground">Tout est clair ! Bravo !</p>
            <p className="flex flex-row gap-2 text-muted-foreground">
              <span>Glissez-déposez les nouveaux fichiers ici pour analyser</span>
              <Upload />
            </p>

            <div className="flex flex-row gap-5 mt-8">
              <UploadButton>
                <Upload /> Télécharger un Nouveau Fichier
              </UploadButton>
              <Button variant="outline" asChild>
                <Link href="/transactions">
                  <FileText />
                  Go to Transactions
                </Link>
              </Button>
            </div>
          </div>
        )}
      </main>
    </>
  )
}
