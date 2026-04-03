#!/bin/bash
# Quick Start Production - TaxHacker
# Utiliser ce script pour un déploiement rapide

set -e

echo "=========================================="
echo "TaxHacker - Quick Production Setup"
echo "=========================================="

# Vérifier les prérequis
if [ ! -f ".env.production" ]; then
    echo "ERREUR: .env.production non trouvé!"
    exit 1
fi

echo ""
echo "📋 Étapes du déploiement:"
echo "1. Copier configuration production"
echo "2. Valider configuration"
echo "3. Construire image Docker"
echo "4. Démarrer services"
echo "5. Vérifier santé application"
echo ""

# 1. Copier configuration
echo "1️⃣  Copie de la configuration..."
cp .env.production .env
echo "   → Fichier .env créé"
echo "   ⚠️  IMPORTANT: Editer .env et remplir les variables manquantes!"
read -p "   Appuyer ENTER après avoir édité .env: "

# 2. Valider
echo ""
echo "2️⃣  Validation de la configuration..."
if grep -q "votre-" .env; then
    echo "   ⚠️  Variables placeholder détectées dans .env"
    echo "   Veuillez les remplacer par des valeurs réelles"
    exit 1
fi
chmod 600 .env
echo "   ✓ Configuration validée"

# 3. Build Docker
echo ""
echo "3️⃣  Construction image Docker..."
docker build -t taxhacker:latest . || exit 1
echo "   ✓ Image construite"

# 4. Démarrer services
echo ""
echo "4️⃣  Démarrage des services..."
docker-compose -f docker-compose.production.yml down 2>/dev/null || true
docker-compose -f docker-compose.production.yml up -d
echo "   ✓ Services démarrés"

# 5. Vérifier santé
echo ""
echo "5️⃣  Vérification de la santé application..."
sleep 5

HEALTH_CHECK=0
for i in {1..10}; do
    if curl -f -s http://localhost:7331/ > /dev/null 2>&1; then
        HEALTH_CHECK=1
        break
    fi
    echo "   Tentative $i/10..."
    sleep 2
done

if [ $HEALTH_CHECK -eq 1 ]; then
    echo "   ✓ Application opérationnelle!"
    echo ""
    echo "=========================================="
    echo "✅ DÉPLOIEMENT RÉUSSI!"
    echo "=========================================="
    echo ""
    echo "🌐 Application disponible: http://localhost:7331"
    echo ""
    echo "📚 Prochaines étapes:"
    echo "   1. Configurer reverse proxy: https://taxhacker.votre-domaine.com"
    echo "   2. Obtenir certificat SSL avec Let's Encrypt"
    echo "   3. Configurer monitoring/logs"
    echo "   4. Mettre en place automated backups"
    echo ""
    echo "📖 Consulter DEPLOYMENT_GUIDE.md pour plus de détails"
    echo "   Consulter DEPLOYMENT_CHECKLIST.md pour vérifications"
else
    echo "   ❌ Application n'a pas démarré correctement"
    echo ""
    echo "🔍 Diagnostic:"
    docker-compose -f docker-compose.production.yml logs app | tail -20
    exit 1
fi
