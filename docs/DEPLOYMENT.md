# 🚀 Guide de déploiement - Chatbot Gretix

## 🔒 Version Production (Sécurisée)

### **Option 1 : Serveur Node.js + Express (Recommandée)**

#### **1. Installation locale**

```bash
# Installation des dépendances
npm install

# Configuration
cp .env.example .env
# Éditez .env avec vos vraies valeurs

# Test en local
npm start
# Ouvrez http://localhost:3000
```

#### **2. Déploiement sur plateforme cloud**

**Sur Heroku :**

```bash
# Installation Heroku CLI
npm install -g heroku

# Création de l'app
heroku create gretabox-chatbot

# Configuration des variables d'environnement
heroku config:set OPENROUTER_API_KEY=votre_cle_api
heroku config:set OPENROUTER_MODEL=nousresearch/deephermes-3-mistral-24b-preview:free

# Déploiement
git add .
git commit -m "Deploy production version"
git push heroku main
```

**Sur Railway :**

1. Connectez votre repo GitHub à Railway
2. Ajoutez les variables d'environnement dans l'interface
3. Railway déploie automatiquement

**Sur DigitalOcean App Platform :**

1. Créez une nouvelle app depuis votre repo
2. Configurez les variables d'environnement
3. DigitalOcean gère le déploiement

#### **3. Variables d'environnement en production**

```env
# .env pour production
OPENROUTER_API_KEY=sk-or-v1-votre_vraie_cle
OPENROUTER_MODEL=nousresearch/deephermes-3-mistral-24b-preview:free
PORT=3000
HTTP_REFERER=https://votre-domaine.com
```

### **Option 2 : Netlify Functions (Serverless)**

#### **1. Structure des fichiers**

```
netlify/
  functions/
    chat.js          # Function serverless
public/
  index.html        # Version production
  gretix-secure.js  # Client sécurisé
```

#### **2. Fonction Netlify**

```javascript
// netlify/functions/chat.js
exports.handler = async (event, context) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  const { messages, temperature, max_tokens } = JSON.parse(event.body);

  const response = await fetch(
    "https://openrouter.ai/api/v1/chat/completions",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: process.env.OPENROUTER_MODEL,
        messages,
        temperature: temperature || 0.7,
        max_tokens: max_tokens || 1000,
      }),
    }
  );

  const data = await response.json();

  return {
    statusCode: 200,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };
};
```

### **Option 3 : Vercel Edge Functions**

#### **1. Configuration Vercel**

```javascript
// api/chat.js
export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { messages, temperature, max_tokens } = req.body;

  const response = await fetch(
    "https://openrouter.ai/api/v1/chat/completions",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model:
          process.env.OPENROUTER_MODEL ||
          "nousresearch/deephermes-3-mistral-24b-preview:free",
        messages,
        temperature: temperature || 0.7,
        max_tokens: max_tokens || 1000,
      }),
    }
  );

  const data = await response.json();
  res.status(200).json(data);
}
```

## 📊 Comparaison des solutions

| Solution         | Coût | Simplicité | Performance | Recommandé pour  |
| ---------------- | ---- | ---------- | ----------- | ---------------- |
| **Heroku**       | €€   | ⭐⭐⭐⭐   | ⭐⭐⭐      | Débutants        |
| **Railway**      | €€   | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐    | Projets modernes |
| **Netlify**      | €    | ⭐⭐⭐     | ⭐⭐⭐⭐    | Sites statiques  |
| **Vercel**       | €    | ⭐⭐⭐⭐   | ⭐⭐⭐⭐⭐  | Next.js/React    |
| **DigitalOcean** | €€   | ⭐⭐⭐     | ⭐⭐⭐⭐    | Production       |

## 🛡️ Sécurité en production

### **✅ À faire :**

- Utiliser HTTPS uniquement
- Mettre les clés API dans les variables d'environnement
- Ajouter rate limiting (limitation des requêtes)
- Configurer CORS correctement
- Surveiller l'utilisation de l'API

### **❌ À éviter :**

- Jamais de clés API dans le code côté client
- Pas de clés en dur dans le code
- Éviter les requêtes directes depuis le navigateur
- Ne pas exposer les erreurs détaillées aux utilisateurs

## 🚦 Test avant déploiement

```bash
# Test local avec le serveur
npm start

# Test des endpoints
curl -X POST http://localhost:3000/api/chat \
  -H "Content-Type: application/json" \
  -d '{"messages":[{"role":"user","content":"Bonjour"}]}'

# Vérification que les clés ne sont pas exposées
curl http://localhost:3000 | grep -i "api"  # Ne doit rien retourner
```

---

🎯 **Recommandation :** Commencez avec Railway ou Heroku pour la simplicité, puis migrez vers DigitalOcean pour la production à grande échelle.
