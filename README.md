# HR Portal

Un portail de gestion des ressources humaines complet avec une interface utilisateur moderne et réactive.

## À propos du projet

HR Portal est une application web complète pour la gestion des ressources humaines, permettant de gérer les employés, les congés, les performances et la paie. L'application est construite avec une architecture moderne utilisant React pour le frontend et .NET Core pour le backend, avec PostgreSQL comme base de données.

## Architecture

L'application est divisée en trois parties principales :

- **Frontend** : Application React avec TypeScript, utilisant Vite comme outil de build
- **Backend API** : API .NET Core avec GraphQL
- **Base de données** : PostgreSQL

## Technologies utilisées

### Frontend
- React 18
- TypeScript
- Vite
- Apollo Client (GraphQL)
- React Router
- Tailwind CSS
- shadcn/ui (composants UI)
- React Hook Form & Zod (validation de formulaires)

### Backend
- .NET Core 8
- GraphQL
- Entity Framework Core
- Architecture en couches (API, Core, Infrastructure)

### Base de données
- PostgreSQL 16

### Déploiement
- Docker & Docker Compose

## Prérequis

- [Docker](https://www.docker.com/products/docker-desktop/) et Docker Compose
- [Node.js](https://nodejs.org/) (v18 ou supérieur) et npm pour le développement local
- [.NET SDK 8.0](https://dotnet.microsoft.com/download) pour le développement local du backend

## Installation et démarrage

### Avec Docker (recommandé)

1. Clonez le dépôt :
   ```sh
   git clone <URL_DU_DÉPÔT>
   cd HR-Portal
   ```

2. Créez un fichier `.env` à partir du modèle :
   ```sh
   cp .env.example .env
   ```

3. Démarrez l'application avec Docker Compose :
   ```sh
   docker-compose up -d
   ```

4. Accédez à l'application :
   - Frontend : http://localhost:3000
   - API GraphQL : http://localhost:5000/graphql

### Développement local

#### Frontend

1. Installez les dépendances :
   ```sh
   npm install
   ```

2. Démarrez le serveur de développement :
   ```sh
   npm run dev
   ```

3. L'application sera disponible à l'adresse : http://localhost:5173

#### Backend

1. Naviguez vers le répertoire de l'API :
   ```sh
   cd api/HR.Portal.API
   ```

2. Restaurez les packages et exécutez l'API :
   ```sh
   dotnet restore
   dotnet run
   ```

3. L'API sera disponible à l'adresse : http://localhost:5000

## Structure du projet

```
├── api/                      # Code du backend
│   ├── HR.Portal.API/        # Projet API
│   │   ├── GraphQL/          # Définitions GraphQL
│   │   └── Migrations/       # Migrations de base de données
│   ├── HR.Portal.Core/       # Couche domaine
│   │   └── Entities/         # Entités du domaine
│   └── HR.Portal.Infrastructure/ # Couche d'accès aux données
│       └── Repositories/     # Implémentations des repositories
├── src/                      # Code du frontend
│   ├── components/           # Composants React
│   │   ├── auth/             # Composants d'authentification
│   │   ├── dashboard/        # Composants du tableau de bord
│   │   ├── employees/        # Gestion des employés
│   │   ├── leaves/           # Gestion des congés
│   │   ├── payroll/          # Gestion de la paie
│   │   └── performance/      # Gestion des performances
│   ├── hooks/                # Hooks personnalisés
│   ├── lib/                  # Utilitaires et configurations
│   │   └── graphql/          # Requêtes et mutations GraphQL
│   └── pages/                # Pages de l'application
└── docker-compose.yml        # Configuration Docker Compose
```

## Fonctionnalités

- **Gestion des employés** : Ajout, modification et suppression d'employés
- **Gestion des congés** : Demandes et approbation de congés
- **Évaluation des performances** : Suivi des objectifs et évaluations
- **Gestion de la paie** : Génération et visualisation des fiches de paie
- **Tableau de bord** : Vue d'ensemble des indicateurs clés
- **Authentification** : Système de connexion sécurisé avec JWT

## Contribution

Les contributions sont les bienvenues ! N'hésitez pas à ouvrir une issue ou à soumettre une pull request.

## Licence

Ce projet est sous licence [MIT](LICENSE).
