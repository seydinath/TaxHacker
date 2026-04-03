# Production Deployment Checklist - TaxHacker

**Version**: 0.5.5  
**Last Updated**: April 3, 2026  
**Status**: READY FOR PRODUCTION

## Pre-Deployment Verification (À compléter avant tout déploiement)

### Code Quality & Security
- [ ] Aucune erreur TypeScript (`npm run build`)
- [ ] Aucune erreur ESLint (`npm run lint`)
- [ ] Aucune variable d'environnement sensible en dur dans le code
- [ ] Les clés API testées et fonctionnelles
- [ ] Pas de console.log ou code de debug en production
- [ ] HTTPS obligatoire configuré

### Configuration Files
- [ ] `.env` copié de `.env.production` et complété
- [ ] `BETTER_AUTH_SECRET` généré aléatoirement (min 32 caractères)
- [ ] `DATABASE_URL` pointe vers une BD de production sécurisée
- [ ] Tous les modèles IA configurés (au moins 1)
- [ ] Variables Sentry configurées (optionnel mais recommandé)
- [ ] `.env` a des permissions 600 (`chmod 600 .env`)

### Database
- [ ] PostgreSQL 14+ installé et configuré
- [ ] Connexion BD testée depuis le serveur
- [ ] Migrations appliquées (`prisma migrate deploy`)
- [ ] Sauvegardes automatiques configurées
- [ ] Plan de récupération en cas de perte de données

### Docker & Deployment
- [ ] Dockerfile buildé sans erreurs localement
- [ ] Docker Compose production testée localement
- [ ] Image Docker optimisée (taille acceptable)
- [ ] Health checks fonctionnelles
- [ ] Logs Docker configurés avec rotation

### Reverse Proxy & HTTPS
- [ ] Nginx/Caddy/Apache configuré et testable
- [ ] Certificat SSL/TLS obtenu (Let's Encrypt)
- [ ] Redirection HTTP → HTTPS en place
- [ ] HSTS headers configurés
- [ ] Connection timeout appropriés

### Security
- [ ] Firewall configuré (accès SSH, HTTP, HTTPS seulement)
- [ ] SSH keys en place, password auth désactilié
- [ ] Fail2ban ou similaire pour protection brute-force
- [ ] Fail2ban configuré pour Nginx
- [ ] Sentry DSN validé et testé
- [ ] Rate limiting configuré pour les APIs
- [ ] CORS configuré correctement

### Monitoring & Alerts
- [ ] Logs Docker configurés avec rotation max-size
- [ ] Sentry intégré pour erreurs applicatives
- [ ] Monitoring uptime configuré (Uptime Robot, Pingdom, etc.)
- [ ] Alertes email/Slack configurées
- [ ] Plan de réponse aux incidents documenté

### Email (Si applicable)
- [ ] Resend API key testée
- [ ] Emails de test envoyés avec succès
- [ ] SMTP configuration validée
- [ ] SPF/DKIM/DMARC configurés

### Payments (Si applicable - Stripe)
- [ ] Clés Stripe de production en place (pas test)
- [ ] Webhook triggers testés
- [ ] Paiements de test réussis (montant minimal)
- [ ] Email de confirmation reçu

### Load Testing (Optionnel mais Recommandé)
- [ ] Capacité testée pour charge attendue
- [ ] Performance acceptable (< 2s response time)
- [ ] Aucune erreur sous charge
- [ ] Cache et CDN optimisés

### Documentation
- [ ] README.md à jour avec instructions de déploiement
- [ ] Runbook des incidents créé
- [ ] Contacts d'urgence documentés
- [ ] Processus de sauvegarde documenté
- [ ] Processus de mise à jour documenté

### Final Checks
- [ ] Personne techniquement compétente en charge du deploiement
- [ ] Plan de rollback préparé
- [ ] Sauvegarde complète avant déploiement
- [ ] Moniteurs en place pour alerter les incidents
- [ ] Temps d'arrêt attendu communiqué aux utilisateurs

---

## Post-Deployment Verification (À vérifier après déploiement)

### Functional Testing
- [ ] Application accessible via URL publique
- [ ] Login fonctionne
- [ ] Upload de fichier fonctionne
- [ ] Export de données fonctionne
- [ ] Appels IA fonctionnent
- [ ] Dashboard affiche les données correctes

### Performance & Resources
- [ ] Response time acceptable
- [ ] CPU usage normal (< 80%)
- [ ] Memory usage normal (< 80%)
- [ ] Disk space adéquat
- [ ] Database performance acceptable

### Logs & Monitoring
- [ ] Logs applicatifs normaux (aucune erreur critique)
- [ ] Sentry reçoit les events
- [ ] Monitoring uptime montre 100%
- [ ] Pas d'alertes anormales

### Security
- [ ] SSL certificate valide (pas de warning)
- [ ] Security headers présents
- [ ] CORS fonctionne correctement
- [ ] Rate limiting fonctionne
- [ ] Authentification requise pour les actions sensibles

### Cleanup
- [ ] Fichiers temporaires nettoyés
- [ ] Crons scripts de sauvegarde confirmés
- [ ] Logs archivés si nécessaire
- [ ] Documentation mise à jour

---

## Production Readiness Sign-Off

**Déploiement Approuvé Par**: ___________________________  
**Date**: ___________________________  
**Notes**: 

```
[Espace pour les notes supplémentaires]
```

### Emergency Contacts

| Rôle | Nom | Téléphone | Email |
|------|-----|----------|-------|
| Administrateur Principal | | | |
| Administrateur Secondaire | | | |
| Support Technique | | | |
| Provider Support | | | |

---

## Quick Deployment Steps

```bash
# 1. Préparation
cp .env.production .env
nano .env  # Remplir les variables

# 2. Déploiement
chmod +x deploy.sh
./deploy.sh

# 3. Vérification
docker-compose -f docker-compose.production.yml ps
docker-compose -f docker-compose.production.yml logs -f app

# 4. Test
curl -H "Host: taxhacker.app" http://localhost:7331/
```

---

## Rollback Plan (En cas de problème)

```bash
# 1. Arrêter les services
docker-compose -f docker-compose.production.yml down

# 2. Restaurer données
cp -r ./backups/backup_[TIMESTAMP] ./data

# 3. Redémarrer ancienne version
git checkout [PREVIOUS_COMMIT]
docker build -t taxhacker:latest .
docker-compose -f docker-compose.production.yml up -d
```

---

**✅ Application Ready for Production!**
