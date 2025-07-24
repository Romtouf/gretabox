// Serveur proxy pour cacher la clé API OpenRouter
// Usage: node server.js

const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3051;

// Middleware
app.use(cors());
app.use(express.json());
// Servir les fichiers statiques depuis le répertoire parent
app.use(express.static(path.join(__dirname, "..")));

// Route pour servir l'index.html
app.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../index.html"));
});

// Route proxy pour OpenRouter
app.post("/api/chat", async (req, res) => {
  try {
    const { messages, model, temperature, max_tokens } = req.body;

    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
          "HTTP-Referer": process.env.HTTP_REFERER || "http://localhost:3000",
          "X-Title": "GretaBox Gretix Assistant",
        },
        body: JSON.stringify({
          model:
            model ||
            process.env.OPENROUTER_MODEL ||
            "nousresearch/deephermes-3-mistral-24b-preview:free",
          messages,
          temperature: temperature || 0.7,
          max_tokens: max_tokens || 1000,
        }),
      }
    );

    if (!response.ok) {
      const error = await response.json();
      return res.status(response.status).json(error);
    }

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error("Erreur proxy:", error);
    res.status(500).json({
      error: {
        message: "Erreur interne du serveur",
      },
    });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Serveur démarré sur http://localhost:${PORT}`);
  console.log(
    `🔧 Modèle utilisé: ${
      process.env.OPENROUTER_MODEL || "deephermes-3-mistral"
    }`
  );
});
