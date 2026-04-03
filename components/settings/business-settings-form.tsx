"use client"

import { saveProfileAction } from "@/app/(app)/settings/actions"
import { FormError } from "@/components/forms/error"
import { FormAvatar, FormInput, FormTextarea } from "@/components/forms/simple"
import { Button } from "@/components/ui/button"
import { User } from "@/prisma/client"
import { CircleCheckBig } from "lucide-react"
import { useActionState } from "react"

export default function BusinessSettingsForm({ user }: { user: User }) {
  const [saveState, saveAction, pending] = useActionState(saveProfileAction, null)

  return (
    <div>
      <form action={saveAction} className="space-y-4">
        <FormInput
          title="Nom de l'Entreprise"
          name="businessName"
          placeholder="Acme Inc."
          defaultValue={user.businessName ?? ""}
        />

        <FormTextarea
          title="Adresse de l'Entreprise"
          name="businessAddress"
          placeholder="Rue, Ville, État, Code Postal, Pays, Numéro Fiscal"
          defaultValue={user.businessAddress ?? ""}
        />

        <FormTextarea
          title="Détails Bancaires"
          name="businessBankDetails"
          placeholder="Nom de la Banque, Numéro de Compte, BIC, IBAN, détails de paiement, etc."
          defaultValue={user.businessBankDetails ?? ""}
        />

        <FormAvatar
          title="Logo de l'Entreprise"
          name="businessLogo"
          className="w-52 h-52"
          defaultValue={user.businessLogo ?? ""}
        />

        <div className="flex flex-row items-center gap-4">
          <Button type="submit" disabled={pending}>
            {pending ? "Enregistrement..." : "Enregistrer"}
          </Button>
          {saveState?.success && (
            <p className="text-green-500 flex flex-row items-center gap-2">
              <CircleCheckBig />
              Enregistré !
            </p>
          )}
        </div>

        {saveState?.error && <FormError>{saveState.error}</FormError>}
      </form>
    </div>
  )
}
