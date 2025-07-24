# 🚀 Déploiement sur Netlify - Guide complet

## 📋 **Prérequis**

- Compte GitHub (pour connecter votre repo)
- Compte Netlify (gratuit)
- Votre clé API OpenRouter

## 🔧 **Étape 1 : Préparer le repository**

### **1.1 Structure des fichiers nécessaires**

Vérifiez que vous avez ces fichiers :

```
✅ netlify/functions/chat.js    # Fonction serverless
✅ netlify.toml                 # Configuration Netlify
✅ index-production.html        # Page principale
✅ gretix-netlify.js           # Client JavaScript
✅ styles.css                  # Styles
✅ image/                      # Dossier images
```

### **1.2 Push sur GitHub**

```bash
# Initialiser Git (si pas encore fait)
git init

# Ajouter tous les fichiers
git add .

# Commit
git commit -m "Deploy to Netlify with chatbot"

# Ajouter remote GitHub (remplacez YOUR_USERNAME/YOUR_REPO)
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git

# Push
git push -u origin main
```

## 🌐 **Étape 2 : Déployer sur Netlify**

### **2.1 Connexion du repository**

1. Allez sur [netlify.com](https://netlify.com)
2. Cliquez sur **"New site from Git"**
3. Choisissez **GitHub**
4. Sélectionnez votre repository **"Projet co GrataBox"**

### **2.2 Configuration du build**

```
Build command: echo "Site statique prêt"
Publish directory: .
Functions directory: netlify/functions
```

_(Netlify détecte automatiquement le `netlify.toml`)_

### **2.3 Variables d'environnement**

Dans l'interface Netlify, allez dans **Site settings > Environment variables** :

| Variable             | Valeur                                               |
| -------------------- | ---------------------------------------------------- |
| `OPENROUTER_API_KEY` | `sk-or-v1-votre_cle_api_ici`                         |
| `OPENROUTER_MODEL`   | `nousresearch/deephermes-3-mistral-24b-preview:free` |

## 🔧 **Étape 3 : Configuration finale**

### **3.1 Nom de domaine personnalisé**

1. Dans **Site settings > Domain management**
2. Cliquez **"Change site name"**
3. Choisissez : `gretabox-chatbot` ou similaire
4. URL finale : `https://gretabox-chatbot.netlify.app`

### **3.2 Redirection de la page principale**

Modifiez `netlify.toml` si nécessaire :

```toml
[[redirects]]
  from = "/"
  to = "/index-production.html"
  status = 200
```

## 🧪 **Étape 4 : Test du déploiement**

### **4.1 Vérification des Functions**

1. Ouvrez l'URL de votre site
2. Cliquez sur l'icône Gretix
3. Testez un message : "Bonjour"

### **4.2 Debug en cas de problème**

```bash
# Logs des Functions dans Netlify
Site overview > Functions > chat > View logs

# Test direct de la function
curl -X POST https://votre-site.netlify.app/.netlify/functions/chat \
  -H "Content-Type: application/json" \
  -d '{"messages":[{"role":"user","content":"test"}]}'
```

## 📊 **Monitoring et limites**

### **Netlify Functions - Plan gratuit :**

- ✅ **125,000 requêtes/mois**
- ✅ **100 heures de runtime/mois**
- ✅ Pas de limite de sites

### **OpenRouter - Modèle gratuit :**

- ✅ **DeepHermes 3 Mistral** : illimité (avec rate limiting)
- ⚠️ Surveiller l'usage sur [openrouter.ai/activity](https://openrouter.ai/activity)

## 🚨 **Dépannage courant**

### **Erreur : "Function not found"**

- Vérifiez que `netlify/functions/chat.js` existe
- Vérifiez le `netlify.toml`
- Redéployez : **Deploys > Trigger deploy**

### **Erreur : "API Key missing"**

- Vérifiez les variables d'environnement
- Attendez 1-2 minutes après ajout des variables
- Redéployez

### **Erreur CORS**

- Les headers CORS sont configurés dans `chat.js`
- Testez depuis votre domaine Netlify uniquement

## 🔄 **Mise à jour du site**

Pour mettre à jour :

```bash
git add .
git commit -m "Update chatbot"
git push
```

Netlify redéploie automatiquement !

## 🎯 **Optimisations possibles**

### **Performance**

- Activer Netlify Edge Functions (plus rapide)
- Ajouter un cache pour les réponses fréquentes

### **Sécurité**

- Ajouter rate limiting par IP
- Filtrer les messages selon la longueur

---

🎉 **Votre chatbot Gretix est maintenant en ligne et sécurisé !**

**URL de test** : `https://votre-site.netlify.app`
