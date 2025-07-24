// Script de démarrage pour GretaBox
// Lance le serveur depuis le bon répertoire

const { spawn } = require("child_process");
const path = require("path");

console.log("🚀 Démarrage de GretaBox...");

// Lancer le serveur depuis le dossier server
const serverProcess = spawn("node", ["server/server.js"], {
  stdio: "inherit",
  cwd: __dirname,
});

serverProcess.on("close", (code) => {
  console.log(`Serveur arrêté avec le code ${code}`);
});

serverProcess.on("error", (err) => {
  console.error("Erreur lors du démarrage du serveur:", err);
});
