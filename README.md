# 🚀 GretaBox - Plateforme Éducative Interactive

## 📁 Organisation du Projet

```
GretaBox-main/
├── 📄 index.html                    # Page d'accueil principale
├── 🚀 start-server.js              # Script de démarrage
├── 📦 package.json                 # Configuration npm
├──
├── 📂 public/                      # 🌐 Fichiers web accessibles
│   ├── 📂 pages/                   # 📄 Pages HTML du site
│   │   ├── index.html              # Page d'accueil
│   │   ├── ide.html                # Éditeur de code en ligne
│   │   ├── contact.html            # Page de contact
│   │   ├── cybersecuriter.html     # Formation cybersécurité
│   │   ├── reseauxlan.html         # Formation réseaux LAN
│   │   ├── montagepc.html          # Formation montage PC
│   │   └── ...                     # Autres pages
│   └── 📂 assets/                  # 🎨 Ressources statiques
│       ├── 📂 css/                 # 🎨 Feuilles de style
│       │   ├── styles.css          # Styles principaux
│       │   └── ide.css             # Styles IDE
│       ├── 📂 js/                  # ⚡ Scripts JavaScript
│       │   ├── script.js           # Script IDE
│       │   ├── script2.js          # Script carrousel
│       │   ├── gretix.js           # Chatbot Gretix
│       │   └── ...                 # Autres scripts
│       ├── 📂 images/              # 🖼️ Images et icons
│       ├── 📂 libs/                # 📚 Bibliothèques externes
│       │   ├── codemirror.js       # Éditeur de code
│       │   ├── 📂 theme/           # Thèmes CodeMirror
│       │   └── 📂 mode/            # Modes de syntaxe
│       ├── 📂 pdf/                 # 📋 Documents PDF
│       └── 📂 image-dev/           # 🖼️ Images de développement
├──
├── 📂 server/                      # 🖥️ Code serveur
│   └── server.js                   # Serveur Express
├──
├── 📂 config/                      # ⚙️ Configuration
│   ├── env-simple.js               # Configuration environnement
│   ├── config.js                   # Configuration générale
│   ├── env-loader.js               # Chargeur d'environnement
│   └── env-to-js.js                # Convertisseur env
├──
├── 📂 docs/                        # 📖 Documentation
│   ├── DEPLOYMENT.md               # Guide de déploiement
│   └── NETLIFY-DEPLOY.md           # Déploiement Netlify
├──
├── 📂 node_modules/                # 📦 Dépendances npm
├── 📂 projet-co/                   # 🗂️ Versions antérieures
└── 📂 restes/                      # 🗂️ Archives
```

## 🚀 Démarrage Rapide

### 1️⃣ Installation

```bash
npm install
```

### 2️⃣ Configuration

```bash
# Copier le fichier d'exemple
cp env.example .env

# Modifier .env avec vos paramètres
```

### 3️⃣ Lancement

```bash
# Démarrage normal
npm start

# Mode développement (redémarrage automatique)
npm run dev
```

### 4️⃣ Accès

```
🌐 Site web : http://localhost:3000
💻 IDE en ligne : http://localhost:3000/public/pages/ide.html
```

## 🎯 Fonctionnalités

- ✅ **Site web éducatif** avec formations interactives
- ✅ **IDE en ligne** avec 23+ thèmes CodeMirror
- ✅ **Chatbot Gretix** avec IA intégrée
- ✅ **Formations** : Cybersécurité, Réseaux LAN, Montage PC
- ✅ **Responsive design** adaptatif
- ✅ **Architecture moderne** et organisée

## 🛠️ Technologies

- **Frontend** : HTML5, CSS3, JavaScript ES6+
- **Backend** : Node.js, Express.js
- **Éditeur** : CodeMirror avec syntaxe highlighting
- **IA** : OpenRouter API pour le chatbot
- **Déploiement** : Netlify ready

## 📖 Structure des Fichiers

### 🌐 Public (Frontend)

- **pages/** : Toutes les pages HTML du site
- **assets/css/** : Styles CSS organisés
- **assets/js/** : Scripts JavaScript côté client
- **assets/images/** : Images, logos, icons
- **assets/libs/** : Bibliothèques externes (CodeMirror)

### 🖥️ Server (Backend)

- **server/server.js** : Serveur Express avec API proxy

### ⚙️ Config

- **config/** : Tous les fichiers de configuration centralisés

## 🎨 Avantages de cette Organisation

✅ **Clarté** : Chaque type de fichier a sa place  
✅ **Maintenabilité** : Structure logique et prévisible  
✅ **Scalabilité** : Facile d'ajouter de nouvelles fonctionnalités  
✅ **Performance** : Ressources optimisées et bien organisées  
✅ **Collaboration** : Structure standard compréhensible par tous

## 📝 Notes de Développement

- Les chemins dans les fichiers HTML pointent vers la nouvelle structure
- Le serveur sert les fichiers statiques depuis la racine
- L'IDE est accessible via `/public/pages/ide.html`
- La configuration est centralisée dans `/config/`

---

**GretaBox Team - 2025** 🚀
