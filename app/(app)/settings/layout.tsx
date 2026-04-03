import { SideNav } from "@/components/settings/side-nav"
import { Separator } from "@/components/ui/separator"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Paramètres",
  description: "Personnalisez vos paramètres ici",
}

const settingsCategories = [
  {
    title: "Général",
    href: "/settings",
  },
  {
    title: "Profil & Plan",
    href: "/settings/profile",
  },
  {
    title: "Détails Commerciaux",
    href: "/settings/business",
  },
  {
    title: "Paramètres LLM",
    href: "/settings/llm",
  },
  {
    title: "Champs",
    href: "/settings/fields",
  },
  {
    title: "Catégories",
    href: "/settings/categories",
  },
  {
    title: "Projets",
    href: "/settings/projects",
  },
  {
    title: "Devises",
    href: "/settings/currencies",
  },
  {
    title: "Sauvegardes",
    href: "/settings/backups",
  },
  {
    title: "Zone de Danger",
    href: "/settings/danger",
  },
]

export default function SettingsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="space-y-6 p-10 pb-16">
        <div className="space-y-0.5">
          <h2 className="text-2xl font-bold tracking-tight">Paramètres</h2>
          <p className="text-muted-foreground">Personnalisez vos paramètres ici</p>
        </div>
        <Separator className="my-6" />
        <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
          <aside className="-mx-4 lg:w-1/5">
            <SideNav items={settingsCategories} />
          </aside>
          <div className="flex w-full">{children}</div>
        </div>
      </div>
    </>
  )
}
