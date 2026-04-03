#!/bin/bash
# Script de déploiement sécurisé pour TaxHacker en production
# À adapter selon votre infrastructure

set -e

echo "=========================================="
echo "TaxHacker - Script de Déploiement Production"
echo "=========================================="

# Configuration
DOCKER_COMPOSE_FILE="docker-compose.production.yml"
APP_NAME="taxhacker_app"
BACKUP_DIR="./backups"

# Vérifications préalables
echo "Vérification des prérequis..."

if [ ! -f ".env" ]; then
    echo "ERREUR: Fichier .env non trouvé!"
    echo "Copier .env.production en .env et remplir les variables manquantes"
    exit 1
fi

if ! command -v docker &> /dev/null; then
    echo "ERREUR: Docker n'est pas installé"
    exit 1
fi

if ! command -v docker-compose &> /dev/null; then
    echo "ERREUR: Docker Compose n'est pas installé"
    exit 1
fi

# Créer répertoire de sauvegarde
mkdir -p "$BACKUP_DIR"

# Sauvegarder les données actuelles
echo "Sauvegarde des données..."
BACKUP_DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_PATH="$BACKUP_DIR/backup_$BACKUP_DATE"

if [ -d "./data" ]; then
    cp -r ./data "$BACKUP_PATH" || echo "Attention: Sauvegarde partielle"
    echo "Données sauvegardées dans: $BACKUP_PATH"
fi

# Arrêter les conteneurs existants
echo "Arrêt des conteneurs existants..."
docker-compose -f "$DOCKER_COMPOSE_FILE" down || true

# Construire ou pull l'image
echo "Preparation de l'image Docker..."
if [ -z "$DOCKER_REGISTRY" ]; then
    echo "Construction de l'image locale..."
    docker build -t taxhacker:latest .
fi

# Démarrer les conteneurs
echo "Démarrage des conteneurs..."
docker-compose -f "$DOCKER_COMPOSE_FILE" up -d

# Attendre que l'application soit prête
echo "Attendre que l'application se stabilise..."
sleep 10

# Vérifier la santé de l'application
echo "Vérification de la santé de l'application..."
MAX_RETRIES=30
RETRY_COUNT=0

while [ $RETRY_COUNT -lt $MAX_RETRIES ]; do
    if docker-compose -f "$DOCKER_COMPOSE_FILE" exec -T app wget --quiet --tries=1 --spider http://localhost:7331/ 2>/dev/null || \
       curl -f -s http://localhost:7331/ > /dev/null 2>&1; then
        echo "Application est opérationnelle!"
        break
    fi
    
    RETRY_COUNT=$((RETRY_COUNT + 1))
    echo "Tentative $RETRY_COUNT/$MAX_RETRIES - Application en démarrage..."
    sleep 1
done

if [ $RETRY_COUNT -eq $MAX_RETRIES ]; then
    echo "ERREUR: L'application n'a pas démarré correctement"
    echo "Affichage des logs..."
    docker-compose -f "$DOCKER_COMPOSE_FILE" logs
    exit 1
fi

# Vérifier les migrations
echo "Vérification des migrations de base de données..."
docker-compose -f "$DOCKER_COMPOSE_FILE" exec -T app npx prisma migrate status || true

echo ""
echo "=========================================="
echo "Déploiement réussi!"
echo "=========================================="
echo "Application disponible sur: http://localhost:7331"
echo "Sauvegarde créée: $BACKUP_PATH"
echo ""
echo "Prochaines étapes:"
echo "1. Configurer un reverse proxy (nginx, Caddy, etc.)"
echo "2. Mettre en place le monitoring"
echo "3. Configurer les sauvegardes automatiques"
echo "4. Activer HTTPS avec Let's Encrypt"
echo ""
