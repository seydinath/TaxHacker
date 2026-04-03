import { ColoredText } from "@/components/ui/colored-text"
import config from "@/lib/config"
import Image from "next/image"
import Link from "next/link"

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Header */}
      <header className="py-6 px-4 md:px-8 bg-white border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link href="/" className="flex items-center gap-3 group">
            <Image
              src="/logo/256.png"
              alt="Logo"
              width={32}
              height={32}
              className="h-8 group-hover:scale-110 transition-transform duration-300"
            />
            <ColoredText className="text-2xl font-bold">TaxHacker</ColoredText>
          </Link>
          <Link
            href="/dashboard"
            className="px-6 py-2.5 bg-gray-900 text-white font-medium rounded-full hover:bg-gray-800 transition-colors duration-300 text-sm"
          >
            Essayer Gratuitement
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-20 pb-32 px-4 md:px-8">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-gray-900 mb-6">
            Votre comptabilité simplifiée
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            Une solution auto-hébergée pour gérer vos finances. Scannez vos reçus, catégorisez vos dépenses et générez vos rapports d'impôts avec facilité.
          </p>
          <Link
            href="/dashboard"
            className="inline-block px-8 py-3.5 bg-gray-900 text-white font-semibold rounded-full hover:bg-gray-800 transition-colors duration-300 mb-16"
          >
            Commencer maintenant
          </Link>

          {/* Hero Image */}
          <div className="relative rounded-2xl overflow-hidden shadow-2xl">
            <Image 
              src="/landing/ai-scanner-big.webp" 
              alt="TaxHacker Dashboard" 
              width={1728} 
              height={1080}
              priority
              className="w-full h-auto"
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-4 md:px-8 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Pourquoi TaxHacker?
            </h2>
            <p className="text-lg text-gray-600">
              Tout ce dont vous avez besoin pour gérer vos impôts efficacement
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Feature 1 */}
            <div className="flex gap-6">
              <div className="flex-shrink-0">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gray-900">
                  <span className="text-2xl">📄</span>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Reconnaissance Automatique</h3>
                <p className="text-gray-600">
                  Téléchargez vos reçus et factures. Nos outils extraient automatiquement les informations importantes : dates, montants, commerces.
                </p>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="flex gap-6">
              <div className="flex-shrink-0">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gray-900">
                  <span className="text-2xl">📊</span>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Organisation Intelligente</h3>
                <p className="text-gray-600">
                  Catégorisez vos dépenses, créez des projets, définissez des champs personnalisés pour correspondre à votre activité.
                </p>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="flex gap-6">
              <div className="flex-shrink-0">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gray-900">
                  <span className="text-2xl">💱</span>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Multi-Devises</h3>
                <p className="text-gray-600">
                  Convertissez automatiquement vos dépenses en devises étrangères. Support de 170+ devises avec historiques des taux.
                </p>
              </div>
            </div>

            {/* Feature 4 */}
            <div className="flex gap-6">
              <div className="flex-shrink-0">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gray-900">
                  <span className="text-2xl">📈</span>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Rapports Détaillés</h3>
                <p className="text-gray-600">
                  Générez des rapports personnalisés pour vos déclarations d'impôts, en fonction de votre pays et secteur d'activité.
                </p>
              </div>
            </div>

            {/* Feature 5 */}
            <div className="flex gap-6">
              <div className="flex-shrink-0">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gray-900">
                  <span className="text-2xl">🔒</span>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Données Sécurisées</h3>
                <p className="text-gray-600">
                  Auto-hébergez votre instance et gardez vos données financières privées. Aucun service cloud tiers requis.
                </p>
              </div>
            </div>

            {/* Feature 6 */}
            <div className="flex gap-6">
              <div className="flex-shrink-0">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gray-900">
                  <span className="text-2xl">⚙️</span>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Flexible & Extensible</h3>
                <p className="text-gray-600">
                  Modifiez chaque aspect de votre flux de travail. Intégrez vos propres modèles d'IA, connectez vos outils favoris.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-24 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Open Source & Gratuit
            </h2>
            <p className="text-lg text-gray-600">
              TaxHacker est totalement gratuit, open source et prêt pour la production
            </p>
          </div>

          <div className="bg-gray-50 rounded-2xl p-12 text-center mb-12">
            <div className="text-5xl font-bold text-gray-900 mb-2">0€</div>
            <p className="text-gray-600 mb-8">Pour utiliser et auto-héberger</p>
            <Link
              href="/dashboard"
              className="inline-block px-8 py-3.5 bg-gray-900 text-white font-semibold rounded-full hover:bg-gray-800 transition-colors duration-300"
            >
              Essayer maintenant
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900 mb-2">100%</div>
              <p className="text-gray-600">Open Source sur GitHub</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900 mb-2">100%</div>
              <p className="text-gray-600">Données locales & privées</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900 mb-2">Docker</div>
              <p className="text-gray-600">Déployable en minutes</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 md:px-8 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Prêt à simplifier votre comptabilité?
          </h2>
          <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
            Accédez au dashboard dès maintenant pour tester TaxHacker. Aucune inscription requise.
          </p>
          <Link
            href="/dashboard"
            className="inline-block px-8 py-3.5 bg-white text-gray-900 font-semibold rounded-full hover:bg-gray-100 transition-colors duration-300"
          >
            Commencer à utiliser
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-100 py-16 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div>
              <h4 className="font-bold text-gray-900 mb-4">À Propos</h4>
              <ul className="space-y-2 text-gray-600">
                <li>
                  <a href="https://github.com/seydinath" target="_blank" rel="noreferrer" className="hover:text-gray-900">
                    GitHub
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-gray-900 mb-4">Documentation</h4>
              <ul className="space-y-2 text-gray-600">
                <li>
                  <Link href="/docs/ai" className="hover:text-gray-900">
                    IA & Prompts
                  </Link>
                </li>
                <li>
                  <Link href="/docs/terms" className="hover:text-gray-900">
                    Conditions d'utilisation
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-gray-900 mb-4">Légal</h4>
              <ul className="space-y-2 text-gray-600">
                <li>
                  <Link href="/docs/privacy_policy" className="hover:text-gray-900">
                    Politique de confidentialité
                  </Link>
                </li>
                <li>
                  <Link href="/docs/cookie" className="hover:text-gray-900">
                    Politique des cookies
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-gray-900 mb-4">Contact</h4>
              <ul className="space-y-2 text-gray-600">
                <li>
                  <a href={`mailto:${config.app.supportEmail}`} className="hover:text-gray-900">
                    Email de support
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-100 pt-8 text-center text-gray-600">
            <p>Fait par Seydinath pour simplifier vos impôts.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
