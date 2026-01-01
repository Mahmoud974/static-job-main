<div align="center">

<img src="public/img/bg.png" width="800" alt="bg image" />

# 🚀 AWS React Monitoring App  
### **Développement Front-end. Surveillance continue. Alertes automatiques.**

---

Application front-end moderne déployée sur AWS :  
✅ Interface React performante et stylée avec Tailwind CSS  
✅ Déploiement continu via AWS Amplify  
✅ Centralisation des logs et métriques  
✅ Alertes automatiques en cas d’erreur

</div>

---

## 🏗️ Architecture (diagramme)

<img src="public/images/schema-aws.png" width="800" alt="Architecture aws" />

---

## 🎯 Objectif

Mettre en place une application **simple mais professionnelle** démontrant :

- Un **déploiement automatisé** d’une application React
- Une **interface moderne et responsive** avec Tailwind CSS
- Une **surveillance applicative** en temps réel
- Un **système d’alertes** en cas de problème technique

> 🧠 *Un projet pensé pour montrer une approche DevOps claire et efficace.*

---

## ✨ Fonctionnalités clés

### ⚛️ Front-end React
- Application développée en **React.js**
- Styling avec **Tailwind CSS**
- Interface responsive et moderne
- Composants réutilisables

### 🚀 Déploiement automatique
- Hébergement via **AWS Amplify**
- Build et déploiement déclenchés à chaque push GitHub
- URL publique générée automatiquement

### 📈 Monitoring & logs
- Logs centralisés dans **Amazon CloudWatch**
- Suivi des erreurs et du comportement applicatif
- Base pour la création d’alarmes

### 🔔 Notifications
- **Amazon SNS** utilisé pour l’envoi d’alertes
- Notifications déclenchées via des alarmes CloudWatch
- Réception par email (ou autre protocole)

---

## 🚀 Stack & architecture

| Technologie | Usage |
|------------|------|
| **React.js** | Développement du front-end |
| **Tailwind CSS** | Styling & UI |
| **AWS Amplify** | Hébergement & CI/CD |
| **Amazon CloudWatch** | Logs, métriques et monitoring |
| **Amazon SNS** | Notifications & alertes |
| **GitHub** | Gestion du code source |

---

## 🔄 Cycle de fonctionnement

1. Push du code sur GitHub  
2. **AWS Amplify** déclenche automatiquement le build  
3. L’application est déployée et accessible publiquement  
4. Les logs sont envoyés vers **CloudWatch**  
5. En cas d’événement critique → **SNS envoie une alerte**

---

## 📝 À propos

Ce projet a pour but de démontrer une **architecture AWS simple, observable et automatisée**, idéale pour :

- Portfolio Developpeur front-end / DevOps
- Projets de démonstration AWS
