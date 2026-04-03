# Guide de Déploiement Production - TaxHacker

## Configuration Système Requise

### Serveur
- CPU: 2+ cores
- RAM: 2+ GB
- Disque: 20+ GB SSD
- OS: Linux (Ubuntu 22.04 LTS recommandé)

### Services
- Docker 20.10+
- Docker Compose 2.0+
- PostgreSQL 14+ (ou service géré)
- SMTP pour emails (optionnel)

## Checklist de Sécurité Pré-Déploiement

### 1. Authentification et Secrets
- [ ] Générer `BETTER_AUTH_SECRET` aléatoire (minimum 32 caractères)
  ```bash
  openssl rand -base64 32
  ```
- [ ] Configurer des mots de passe forts pour la BD
- [ ] Stocker les secrets en dehors du code (utiliser `.env` chiffré)
- [ ] Jamais commiter `.env` en production vers Git

### 2. Configuration de la Base de Données
- [ ] Utiliser une base de données dédiée et sécurisée
- [ ] Configurer des sauvegardes automatiques (quotidiennes minimum)
- [ ] Tester le processus de restauration
- [ ] Utiliser SSL/TLS pour les connexions BD
- [ ] Restreindre l'accès BD par IP/firewall

### 3. Configuration des Clés API
- [ ] Configurer au moins un fournisseur IA (OpenAI recommandé)
- [ ] Utiliser des clés API d'environnement production (pas de clés de dev)
- [ ] Configurer les limites de rate-limiting
- [ ] Monitorer l'utilisation des APIs

### 4. Configuration HTTPS/TLS
- [ ] Obtenir un certificat SSL valide (Let's Encrypt gratuit)
- [ ] Configurer un reverse proxy (Nginx ou Caddy)
- [ ] Forcer HTTPS (redirection HTTP → HTTPS)
- [ ] Configurer HSTS headers

## Déploiement Rapide

### 1. Préparation du Serveur

```bash
# Installer Docker et Docker Compose
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# Ajouter l'utilisateur au groupe Docker
sudo usermod -aG docker $USER
newgrp docker

# Vérifier l'installation
docker --version
docker-compose --version
```

### 2. Préparer l'Application

```bash
# Cloner le repository
git clone https://github.com/votre-org/TaxHacker.git
cd TaxHacker

# Copier la configuration de production
cp .env.production .env

# IMPORTANT: Éditer .env et configurer toutes les variables
nano .env

# Vérifier la sécurité
chmod 600 .env
```

### 3. Déployer l'Application

#### Option A: Utiliser le script de déploiement

```bash
chmod +x deploy.sh
./deploy.sh
```

#### Option B: Déploiement manuel

```bash
# Construire l'image Docker
docker build -t taxhacker:latest .

# Démarrer les services
docker-compose -f docker-compose.production.yml up -d

# Vérifier le statut
docker-compose -f docker-compose.production.yml ps

# Consulter les logs
docker-compose -f docker-compose.production.yml logs -f app
```

## Configuration Reverse Proxy

### Nginx

```nginx
server {
    listen 443 ssl http2;
    server_name taxhacker.votre-domaine.com;

    ssl_certificate /etc/letsencrypt/live/taxhacker.votre-domaine.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/taxhacker.votre-domaine.com/privkey.pem;

    # Sécurité
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;
    ssl_prefer_server_ciphers on;
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;

    # Proxy
    location / {
        proxy_pass http://127.0.0.1:7331;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}

# Redirection HTTP -> HTTPS
server {
    listen 80;
    server_name taxhacker.votre-domaine.com;
    return 301 https://$server_name$request_uri;
}
```

### Caddy (Recommandé - Let's Encrypt automatique)

```caddyfile
taxhacker.votre-domaine.com {
    reverse_proxy 127.0.0.1:7331
}
```

## Sauvegardes et Récupération

### Sauvegarde Quotidienne Automatique

```bash
# Créer un script de sauvegarde
cat > /home/taxhacker/backup.sh << 'EOF'
#!/bin/bash
BACKUP_DIR="/backup/taxhacker"
RETENTION_DAYS=30
DATE=$(date +%Y%m%d_%H%M%S)

mkdir -p $BACKUP_DIR

# Sauvegarder les données
docker-compose -f /app/TaxHacker/docker-compose.production.yml exec -T postgres pg_dump \
  postgresql://user:password@localhost:5432/taxhacker > $BACKUP_DIR/db_$DATE.sql

# Sauvegarder les fichiers
tar -czf $BACKUP_DIR/uploads_$DATE.tar.gz /app/TaxHacker/data/uploads/

# Nettoyer les anciennes sauvegardes
find $BACKUP_DIR -type f -mtime +$RETENTION_DAYS -delete
EOF

chmod +x /home/taxhacker/backup.sh

# Ajouter à cron (quotidien à 2h du matin)
crontab -e
# 0 2 * * * /home/taxhacker/backup.sh >> /var/log/taxhacker-backup.log 2>&1
```

## Monitoring et Logs

### Docker Logs

```bash
# Logs en temps réel
docker-compose -f docker-compose.production.yml logs -f app

# Logs avec timestamps
docker-compose -f docker-compose.production.yml logs --timestamps app

# Dernières 100 lignes
docker-compose -f docker-compose.production.yml logs app -n 100
```

### Sentry (Monitoring des Erreurs)

```bash
# Dans .env
NEXT_PUBLIC_SENTRY_DSN="https://..."
SENTRY_ORG="votre-org"
SENTRY_PROJECT="taxhacker"
SENTRY_AUTH_TOKEN="..."
```

## Mise à Jour

```bash
cd /app/TaxHacker

# 1. Sauvegarder
./backup.sh

# 2. Tirer les derniers changements
git pull origin main

# 3. Reconstruire l'image
docker build -t taxhacker:latest .

# 4. Redémarrer
docker-compose -f docker-compose.production.yml down
docker-compose -f docker-compose.production.yml up -d

# 5. Vérifier
docker-compose -f docker-compose.production.yml ps
```

## Dépannage

### L'application ne démarre pas

```bash
# Vérifier les logs
docker-compose -f docker-compose.production.yml logs app

# Vérifier le statut de santé
docker-compose -f docker-compose.production.yml ps
```

### Erreurs de base de données

```bash
# Vérifier la connexion BD
docker-compose -f docker-compose.production.yml exec app \
  npm run migrate:status

# Appliquer les migrations manquantes
docker-compose -f docker-compose.production.yml exec app \
  npx prisma migrate deploy
```

### Problèmes de disque

```bash
# Nettoyer les images non utilisées
docker image prune -a

# Nettoyer les volumes non utilisés
docker volume prune

# Vérifier l'utilisation disque
docker system df
```

## Performance et Optimisation

### Tuning de la Base de Données

```sql
-- Augmenter les connexions
ALTER SYSTEM SET max_connections = 200;
ALTER SYSTEM SET shared_buffers = '256MB';
ALTER SYSTEM SET effective_cache_size = '1GB';

-- Redémarrer PostgreSQL
SELECT pg_reload_conf();
```

### Cache et CDN

- Configurer un CDN pour les assets statiques (images, CSS, JS)
- Ajouter les headers de cache appropriés
- Utiliser Redis pour les sessions (optionnel)

## Contacts et Support

- Documenter les contacts d'urgence
- Configurer un système de monitoring/alertes
- Maintenir une documentation des processus opérationnels
