// script.js

// Initialisation de CodeMirror pour chaque éditeur
const htmlEditor = CodeMirror.fromTextArea(
  document.getElementById("html-editor"),
  {
    mode: "xml",
    theme: "material", // Thème par défaut
    lineNumbers: true,
    autoCloseTags: true,
    tabSize: 2,
    lineWrapping: true, // Assure que le texte va à la ligne
  }
);

const cssEditor = CodeMirror.fromTextArea(
  document.getElementById("css-editor"),
  {
    mode: "css",
    theme: "material",
    lineNumbers: true,
    autoCloseBrackets: true,
    tabSize: 2,
    lineWrapping: true, // Assure que le texte va à la ligne
  }
);

const jsEditor = CodeMirror.fromTextArea(document.getElementById("js-editor"), {
  mode: "javascript",
  theme: "material",
  lineNumbers: true,
  matchBrackets: true,
  autoCloseBrackets: true,
  tabSize: 2,
  lineWrapping: true, // Assure que le texte va à la ligne
});

// Fonction pour appliquer le thème à l'ensemble de l'interface
function applyTheme(theme) {
  // Supprimer toutes les classes de thème existantes
  document.body.classList.remove(
    "theme-material",
    "theme-dracula",
    "theme-eclipse"
  );

  // Ajouter la nouvelle classe de thème
  document.body.classList.add(`theme-${theme}`);

  // Appliquer le thème aux éditeurs CodeMirror
  htmlEditor.setOption("theme", theme);
  cssEditor.setOption("theme", theme);
  jsEditor.setOption("theme", theme);

  // Forcer le rafraîchissement des éditeurs
  setTimeout(() => {
    htmlEditor.refresh();
    cssEditor.refresh();
    jsEditor.refresh();
  }, 10);
}

// Changer de thème
document.getElementById("theme-selector").addEventListener("change", (e) => {
  const theme = e.target.value;
  applyTheme(theme);
});

// Activer le mode sombre
document.getElementById("dark-mode-toggle").addEventListener("change", (e) => {
  document.body.classList.toggle("dark-mode", e.target.checked);
});

// Exécution du code HTML/CSS/JS
document.getElementById("run-btn").addEventListener("click", () => {
  const html = htmlEditor.getValue();
  const css = `<style>${cssEditor.getValue()}</style>`;
  const js = jsEditor.getValue();
  const theme = document.getElementById("theme-selector").value;

  // Générer les styles de thème pour l'iframe
  let themeCSS = "";
  if (theme === "material") {
    themeCSS = `<style>
      body:not([style*="background"]) { background-color: #263238 !important; color: #fff !important; }
      *:not([style*="color"]) { color: #fff !important; }
    </style>`;
  } else if (theme === "dracula") {
    themeCSS = `<style>
      body:not([style*="background"]) { background-color: #282a36 !important; color: #f8f8f2 !important; }
      *:not([style*="color"]) { color: #f8f8f2 !important; }
    </style>`;
  } else if (theme === "eclipse") {
    themeCSS = `<style>
      body:not([style*="background"]) { background-color: #ffffff !important; color: #333 !important; }
      *:not([style*="color"]) { color: #333 !important; }
    </style>`;
  }

  const iframe = document.getElementById("output-frame");
  const documentContent = `
    <!DOCTYPE html>
    <html lang="fr">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        ${themeCSS}
        ${css}
      </head>
      <body>
        ${html}
        <script>
          // Redefine console.log to output to the iframe
          (function() {
            const logContainer = document.createElement('div');
            document.body.appendChild(logContainer);

            const originalConsoleLog = console.log;
            console.log = function(message) {
              originalConsoleLog.apply(console, arguments);

              const logEntry = document.createElement('div');
              logEntry.textContent = message;
              logContainer.appendChild(logEntry);
            };
          })();
        <\/script>
        <script>
          ${js}
        <\/script>
      </body>
    </html>
  `;

  // Écrire le contenu dans l'iframe
  iframe.srcdoc = documentContent;
});

// Initialisation au chargement de la page
document.addEventListener("DOMContentLoaded", function () {
  // Initialiser l'année courante dans le footer
  const currentYearElement = document.getElementById("current-year");
  if (currentYearElement) {
    currentYearElement.textContent = new Date().getFullYear();
  }
  const defaultTheme = "material";

  // S'assurer que le sélecteur de thème est sur la bonne valeur
  document.getElementById("theme-selector").value = defaultTheme;

  // Appliquer le thème par défaut
  applyTheme(defaultTheme);

  // Ajouter du code d'exemple simple
  htmlEditor.setValue(`<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>GretaBox IDE</title>
</head>
<body>
    <h1>Bienvenue sur GretaBox IDE</h1>
    <p>Modifiez ce code et cliquez sur Exécuter !</p>
    <button onclick="testFunction()">Test</button>
</body>
</html>`);

  cssEditor.setValue(`body {
    font-family: Arial, sans-serif;
    padding: 20px;
    background-color: #f4f4f4;
    text-align: center;
}

h1 {
    color: #21776e;
    margin-bottom: 20px;
}

button {
    background: #21776e;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
}

button:hover {
    background: #f9b746;
}`);

  jsEditor.setValue(`function testFunction() {
    alert('Hello from GretaBox IDE!');
    console.log('Test successful!');
}`);
});
