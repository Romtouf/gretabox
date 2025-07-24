// Configuration simple pour Gretix (sans Node.js requis)
// Modifiez directement les valeurs ci-dessous

const ENV = {
  // Votre clé API OpenRouter
  OPENROUTER_API_KEY:
    "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",

  // Modèle à utiliser
  OPENROUTER_MODEL: "nousresearch/deephermes-3-mistral-24b-preview:free",

  // Configuration optionnelle
  MAX_TOKENS: 1000,
  TEMPERATURE: 0.7,
};

// Export global pour le navigateur
window.ENV = ENV;

// Affichage de la configuration (pour debug)
console.log("🔧 Configuration Gretix chargée:", ENV);
