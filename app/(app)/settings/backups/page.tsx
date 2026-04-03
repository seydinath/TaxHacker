"use client"

import { FormError } from "@/components/forms/error"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useDownload } from "@/hooks/use-download"
import { useProgress } from "@/hooks/use-progress"
import { Download, Loader2 } from "lucide-react"
import { useActionState } from "react"
import { restoreBackupAction } from "./actions"

export default function BackupSettingsPage() {
  const [restoreState, restoreBackup, restorePending] = useActionState(restoreBackupAction, null)

  const { isLoading, startProgress, progress } = useProgress({
    onError: (error) => {
      console.error("Backup progress error:", error)
    },
  })

  const { download, isDownloading } = useDownload({
    onError: (error) => {
      console.error("Download error:", error)
    },
  })

  const handleDownload = async () => {
    try {
      const progressId = await startProgress("backup")
      const downloadUrl = `/settings/backups/data?progressId=${progressId || ""}`
      await download(downloadUrl, "taxhacker-backup.zip")
    } catch (error) {
      console.error("Failed to start backup:", error)
    }
  }

  return (
    <div className="container flex flex-col gap-4">
      <div className="flex flex-col gap-4">
        <h1 className="text-2xl font-bold">Télécharger une sauvegarde</h1>
        <div className="flex flex-row gap-4">
          <Button onClick={handleDownload} disabled={isLoading || isDownloading}>
            {isLoading ? (
              progress?.current ? (
                `Archivage ${progress.current}/${progress.total} fichiers`
              ) : (
                "Préparation de la sauvegarde. Ne fermez pas la page..."
              )
            ) : isDownloading ? (
              "L&apos;archive est créée. Téléchargement..."
            ) : (
              <>
                <Download className="mr-2" /> Télécharger l&apos;archive de données
              </>
            )}
          </Button>
        </div>
        <div className="text-sm text-muted-foreground max-w-xl">
          Dans l&apos;archive, vous trouverez tous les fichiers téléchargés ainsi que des fichiers JSON pour les
          transactions, catégories, projets, champs, devises et paramètres. Vous pouvez voir, modifier ou migrer vos
          données vers un autre service.
        </div>
      </div>

      <Card className="flex flex-col gap-2 mt-16 p-5 bg-red-100 max-w-xl">
        <h2 className="text-xl font-semibold">Restaurer à partir d&apos;une sauvegarde</h2>
        <p className="text-sm text-muted-foreground">
          ⚠️ Cette action est irréversible. Restaurer à partir d&apos;une sauvegarde supprimera toutes les données
          existantes de votre base de données actuelle et supprimera tous les fichiers téléchargés. Soyez prudent et
          faites d&apos;abord une sauvegarde !
        </p>
        <form action={restoreBackup}>
          <div className="flex flex-col gap-4 pt-4">
            <label>
              <input type="file" name="file" required />
            </label>
            <label className="flex flex-row gap-2 items-center">
              <input type="checkbox" name="removeExistingData" required />
              <span className="text-red-500">
                Je comprends que cela supprimera définitivement toutes les données existantes
              </span>
            </label>
            <Button type="submit" variant="destructive" disabled={restorePending}>
              {restorePending ? (
                <>
                  <Loader2 className="animate-spin" /> Restauration à partir de la sauvegarde... (cela peut prendre un
                  certain temps)
                </>
              ) : (
                "Restaurer à partir d&apos;une sauvegarde"
              )}
            </Button>
          </div>
        </form>
        {restoreState?.error && <FormError>{restoreState.error}</FormError>}
      </Card>

      {restoreState?.success && (
        <Card className="flex flex-col gap-2 p-5 bg-green-100 max-w-xl">
          <h2 className="text-xl font-semibold">Sauvegarde restaurée avec succès</h2>
          <p className="text-sm text-muted-foreground">
            Vous pouvez maintenant continuer à utiliser l&apos;application. Statistiques d&apos;importation :
          </p>
          <ul className="list-disc list-inside">
            {Object.entries(restoreState.data?.counters || {}).map(([key, value]) => (
              <li key={key}>
                <span className="font-bold">{key}</span>: {value} éléments
              </li>
            ))}
          </ul>
        </Card>
      )}
    </div>
  )
}
