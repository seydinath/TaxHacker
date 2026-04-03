import { ColoredText } from "@/components/ui/colored-text"
import config from "@/lib/config"
import Image from "next/image"
import Link from "next/link"

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50">
      <header className="py-6 px-4 md:px-8 bg-white/90 backdrop-blur-xl shadow-lg border-b border-gradient-to-r from-pink-200 to-indigo-200 fixed w-full z-50">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="relative">
              <Image
                src="/logo/256.png"
                alt="Logo"
                width={32}
                height={32}
                className="h-8 group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-pink-600 to-indigo-600 rounded-full opacity-20 blur-md group-hover:opacity-40 transition-opacity duration-300" />
            </div>
            <ColoredText className="text-2xl font-bold">TaxHacker</ColoredText>
          </Link>
          <Link
            href="/enter"
            className="cursor-pointer font-medium px-4 py-2 rounded-full border-2 border-gradient-to-r from-pink-300 to-indigo-300 hover:from-pink-400 hover:to-indigo-400 bg-white/80 hover:bg-white transition-all duration-300 hover:scale-105 text-xs md:text-sm"
          >
            Se Connecter
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-8 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-gradient-to-br from-pink-100/50 via-purple-100/30 to-indigo-100/50" />
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-pink-400 to-indigo-400 rounded-full opacity-10 blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-indigo-400 to-pink-400 rounded-full opacity-10 blur-3xl animate-pulse" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-12">
            <div className="inline-block px-6 py-3 rounded-full border-2 border-pink-600/50 text-sm font-medium mb-6 shadow-lg hover:shadow-xl transition-all duration-300">
              🚀 En Développement Actif
            </div>
            <h1 className="text-5xl font-bold tracking-tight sm:text-6xl mb-6 bg-gradient-to-r from-gray-900 via-pink-700 to-indigo-700 bg-clip-text text-transparent pb-2">
              Laissez l'IA enfin s'occuper de vos impôts, scannez vos reçus et analysez vos dépenses
            </h1>
            <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto font-medium">
              Application de comptabilité auto-hébergée créée pour les freelancers, les indie-hackers et les petites entreprises
            </p>
            <div className="flex gap-4 justify-center text-sm md:text-lg">
              <Link
                href="#start"
                className="px-8 py-4 bg-gradient-to-r from-pink-600 to-indigo-600 text-white font-bold rounded-full hover:from-pink-700 hover:to-indigo-700 transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-110 border-2 border-white/20"
              >
                Commencer ✨
              </Link>
              <Link
                href="mailto:support@taxhacker.local"
                className="px-8 py-4 border-2 border-gradient-to-r from-pink-300 to-indigo-300 text-gray-800 font-bold rounded-full hover:bg-gradient-to-r hover:from-pink-50 hover:to-indigo-50 transition-all duration-300 hover:scale-105 bg-white/80"
              >
                Nous Contacter 💌
              </Link>
            </div>
          </div>
          <div className="relative aspect-auto rounded-3xl overflow-hidden shadow-2xl ring-4 ring-gradient-to-r from-pink-200 to-indigo-200">
            <div className="absolute inset-0 bg-gradient-to-b from-pink-500/5 via-purple-500/5 to-indigo-500/10 z-10" />
            <video className="w-full h-auto" autoPlay loop muted playsInline poster="/landing/ai-scanner-big.webp">
              <source src="/landing/video.mp4" type="video/mp4" />
              <Image src="/landing/ai-scanner-big.webp" alt="TaxHacker" width={1728} height={1080} priority />
            </video>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-8 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-white/50 to-indigo-50/50" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="flex flex-col gap-3 mb-4">
              <span className="text-6xl font-bold bg-gradient-to-r from-pink-600 to-indigo-600 bg-clip-text text-transparent">
                Oubliez les Impôts
              </span>
              <span className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                TaxHacker vous fait gagner du temps, de l'argent et des nerfs
              </span>
            </h2>
          </div>

          {/* AI Scanner Feature */}
          <div className="flex flex-wrap items-center gap-12 mb-20 bg-slate-50/50 p-8 rounded-3xl shadow-xl ring-2 ring-gradient-to-r from-pink-200 to-indigo-200 hover:shadow-2xl transition-all duration-500 group">
            <div className="flex-1 min-w-60">
              <div className="inline-block px-4 py-2 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-sm font-bold mb-4 shadow-lg">
                🤖 Alimentée par LLM
              </div>
              <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-blue-700 to-indigo-700 bg-clip-text text-transparent">
                Analysez les photos et factures avec l'IA
              </h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-center">
                  <span className="text-blue-600 mr-3 text-lg">✨</span>
                  Téléchargez vos reçus ou factures en PDF pour reconnaissance automatique
                </li>
                <li className="flex items-center">
                  <span className="text-blue-600 mr-3 text-lg">✨</span>
                  Extrayez les informations clés comme dates, articles et commerces
                </li>
                <li className="flex items-center">
                  <span className="text-blue-600 mr-3 text-lg">✨</span>
                  Fonctionne avec n'importe quelle langue et qualité de photo
                </li>
                <li className="flex items-center">
                  <span className="text-blue-600 mr-3 text-lg">✨</span>
                  Organisez automatiquement tout dans une base de données structurée
                </li>
                <li className="flex items-center">
                  <span className="text-blue-600 mr-3 text-lg">✨</span>
                  Téléchargement en masse et analyse de plusieurs fichiers à la fois
                </li>
              </ul>
            </div>
            <div className="flex-1 relative aspect-auto rounded-3xl overflow-hidden shadow-2xl ring-4 ring-gradient-to-r from-blue-200 to-indigo-200 hover:scale-105 transition-all duration-500">
              <Image src="/landing/ai-scanner.webp" alt="AI Document Analyzer" width={1900} height={1524} />
            </div>
          </div>

          {/* Multi-currency Feature */}
          <div className="flex flex-wrap items-center gap-12 mb-20 bg-slate-50/50 p-8 rounded-3xl shadow-xl ring-2 ring-gradient-to-r from-green-200 to-emerald-200 hover:shadow-2xl transition-all duration-500 group flex-row-reverse">
            <div className="flex-1 min-w-60">
              <div className="inline-block px-4 py-2 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 text-white text-sm font-bold mb-4 shadow-lg">
                💱 Convertisseur de Devises
              </div>
              <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-green-700 to-emerald-700 bg-clip-text text-transparent">
                Convertissez automatiquement les devises (même la crypto!)
              </h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-center">
                  <span className="text-green-600 mr-3 text-lg">💰</span>
                  Détecte les devises étrangères et les convertit dans votre devise
                </li>
                <li className="flex items-center">
                  <span className="text-green-600 mr-3 text-lg">💰</span>
                  Connaît les taux de change historiques à la date de transaction
                </li>
                <li className="flex items-center">
                  <span className="text-green-600 mr-3 text-lg">💰</span>
                  Support de plus de 170 devises mondiales
                </li>
                <li className="flex items-center">
                  <span className="text-green-600 mr-3 text-lg">💰</span>
                  Fonctionne avec les crypto-monnaies populaires (BTC, ETH, LTC, etc.)
                </li>
                <li className="flex items-center">
                  <span className="text-green-600 mr-3 text-lg">💰</span>
                  Permet néanmoins de le remplir manuellement
                </li>
              </ul>
            </div>
            <div className="flex-1 relative aspect-auto rounded-3xl overflow-hidden shadow-2xl ring-4 ring-gradient-to-r from-green-200 to-emerald-200 hover:scale-105 transition-all duration-500">
              <Image src="/landing/multi-currency.webp" alt="Currency Converter" width={1400} height={1005} />
            </div>
          </div>

          {/* Transaction Table Feature */}
          <div className="flex flex-wrap items-center gap-12 mb-20 bg-slate-50/50 p-8 rounded-3xl shadow-xl ring-2 ring-gradient-to-r from-pink-200 to-rose-200 hover:shadow-2xl transition-all duration-500 group flex-row-reverse">
            <div className="flex-1 relative aspect-auto rounded-3xl overflow-hidden shadow-2xl ring-4 ring-gradient-to-r from-pink-200 to-rose-200 hover:scale-105 transition-all duration-500">
              <Image src="/landing/transactions.webp" alt="Transactions Table" width={2000} height={1279} />
            </div>
            <div className="flex-1  min-w-60">
              <div className="inline-block px-4 py-2 rounded-full bg-gradient-to-r from-pink-500 to-rose-600 text-white text-sm font-bold mb-4 shadow-lg">
                🔍 Filtres & Catégories
              </div>
              <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-pink-700 to-rose-700 bg-clip-text text-transparent">
                Organisez vos transactions avec des catégories, projets et champs entièrement personnalisés
              </h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-center">
                  <span className="text-pink-600 mr-3 text-lg">📊</span>
                  Liberté totale de créer des catégories, projets et champs personnalisés
                </li>
                <li className="flex items-center">
                  <span className="text-pink-600 mr-3 text-lg">📊</span>
                  Ajouter, modifier et gérer vos transactions
                </li>
                <li className="flex items-center">
                  <span className="text-pink-600 mr-3 text-lg">📊</span>
                  Filtrer par colonne, catégorie ou plage de dates
                </li>
                <li className="flex items-center">
                  <span className="text-pink-600 mr-3 text-lg">📊</span>
                  Personnaliser les colonnes affichées dans le tableau
                </li>
                <li className="flex items-center">
                  <span className="text-pink-600 mr-3 text-lg">📊</span>
                  Importer les transactions depuis CSV
                </li>
              </ul>
            </div>
          </div>

          {/* Invoice Generator */}
          <div className="flex flex-wrap items-center gap-12 mb-20 bg-slate-50/50 p-8 rounded-3xl shadow-xl ring-2 ring-gradient-to-r from-purple-200 to-indigo-200 hover:shadow-2xl transition-all duration-500 group">
            <div className="max-w-sm flex-1 relative aspect-auto rounded-3xl overflow-hidden shadow-2xl ring-4 ring-gradient-to-r from-purple-200 to-indigo-200 hover:scale-105 transition-all duration-500">
              <Image src="/landing/invoice-generator.webp" alt="Invoice Generator" width={1800} height={1081} />
            </div>
            <div className="flex-1 min-w-60">
              <div className="inline-block px-4 py-2 rounded-full bg-gradient-to-r from-purple-500 to-indigo-600 text-white text-sm font-bold mb-4 shadow-lg">
                📋 Générateur de Factures
              </div>
              <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-purple-700 to-indigo-700 bg-clip-text text-transparent">
                Créez des factures personnalisées
              </h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-center">
                  <span className="text-purple-600 mr-3 text-lg">📄</span>
                  Générateur de factures avancé pour créer n'importe quelle facture dans n'importe quelle langue
                </li>
                <li className="flex items-center">
                  <span className="text-purple-600 mr-3 text-lg">📄</span>
                  Modifiez n'importe quel champ, même les étiquettes et titres
                </li>
                <li className="flex items-center">
                  <span className="text-purple-600 mr-3 text-lg">📄</span>
                  Exportez les factures en PDF ou en tant que transactions
                </li>
                <li className="flex items-center">
                  <span className="text-purple-600 mr-3 text-lg">📄</span>
                  Sauvegardez les factures en tant que modèles pour les réutiliser plus tard
                </li>
                <li className="flex items-center">
                  <span className="text-purple-600 mr-3 text-lg">📄</span>
                  Support natif des taxes incluses et exclues (TVA, GST, etc.)
                </li>
              </ul>
            </div>
          </div>

          {/* Custom Fields & Categories */}
          <div className="flex flex-wrap items-center gap-12 mb-20 bg-slate-50/50 p-8 rounded-3xl shadow-xl ring-2 ring-gradient-to-r from-violet-200 to-purple-200 hover:shadow-2xl transition-all duration-500 group">
            <div className="flex-1 min-w-60">
              <div className="inline-block px-4 py-2 rounded-full bg-gradient-to-r from-violet-500 to-purple-600 text-white text-sm font-bold mb-4 shadow-lg">
                🎨 Contrôle sur l'IA
              </div>
              <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-violet-700 to-purple-700 bg-clip-text text-transparent">
                Personnalisez n'importe quel prompt LLM pour extraire tout ce dont vous avez besoin
              </h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-center">
                  <span className="text-violet-600 mr-3 text-lg">🔧</span>
                  Améliorez votre instance TaxHacker avec des prompts LLM personnalisés
                </li>
                <li className="flex items-center">
                  <span className="text-violet-600 mr-3 text-lg">🔧</span>
                  Créez vos propres champs et catégories et configurez l'IA pour les analyser
                </li>
                <li className="flex items-center">
                  <span className="text-violet-600 mr-3 text-lg">🔧</span>
                  Extrayez toute information supplémentaire dont vous avez besoin
                </li>
                <li className="flex items-center">
                  <span className="text-violet-600 mr-3 text-lg">🔧</span>
                  Catégorisez automatiquement par projet ou catégorie
                </li>
                <li className="flex items-center">
                  <span className="text-violet-600 mr-3 text-lg">🔧</span>
                  Demandez à l'IA d'évaluer le risque ou tout autre critère
                </li>
              </ul>
            </div>
            <div className="flex-1 relative aspect-auto rounded-3xl overflow-hidden shadow-2xl ring-4 ring-gradient-to-r from-violet-200 to-purple-200 hover:scale-105 transition-all duration-500">
              <Image src="/landing/custom-llm.webp" alt="Custom LLM promts" width={1800} height={1081} />
            </div>
          </div>

          {/* Data Export */}
          <div className="flex flex-wrap items-center gap-12 mb-20 bg-slate-50/50 p-8 rounded-3xl shadow-xl ring-2 ring-gradient-to-r from-orange-200 to-amber-200 hover:shadow-2xl transition-all duration-500 group flex-row-reverse">
            <div className="flex-1 min-w-60">
              <div className="inline-block px-4 py-2 rounded-full bg-gradient-to-r from-orange-500 to-amber-600 text-white text-sm font-bold mb-4 shadow-lg">
                📦 Auto-Hébergement & Export de Données
              </div>
              <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-orange-700 to-amber-700 bg-clip-text text-transparent">
                Vos Données — Vos Règles
              </h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-center">
                  <span className="text-orange-600 mr-3 text-lg">📤</span>
                  Déployez votre propre instance de TaxHacker pour 100 % de confidentialité
                </li>
                <li className="flex items-center">
                  <span className="text-orange-600 mr-3 text-lg">📤</span>
                  Exportez vos transactions en CSV pour la préparation fiscale
                </li>
                <li className="flex items-center">
                  <span className="text-orange-600 mr-3 text-lg">📤</span>
                  Recherche en texte intégral dans les documents et factures
                </li>
                <li className="flex items-center">
                  <span className="text-orange-600 mr-3 text-lg">📤</span>
                  Téléchargez l'archive complète des données pour migrer vers un autre service. Nous n'enlevons ni ne limitons ce que vous faites avec vos données
                </li>
              </ul>
            </div>
            <div className="flex-1 relative aspect-auto rounded-3xl overflow-hidden shadow-2xl ring-4 ring-gradient-to-r from-orange-200 to-amber-200 hover:scale-105 transition-all duration-500">
              <Image src="/landing/export.webp" alt="Export" width={1200} height={1081} />
            </div>
          </div>
        </div>
      </section>

      {/* Deployment Options */}
      <section
        id="start"
        className="py-20 px-8 bg-gradient-to-br from-white via-pink-50/20 to-indigo-50/20 scroll-mt-20 relative"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-pink-100/20 to-indigo-100/20" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-pink-600 to-indigo-600 bg-clip-text text-transparent">
              Choisissez Votre Version de TaxHacker
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-16">
            {/* Self-Hosted Version */}
            <div className="bg-slate-100/50 p-8 rounded-3xl shadow-xl ring-2 ring-gradient-to-r from-violet-200 to-indigo-200 hover:shadow-2xl transition-all duration-500 group">
              <div className="inline-block px-4 py-2 rounded-full bg-gradient-to-r from-violet-500 to-indigo-600 text-white text-sm font-bold mb-6 shadow-lg">
                🏠 Utiliser Votre Propre Serveur
              </div>
              <h3 className="text-2xl font-bold mb-4">
                <ColoredText>Édition Auto-Hébergée</ColoredText>
              </h3>
              <ul className="space-y-3 text-gray-700 mb-8">
                <li className="flex items-center">
                  <span className="text-indigo-600 mr-3 text-lg">🆓</span>
                  Gratuit et Open Source
                </li>
                <li className="flex items-center">
                  <span className="text-indigo-600 mr-3 text-lg">🔒</span>
                  Contrôle total sur vos données
                </li>
                <li className="flex items-center">
                  <span className="text-indigo-600 mr-3 text-lg">🏗️</span>
                  Déployez sur votre propre infrastructure ou serveur domestique
                </li>
                <li className="flex items-center">
                  <span className="text-indigo-600 mr-3 text-lg">🔑</span>
                  Apportez vos propres clés (OpenAI, Gemini, Mistral, etc.)
                </li>
              </ul>
              <Link
                href="https://github.com/TaxHacker/TaxHacker"
                target="_blank"
                className="block w-full text-center px-6 py-4 bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-bold rounded-full hover:from-violet-700 hover:to-indigo-700 transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-110"
              >
                Github + Docker Compose 🐳
              </Link>
            </div>

            {/* Cloud Version */}
            <div className="bg-slate-100/50 p-8 rounded-3xl shadow-xl ring-2 ring-gradient-to-r from-pink-200 to-purple-200 hover:shadow-2xl transition-all duration-500 group relative">
              <div className="inline-block px-4 py-2 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 text-white text-sm font-bold mb-6 shadow-lg">
                ☁️ Nous l'Hébergeons Pour Vous
              </div>
              <h3 className="text-2xl font-bold mb-4">
                <ColoredText>Édition Cloud</ColoredText>
              </h3>
              <ul className="space-y-3 text-gray-700 mb-8">
                <li className="flex items-center">
                  <span className="text-purple-600 mr-3 text-lg">🎯</span>
                  Version SaaS si vous ne voulez pas vous embêter avec vos propres serveurs et déploiements
                </li>
                <li className="flex items-center">
                  <span className="text-purple-600 mr-3 text-lg">🤖</span>
                  Nous vous fournissons les clés IA et le stockage
                </li>
                <li className="flex items-center">
                  <span className="text-purple-600 mr-3 text-lg">💳</span>
                  Plans d'abonnement annuels. Pas de frais cachés
                </li>
                <li className="flex items-center">
                  <span className="text-purple-600 mr-3 text-lg">🚀</span>
                  Mises à jour automatiques et nouvelles fonctionnalités
                </li>
              </ul>
              <button
                type="button"
                disabled
                className="block w-full text-center px-6 py-4 bg-gradient-to-r from-gray-300 to-gray-400 text-gray-700 font-bold rounded-full shadow-xl opacity-80 cursor-not-allowed"
              >
                Temporairement indisponible
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Upcoming Features */}
      <section className="py-20 px-8 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 mt-28 relative overflow-hidden">
        <div className="absolute top-10 left-10 w-64 h-64 bg-gradient-to-r from-pink-400 to-indigo-400 rounded-full opacity-5 blur-3xl" />
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-gradient-to-r from-indigo-400 to-pink-400 rounded-full opacity-5 blur-3xl" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-pink-600 to-indigo-600 bg-clip-text text-transparent">
              Fonctionnalités à Venir
            </h2>
            <p className="text-gray-700 max-w-2xl mx-auto font-medium">
              Nous sommes un petit projet indépendant en amélioration constante. Voici ce sur quoi nous travaillons ensuite.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {/* AI Improvements */}
            <div className="bg-slate-100/50 p-8 rounded-3xl shadow-xl ring-2 ring-gradient-to-r from-purple-200 to-indigo-200 hover:shadow-2xl transition-all duration-500 hover:scale-105">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl">🤖</span>
                <h3 className="text-xl font-bold bg-gradient-to-r from-purple-700 to-indigo-700 bg-clip-text text-transparent">
                  Meilleure Analyse IA & Agents
                </h3>
              </div>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-center">
                  <span className="text-purple-600 mr-3 text-lg">🔮</span>
                  Insights sur les revenus et dépenses
                </li>
                <li className="flex items-center">
                  <span className="text-purple-600 mr-3 text-lg">🔮</span>
                  Agents IA pour automatiser vos flux de travail
                </li>
                <li className="flex items-center">
                  <span className="text-purple-600 mr-3 text-lg">🔮</span>
                  Recommandations pour l'optimisation fiscale
                </li>
                <li className="flex items-center">
                  <span className="text-purple-600 mr-3 text-lg">🔮</span>
                  Modèles LLM personnalisés et locaux
                </li>
              </ul>
            </div>

            {/* Smart Reports */}
            <div className="bg-slate-100/50 p-8 rounded-3xl shadow-xl ring-2 ring-gradient-to-r from-pink-200 to-rose-200 hover:shadow-2xl transition-all duration-500 hover:scale-105">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl">📊</span>
                <h3 className="text-xl font-bold bg-gradient-to-r from-pink-700 to-rose-700 bg-clip-text text-transparent">
                  Rapports Intelligents & Rappels
                </h3>
              </div>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-center">
                  <span className="text-pink-600 mr-3 text-lg">📈</span>
                  Rapports TVA mensuels ou trimestriels
                </li>
                <li className="flex items-center">
                  <span className="text-pink-600 mr-3 text-lg">📈</span>
                  Rappels fiscaux
                </li>
                <li className="flex items-center">
                  <span className="text-pink-600 mr-3 text-lg">📈</span>
                  Rapports annuels de revenus et dépenses
                </li>
              </ul>
            </div>

            {/* Transaction Review */}
            <div className="bg-slate-100/50 p-8 rounded-3xl shadow-xl ring-2 ring-gradient-to-r from-green-200 to-emerald-200 hover:shadow-2xl transition-all duration-500 hover:scale-105">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl">📥</span>
                <h3 className="text-xl font-bold bg-gradient-to-r from-green-700 to-emerald-700 bg-clip-text text-transparent">
                  Examen Multitransactions
                </h3>
              </div>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-center">
                  <span className="text-green-600 mr-3 text-lg">💳</span>
                  Analyse de relevé bancaire
                </li>
                <li className="flex items-center">
                  <span className="text-green-600 mr-3 text-lg">💳</span>
                  Vérifications automatiques de complétude des données
                </li>
                <li className="flex items-center">
                  <span className="text-green-600 mr-3 text-lg">💳</span>
                  Suivi des factures impayées
                </li>
              </ul>
            </div>

            {/* Custom Fields */}
            <div className="bg-slate-100/50 p-8 rounded-3xl shadow-xl ring-2 ring-gradient-to-r from-orange-200 to-amber-200 hover:shadow-2xl transition-all duration-500 hover:scale-105">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl">🧩</span>
                <h3 className="text-xl font-bold bg-gradient-to-r from-orange-700 to-amber-700 bg-clip-text text-transparent">
                  Préférences et Plugins
                </h3>
              </div>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-center">
                  <span className="text-orange-600 mr-3 text-lg">🌍</span>
                  Préférences pour différents pays et industries
                </li>
                <li className="flex items-center">
                  <span className="text-orange-600 mr-3 text-lg">🌍</span>
                  Rapports personnalisés pour différents cas d'usage
                </li>
                <li className="flex items-center">
                  <span className="text-orange-600 mr-3 text-lg">🌍</span>
                  Plugins et rapports communautaires
                </li>
              </ul>
            </div>
          </div>

          {/* Stay Tuned / GitHub CTA */}
          <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-8 rounded-2xl shadow-sm ring-1 ring-gray-100">
            <div className="max-w-2xl mx-auto text-center">
              <h3 className="text-2xl font-semibold mb-4">Restez à l'écoute</h3>
              <p className="text-gray-600 mb-6">
                Nous travaillons dur pour rendre TaxHacker utile pour tout le monde. Suivez et épinglez notre dépôt GitHub pour être notifié des nouvelles fonctionnalités et versions.
              </p>
              <div className="flex flex-col gap-4 max-w-md mx-auto">
                <div className="flex flex-wrap items-center justify-center gap-4">
                  <a
                    href="https://github.com/TaxHacker/TaxHacker"
                    target="_blank"
                    rel="noreferrer"
                    className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-medium rounded-full hover:opacity-90 transition-all shadow-lg shadow-purple-500/20"
                  >
                    Voir le dépôt GitHub
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="py-8 px-8 bg-gradient-to-r from-pink-50 to-indigo-50 border-t-4 border-pink-200">
        <div className="max-w-7xl mx-auto text-center text-sm text-gray-600">
          Fait avec ❤️ pour vos impôts par l'équipe{" "}
          <Link
            href="https://github.com/TaxHacker"
            className="underline font-semibold hover:text-pink-600 transition-colors"
          >
            TaxHacker
          </Link>
        </div>

        <section className="py-12 px-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                href={`mailto:${config.app.supportEmail}`}
                className="text-sm text-gray-600 hover:text-pink-600 font-medium transition-colors"
              >
                Nous Contacter
              </Link>
              <Link
                href="/docs/terms"
                className="text-sm text-gray-600 hover:text-pink-600 font-medium transition-colors"
              >
                Conditions d'Utilisation
              </Link>
              <Link
                href="/docs/privacy_policy"
                className="text-sm text-gray-600 hover:text-pink-600 font-medium transition-colors"
              >
                Politique de Confidentialité
              </Link>
              <Link href="/docs/ai" className="text-sm text-gray-600 hover:text-pink-600 font-medium transition-colors">
                Divulgation d'Utilisation de l'IA
              </Link>
              <Link
                href="/docs/cookie"
                className="text-sm text-gray-600 hover:text-pink-600 font-medium transition-colors"
              >
                Politique de Cookies
              </Link>
              <Link
                href="https://github.com/TaxHacker/TaxHacker"
                target="_blank"
                className="text-sm text-gray-600 hover:text-pink-600 font-medium transition-colors"
              >
                Code Source
              </Link>
            </div>
          </div>
        </section>
      </footer>
    </div>
  )
}
