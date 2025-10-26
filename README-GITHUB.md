# 🚗 Wasselni - Application de Covoiturage Tunisienne

Application mobile de covoiturage conçue pour la Tunisie, permettant aux utilisateurs de partager leurs trajets et de réduire les coûts de transport.

## 📱 Fonctionnalités

- ✅ Inscription et authentification sécurisée
- ✅ Recherche de trajets disponibles
- ✅ Offre de trajets avec véhicule
- ✅ Réservation de places
- ✅ Gestion de profil complet
- ✅ Gestion des véhicules
- ✅ Système de paiement (Cash, Carte, etc.)
- ✅ Notifications en temps réel
- ✅ Localisation tunisienne (Tunis, Ariana, Sousse, etc.)
- ✅ Prix en TND

## 🛠️ Technologies

### Backend
- Node.js
- Express.js
- SQLite
- Sequelize ORM
- JWT Authentication
- Socket.IO (temps réel)

### Frontend
- React Native
- Expo SDK 54
- React Navigation
- React Native Paper
- Axios

## 📦 Installation

### Prérequis
- Node.js 20+
- npm ou yarn
- Expo Go (sur téléphone)

### Backend

```bash
cd backend
npm install
npm start
```

Le serveur démarre sur `http://localhost:3000`

### Mobile

```bash
cd mobile
npm install
npx expo start
```

Scannez le QR code avec Expo Go.

## 🚀 Déploiement

### Backend (Render.com)

1. Créer un compte sur [Render.com](https://render.com)
2. Nouveau Web Service
3. Connecter le repository GitHub
4. Configuration:
   ```
   Root Directory: backend
   Build Command: npm install
   Start Command: node src/server.js
   ```
5. Variables d'environnement:
   ```
   NODE_ENV=production
   JWT_SECRET=your-secret-key
   ```

## 🔧 Configuration

### Backend

Créer un fichier `.env` dans le dossier `backend`:

```env
NODE_ENV=development
PORT=3000
JWT_SECRET=your-secret-key-here
```

### Mobile

Modifier `mobile/src/services/api.js`:

```javascript
// Pour développement local
const API_BASE_URL = 'http://YOUR-IP:3000/api';

// Pour production
const API_BASE_URL = 'https://your-app.onrender.com/api';
```

## 📱 Utilisation

### Pour les Passagers

1. Inscription/Connexion
2. Recherche de trajets disponibles
3. Réservation d'un trajet
4. Gestion des réservations dans "Mes Réservations"

### Pour les Conducteurs

1. Ajout d'un véhicule
2. Offre d'un trajet (origine, destination, prix, places)
3. Gestion des trajets offerts
4. Consultation des réservations

## 🗂️ Structure du Projet

```
Wasselni/
├── backend/
│   ├── src/
│   │   ├── models/      # Modèles Sequelize
│   │   ├── routes/      # Routes API
│   │   ├── middleware/  # Middleware Express
│   │   ├── app.js       # Configuration Express
│   │   └── server.js    # Point d'entrée
│   └── package.json
├── mobile/
│   ├── src/
│   │   ├── screens/     # Écrans React Native
│   │   ├── services/    # Services API
│   │   └── contexts/    # Contextes React
│   ├── App.js
│   ├── app.json
│   └── package.json
└── README.md
```

## 🔒 Sécurité

- Authentification JWT
- Mots de passe hashés avec bcrypt
- Validation des entrées
- Protection CORS
- Helmet.js pour sécurité HTTP

## 🌍 Localisation

L'application est optimisée pour la Tunisie:
- Villes tunisiennes (Tunis, Ariana, Sousse, etc.)
- Prix en TND
- Interface en français
- Numéros de téléphone tunisiens (+216)

## 📄 Licence

MIT

## 👥 Auteur

Développé pour faciliter le covoiturage en Tunisie 🇹🇳

---

**Fait avec ❤️ en Tunisie**
