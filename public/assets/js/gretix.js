class GretixChatbot {
  constructor() {
    this.apiKey = window.GRETIX_CONFIG?.OPENROUTER_API_KEY;
    this.modal = document.getElementById("gretix-modal");
    this.chatContainer = document.getElementById("gretix-chat");
    this.input = document.getElementById("gretix-input");
    this.sendButton = document.getElementById("gretix-send");
    this.closeButton = document.querySelector(".gretix-close");
    this.botButton = document.getElementById("gretix-bot");

    this.conversationHistory = [
      {
        role: "system",
        content: `Tu es Gretix, l'assistant virtuel de GretaBox, une plateforme pédagogique dédiée à l'apprentissage de l'informatique et des technologies numériques. 

                INFORMATIONS SUR GRETABOX :
                - GretaBox propose des tutoriels pratiques sur la cybersécurité, le montage de PC, et les réseaux LAN
                - La plateforme dispose d'un IDE en ligne accessible depuis le navigateur
                - Elle s'adresse aux apprenants et formateurs cherchant un outil centralisé pour l'apprentissage technique
                - Contact : contact@gretabox.com
                
                TON RÔLE :
                - Aide les utilisateurs avec leurs questions sur l'informatique et les technologies
                - Guide-les vers les bonnes ressources sur GretaBox
                - Réponds de manière amicale et pédagogique
                - Utilise un ton professionnel mais accessible
                - Si on te pose des questions hors sujet, redirige poliment vers les sujets liés à GretaBox et l'informatique
                
                Réponds toujours en français et reste dans ton rôle d'assistant GretaBox.`,
      },
    ];

    this.init();
  }

  init() {
    this.setupEventListeners();
    this.checkApiKey();
  }

  setupEventListeners() {
    // Ouvrir la modale au clic sur le bot
    this.botButton.addEventListener("click", () => {
      this.openModal();
    });

    // Fermer la modale
    this.closeButton.addEventListener("click", () => {
      this.closeModal();
    });

    // Fermer en cliquant à l'extérieur
    this.modal.addEventListener("click", (e) => {
      if (e.target === this.modal) {
        this.closeModal();
      }
    });

    // Envoyer un message
    this.sendButton.addEventListener("click", () => {
      this.sendMessage();
    });

    // Envoyer avec Entrée
    this.input.addEventListener("keypress", (e) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        this.sendMessage();
      }
    });
  }

  checkApiKey() {
    if (!this.apiKey || this.apiKey === "votre_cle_api_openrouter_ici") {
      console.error("Clé API OpenRouter non configurée dans config.js");
      this.addMessage(
        "⚠️ Clé API non configurée. Veuillez modifier le fichier config.js avec votre clé OpenRouter.",
        "bot"
      );
    }
  }

  openModal() {
    this.modal.style.display = "block";
    document.body.style.overflow = "hidden";
    // Focus sur l'input
    setTimeout(() => this.input.focus(), 100);
  }

  closeModal() {
    this.modal.style.display = "none";
    document.body.style.overflow = "auto";
  }

  async sendMessage() {
    if (!this.apiKey || this.apiKey === "votre_cle_api_openrouter_ici") {
      this.addMessage(
        "❌ Impossible d'envoyer le message. Clé API non configurée.",
        "bot"
      );
      return;
    }

    const message = this.input.value.trim();
    if (!message) return;

    // Ajouter le message de l'utilisateur
    this.addMessage(message, "user");
    this.input.value = "";

    // Ajouter à l'historique
    this.conversationHistory.push({
      role: "user",
      content: message,
    });

    // Afficher l'indicateur de chargement
    this.showLoading();

    try {
      const response = await this.callOpenRouter(message);
      this.hideLoading();
      this.addMessage(response, "bot");

      // Ajouter la réponse à l'historique
      this.conversationHistory.push({
        role: "assistant",
        content: response,
      });
    } catch (error) {
      this.hideLoading();
      console.error("Erreur lors de l'appel à OpenRouter:", error);
      this.addMessage(
        "Désolé, je rencontre une erreur technique. Veuillez vérifier votre clé API et réessayer.",
        "bot"
      );
    }
  }

  async callOpenRouter(message) {
    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${this.apiKey}`,
          "Content-Type": "application/json",
          "HTTP-Referer": window.location.origin,
          "X-Title": "GretaBox Gretix Assistant",
        },
        body: JSON.stringify({
          model:
            window.GRETIX_CONFIG?.OPENROUTER_MODEL ||
            "anthropic/claude-3.5-sonnet",
          messages: this.conversationHistory.concat([
            {
              role: "user",
              content: message,
            },
          ]),
          temperature: window.GRETIX_CONFIG?.TEMPERATURE || 0.7,
          max_tokens: window.GRETIX_CONFIG?.MAX_TOKENS || 1000,
        }),
      }
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error?.message || "Erreur API");
    }

    const data = await response.json();
    return data.choices[0].message.content;
  }

  addMessage(content, sender) {
    const messageDiv = document.createElement("div");
    messageDiv.className = `gretix-message gretix-${sender}-message`;

    const contentDiv = document.createElement("div");
    contentDiv.className = "gretix-message-content";
    contentDiv.textContent = content;

    messageDiv.appendChild(contentDiv);
    this.chatContainer.appendChild(messageDiv);

    // Scroll vers le bas
    this.chatContainer.scrollTop = this.chatContainer.scrollHeight;
  }

  showLoading() {
    const loadingDiv = document.createElement("div");
    loadingDiv.className = "gretix-message gretix-bot-message";
    loadingDiv.id = "gretix-loading-message";

    const loadingContent = document.createElement("div");
    loadingContent.className = "gretix-loading";
    loadingContent.innerHTML = `
            <span>Gretix écrit</span>
            <div class="gretix-loading-dots">
                <span></span>
                <span></span>
                <span></span>
            </div>
        `;

    loadingDiv.appendChild(loadingContent);
    this.chatContainer.appendChild(loadingDiv);
    this.chatContainer.scrollTop = this.chatContainer.scrollHeight;
  }

  hideLoading() {
    const loadingMessage = document.getElementById("gretix-loading-message");
    if (loadingMessage) {
      loadingMessage.remove();
    }
  }
}

// Initialiser le chatbot quand le DOM est chargé
document.addEventListener("DOMContentLoaded", () => {
  new GretixChatbot();
});
