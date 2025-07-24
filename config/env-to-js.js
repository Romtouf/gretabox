// Script pour convertir .env en JavaScript utilisable par le navigateur
// Usage: node env-to-js.js

const fs = require("fs");
const path = require("path");

// Fonction pour lire et parser le fichier .env
function parseEnvFile(filePath) {
  try {
    const envContent = fs.readFileSync(filePath, "utf8");
    const env = {};

    envContent.split("\n").forEach((line) => {
      // Ignore les lignes vides et les commentaires
      if (line.trim() && !line.trim().startsWith("#")) {
        const [key, ...valueParts] = line.split("=");
        if (key && valueParts.length > 0) {
          // Rejoint les parties de valeur au cas où il y aurait des = dans la valeur
          let value = valueParts.join("=").trim();

          // Supprime les guillemets si présents
          if (
            (value.startsWith('"') && value.endsWith('"')) ||
            (value.startsWith("'") && value.endsWith("'"))
          ) {
            value = value.slice(1, -1);
          }

          env[key.trim()] = value;
        }
      }
    });

    return env;
  } catch (error) {
    console.error("Erreur lors de la lecture du fichier .env:", error.message);
    return null;
  }
}

// Fonction pour générer le fichier env-loader.js
function generateEnvLoader(env) {
  const template = `// Variables d'environnement générées automatiquement depuis .env
// ⚠️ Ne modifiez pas ce fichier manuellement - il sera écrasé !
// Pour changer les valeurs, modifiez le fichier .env et relancez: node env-to-js.js

const ENV = {
${Object.entries(env)
  .map(([key, value]) => {
    // Détecte le type de valeur
    if (!isNaN(value) && value !== "") {
      return `    ${key}: ${value},`;
    } else if (
      value.toLowerCase() === "true" ||
      value.toLowerCase() === "false"
    ) {
      return `    ${key}: ${value.toLowerCase()},`;
    } else {
      return `    ${key}: "${value}",`;
    }
  })
  .join("\n")}
};

// Export global pour le navigateur
window.ENV = ENV;

// Affichage de la configuration (pour debug)
console.log('🔧 Configuration Gretix chargée:', ENV);
`;

  return template;
}

// Fonction principale
function main() {
  const envPath = ".env";

  // Vérifie si le fichier .env existe
  if (!fs.existsSync(envPath)) {
    console.error("❌ Fichier .env non trouvé !");
    console.log("📝 Créez un fichier .env basé sur env.example");
    process.exit(1);
  }

  // Parse le fichier .env
  const env = parseEnvFile(envPath);
  if (!env) {
    process.exit(1);
  }

  // Génère le contenu JavaScript
  const jsContent = generateEnvLoader(env);

  // Écrit le fichier env-loader.js
  try {
    fs.writeFileSync("env-loader.js", jsContent, "utf8");
    console.log("✅ Fichier env-loader.js généré avec succès !");
    console.log("📊 Variables chargées:", Object.keys(env).join(", "));
  } catch (error) {
    console.error("❌ Erreur lors de l'écriture:", error.message);
    process.exit(1);
  }
}

// Lance le script
main();
