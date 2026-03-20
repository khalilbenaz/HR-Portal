<div align="center">

# 👥 HR Portal

**Portail de gestion des Ressources Humaines**

[![CI](https://github.com/khalilbenaz/HR-Portal/actions/workflows/ci.yml/badge.svg)](https://github.com/khalilbenaz/HR-Portal/actions/workflows/ci.yml)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript)](https://www.typescriptlang.org)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-14-336791?logo=postgresql&logoColor=white)](https://postgresql.org)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

Application web moderne pour la gestion des employés, congés, paie, performance et dashboard RH.

[Quick Start](#-quick-start) · [Pages](#-pages) · [Architecture](#-architecture)

</div>

---

## Fonctionnalités

### 👤 Gestion des employés
Création, édition et consultation de fiches employés avec informations détaillées, département, poste et historique.

### 📅 Gestion des congés
Demandes de congés avec workflow d'approbation, calendrier de disponibilité, soldes de congés et historique.

### 💰 Paie
Fiches de paie détaillées, historique des bulletins, calcul automatique et export.

### 📊 Performance
Objectifs individuels, évaluations périodiques, revues de performance et suivi des goals.

### 📈 Dashboard
Vue d'ensemble avec statistiques RH, graphiques employés, demandes de congés récentes et activité.

### 🔐 Authentification
Login sécurisé avec JWT, gestion des sessions et contrôle d'accès.

---

## 📱 Pages

| Page | Route | Description |
|------|-------|-------------|
| Dashboard | `/` | Statistiques, graphiques, activité récente |
| Login | `/login` | Authentification JWT |
| Employés | `/employees` | Liste avec filtres et recherche |
| Ajouter employé | `/employees/add` | Formulaire de création |
| Détail employé | `/employees/:id` | Fiche complète |
| Modifier employé | `/employees/:id/edit` | Édition |
| Congés | `/leave-requests` | Liste des demandes |
| Demande congé | `/leave-requests/add` | Nouvelle demande |
| Détail congé | `/leave-requests/:id` | Détail + approbation |
| Paie | `/payroll` | Fiches de paie |
| Bulletin | `/payroll/:id` | Détail bulletin |
| Performance | `/performance` | Objectifs + évaluations |
| Ajouter objectif | `/performance/goals/add` | Nouveau goal |
| Paramètres | `/settings` | Configuration |

---

## 🏗️ Architecture

```
HR-Portal/
├── src/
│   ├── pages/                    # 16 pages
│   ├── components/
│   │   ├── auth/                 # LoginForm
│   │   ├── dashboard/            # StatCard, Charts, Activity
│   │   ├── employees/            # List, Detail, Form
│   │   ├── leaves/               # RequestForm, RequestList
│   │   ├── payroll/              # PayslipList, PayslipDetail
│   │   ├── performance/          # Goals, Reviews, Modal
│   │   ├── layout/               # Header, Sidebar, MainLayout
│   │   └── ui/                   # 48 composants shadcn/ui
│   ├── hooks/                    # useAuth, useToast, useMobile
│   └── lib/                      # Utils, types
│
├── backend/
│   └── index.js                  # Express + Sequelize + JWT + bcrypt
│
└── docker-compose.yml            # Frontend + Backend + PostgreSQL
```

## Stack

| Couche | Technologies |
|--------|-------------|
| **Frontend** | React 19 · TypeScript · Vite · Tailwind CSS · shadcn/ui |
| **Backend** | Express.js · Sequelize ORM · JWT · bcrypt |
| **Database** | PostgreSQL 14 |
| **UI** | 48 composants shadcn/ui (Button, Card, Table, Dialog, Chart...) |
| **Container** | Docker Compose (frontend + backend + PostgreSQL) |
| **CI/CD** | GitHub Actions |

---

## 🚀 Quick Start

### Docker (recommandé)
```bash
docker-compose up --build
```
→ Frontend : `http://localhost:3000`
→ Backend : `http://localhost:5000`

### Manuel
```bash
# Frontend
npm install && npm run dev

# Backend
cd backend && npm install && node index.js
```

---

## Licence

MIT — [Khalil Benazzouz](https://github.com/khalilbenaz)
