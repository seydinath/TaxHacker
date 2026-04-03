<div align="center"><a name="readme-top"></a>

<img src="public/logo/512.png" alt="" width="320">

<br>

# TaxHacker — Votre comptable IA auto-hébergée

[![GitHub Stars](https://img.shields.io/github/stars/seydinath/TaxHacker?color=ffcb47&labelColor=black&style=flat-square)](https://github.com/seydinath/TaxHacker/stargazers)
[![License](https://img.shields.io/badge/license-MIT-ffcb47?labelColor=black&style=flat-square)](https://github.com/seydinath/TaxHacker/blob/main/LICENSE)
[![GitHub Issues](https://img.shields.io/github/issues/seydinath/TaxHacker?color=ff80eb&labelColor=black&style=flat-square)](https://github.com/seydinath/TaxHacker/issues)

</div>

**TaxHacker** est une application de comptabilité auto-hébergée conçue pour les freelances, les PME et les indépendants qui veulent automatiser le suivi des dépenses et revenus avec l'IA.

Photographiez vos reçus ou téléchargez des factures PDF : TaxHacker extraira automatiquement les montants, dates, commerces, taxes et items, et les sauvegarde dans une base de données structurée. Créez des champs personnalisés avec vos propres prompts IA pour extraire tout ce dont vous avez besoin.

Conversion automatique des devises (y compris crypto) selon le taux du jour, filtrage avancé, support multi-projets, export/import — le tout pour simplifier votre déclaration fiscale.

> 🎥 [Regardez la vidéo de démo](https://taxhacker.app/landing/video.mp4) | ![Dashboard](public/landing/main-page.webp)

> ⚠️ **Projet en développement actif.** Utilisez à vos risques et périls.  **[Laissez une étoile](https://github.com/seydinath/TaxHacker) pour les notifications** ⭐️

## ✨ Fonctionnalités principales

### 1️⃣ Analyse IA des reçus et factures

Photographiez un reçu ou uploadez une facture PDF — TaxHacker extrait automatiquement les montants, dates, commerces, items et les catégorise. Fonctionne avec n'importe quel type de document, toutes langues et devises. **Choix d'IA** : OpenAI, Google Gemini ou Mistral.

### 2️⃣ Conversion multi-devises avec taux historiques

Détection automatique de la devise et conversion au taux du jour (y compris crypto BTC, ETH, etc.). Support de 170+ devises mondiales avec taux historiques.

### 3️⃣ Personnalisation complète : catégories, projets, champs

Créez vos propres catégories et projets. Ajoutez des champs personnalisés (comme des colonnes Excel) avec vos propres prompts IA. Recherche full-text, filtrage avancé.

### 4️⃣ Contrôle total des prompts IA

Modifiez les instructions d'extraction IA au niveau global ou par champ/catégorie/projet. Adaptation 100% flexible à votre secteur.

### 5️⃣ Export et filtrage flexible

Filtrez par date, catégorie, montant, champs perso. Exportez en CSV avec tous les documents attachés.

### 6️⃣ Auto-hébergement pour votre confidentialité

<<<<<<< HEAD
Hébergez sur votre infrastructure. Accès complet au code, Docker inclus, vos données vous appartiennent.

## � Installation avec Docker
=======
### `3` Use your own LLM: Ollama, LM Studio, vLLM, LocalAI etc

It's compatible with your local LLM OpenAI-compatible API endpoint. Just make sure that your local model is good in OCR tasks, results are not guaranteed :)

![Local LLMs](public/landing/local-llms.webp)

### `4` Organize your transactions using fully customizable categories, projects and fields

![Transactions Table](public/landing/transactions-big.webp)

Adapt TaxHacker to your unique needs with unlimited customization options. Create custom fields, projects, and categories that better suit your specific needs, idustry standards or country.

- **Custom categories and projecst**: Create your own categories and projects to group your transactions in any convenient way
- **Custom fields**: You can create unlimited number of custom fields to extraxt more information from your invoices (it's like creating extra columns in Excel)
- **Full-text search**: Search through the actual content of recognized documents
- **Advanced filtering**: Find exactly what you need with search and filter options
- **AI-powered extraction**: Write your own prompts to extract any custom information from documents
- **Bulk operations**: Process multiple documents or transactions at once

### `5` Customize any LLM prompt. Even system ones

![Custom Categories](public/landing/custom-llm.webp)

Take full control of how TaxHacker's AI processes your documents. Write custom AI prompts for fields, categories, and projects, or modify the built-in ones to match your specific needs.

- **Customizable system prompts**: Modify the general prompt template in settings to suit your business
- **Field or project-specific prompts**: Create custom extraction rules for your industry-specific documents
- **Full control**: Adjust field extraction priorities and naming conventions to match your workflow
- **Industry optimization**: Fine-tune the AI to understand your specific type of business documents
- **Full transparency**: Every aspect of the AI extraction process is under your control and can be changed right in settings

TaxHacker is 100% adaptable and tunable to your unique requirements — whether you need to extract emails, addresses, project codes, or any other custom information from your documents.

### `6` Flexible data filtering and export

![Data Export](public/landing/export.webp)

Once your documents are processed, easily view, filter, and export your complete transaction history exactly how you need it.

- **Advanced filtering**: Filter by date ranges, categories, projects, amounts, and any custom fields
- **Flexible exports**: Export filtered transactions to CSV with all attached documents included
- **Tax-ready reports**: Generate comprehensive reports for your accountant or tax advisor
- **Data portability**: Download complete data archives to migrate to other services—your data stays yours

### `7` Self-hosted mode for data privacy

![Self-hosting](docs/screenshots/exported_archive.png)

Keep complete control over your financial data with local storage and self-hosting options. TaxHacker respects your privacy and gives you full ownership of your information.

- **Home server ready**: Host on your own infrastructure for maximum privacy and control
- **Docker native**: Simple setup with provided Docker containers and compose files
- **Data ownership**: Your financial documents never leaves your control
- **No vendor lock-in**: Export everything and migrate whenever you want
- **Transparent operations**: Full access to source code and complete operational transparency

## 🛳 Deployment and Self-hosting

TaxHacker can be easily self-hosted on your own infrastructure for complete control over your data and application environment. We provide a [Docker image](./Dockerfile) and [Docker Compose](./docker-compose.yml) setup that makes deployment simple:
>>>>>>> bcf92d6e9ea2cf4eb86faf3b00924a3577b726c2

```bash
curl -O https://raw.githubusercontent.com/seydinath/TaxHacker/main/docker-compose.yml
docker compose up
```

Inclut : l'app TaxHacker + PostgreSQL 17 + migrations auto.

### Variables d'environnement

| Variable | Obligatoire | Description |
|----------|---|---|
| `UPLOAD_PATH` | Oui | Dossier des uploads (ex: `./data/uploads`) |
| `DATABASE_URL` | Oui | Connexion PostgreSQL (ex: `postgresql://user:pass@localhost:5432/taxhacker`) |
| `PORT` | Non | Port (défaut: `7331`) |
| `SELF_HOSTED_MODE` | Non | `true` pour mode auto-hébergé |
| `BETTER_AUTH_SECRET` | Oui | Clé secrète auth (min 16 caractères) |
| `OPENAI_API_KEY` / `GOOGLE_API_KEY` / `MISTRAL_API_KEY` | Non | Clés IA (au moins une requise) |

Exemple `docker-compose.yml` personnalisé :

```yaml
services:
  app:
    image: ghcr.io/seydinath/taxhacker:latest
    ports:
      - "7331:7331"
    environment:
      - SELF_HOSTED_MODE=true
      - DATABASE_URL=postgresql://postgres:postgres@postgres:5432/taxhacker
    volumes:
      - ./data:/app/data
    restart: unless-stopped
  postgres:
    image: postgres:17-alpine
    environment:
      - POSTGRES_PASSWORD=postgres
    volumes:
      - ./pgdata:/var/lib/postgresql/data
```

## ⌨️ Développement Local

Nous utilisons :

- **Next.js 15+** pour le frontend et l'API
- **Prisma** pour les modèles et migrations de base de données
- **PostgreSQL** comme base de données (PostgreSQL 17+ recommandé)
- **Ghostscript et GraphicsMagick** pour le traitement des PDF (installer sur macOS via `brew install gs graphicsmagick`)

<<<<<<< HEAD
## ⌨️ Configuration Locale

**Stack** : Next.js 15, React 19, Prisma, PostgreSQL 17, LangChain
=======

## ⌨️ Local Development

We use:

- **Next.js 15+** for the frontend and API
- **Prisma** for database models and migrations
- **PostgreSQL** as the database (PostgreSQL 17+ recommended)
- **Ghostscript and GraphicsMagick** for PDF processing (install on macOS via `brew install gs graphicsmagick`)

Set up your local development environment:
>>>>>>> bcf92d6e9ea2cf4eb86faf3b00924a3577b726c2

```bash
# Cloner le dépôt
git clone https://github.com/seydinath/TaxHacker.git
cd TaxHacker

# Installer les dépendances
npm install
cp .env.example .env

# Éditer .env : DATABASE_URL=postgresql://user@localhost:5432/taxhacker
npx prisma generate && npx prisma migrate dev
npm run dev
```

Accédez à `http://localhost:7331`

**Build production** :
```bash
npm run build && npm start
```

**Dépendances système** : PostgreSQL 17+, Ghostscript, GraphicsMagick (macOS: `brew install gs graphicsmagick`)
Si TaxHacker vous a aidé à gagner du temps ou à mieux gérer vos finances, considérez une donation pour soutenir son développement ! Vos dons nous aident à maintenir le projet, ajouter de nouvelles fonctionnalités, et le garder gratuit et open source.

[![Soutenir les devs TaxHacker](https://img.shields.io/badge/❤️-faire%20un%20don-f08080?labelColor=black&style=for-the-badge)](https://github.com/seydinath/TaxHacker)

## 📄 Licence

TaxHacker est sous licence [MIT License](LICENSE).