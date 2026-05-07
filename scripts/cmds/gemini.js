const g = require("fca-aryan-nix"); // Importe la bibliothèque fca-aryan-nix
const a = require("axios"); // Importe la bibliothèque axios (pour faire des requêtes HTTP)
const u = "http://65.109.80.126:20409/aryan/gemini"; // Définit l'URL de l'API Gemini

module.exports = {
  config: {
    name: "gemini", // Nom de la commande
    aliases: ["ai","chat"], // Autres noms possibles pour la commande (alias)
    version: "0.0.1", // Version de la commande
    author: "Christus x Aesther", // Auteur de la commande
    countDown: 3, // Délai d'attente avant de pouvoir utiliser la commande à nouveau (en secondes)
    role: 0, // Niveau de rôle requis pour utiliser la commande (0 = tout le monde)
    shortDescription: "Demande à Gemini AI", // Brève description de la commande
    longDescription: "Parlez avec Gemini en utilisant l'API mise à jour par minato", // Description détaillée de la commande
    category: "AI", // Catégorie de la commande (pour l'organisation)
    guide: "/gemini [ta question]" // Instructions d'utilisation de la commande
  },

  onStart: async function({ api, event, args }) {
    // Fonction exécutée lorsque la commande est appelée

    const p = args.join(" "); // Récupère les arguments passés à la commande et les assemble en une chaîne
    if (!p) return api.sendMessage("Pose ta question.", event.threadID, event.messageID); // Si aucune question n'est fournie, renvoie un message demandant une question

    api.setMessageReaction("🐱", event.messageID, () => {}, true); // Ajoute une réaction "🐱" au message de l'utilisateur (optionnel)

    try {
      const r = await a.get(`${u}?prompt=${encodeURIComponent(p)}`); // Envoie une requête GET à l'API Gemini avec la question de l'utilisateur
      const reply = r.data?.response; // Récupère la réponse de l'API

      if (!reply) throw new Error("Aucune réponse de l'API Gemini."); // Si aucune réponse n'est reçue, lance une erreur

      api.setMessageReaction("✅", event.messageID, () => {}, true); // Ajoute une réaction "✅" au message de l'utilisateur (optionnel)

      api.sendMessage(reply, event.threadID, (err, i) => { // Envoie la réponse de Gemini à l'utilisateur
        if (!i) return;
        global.GoatBot.onReply.set(i.messageID, { commandName: this.config.name, author: event.senderID }); // Enregistre la commande et l'auteur pour une éventuelle réponse ultérieure
      }, event.messageID);

    } catch (e) {
      api.setMessageReaction("❌", event.messageID, () => {}, true); // Ajoute une réaction "❌" au message de l'utilisateur (optionnel)
      api.sendMessage("⚠ Problème lors de la récupération de la réponse de l'API Gemini.", event.threadID, event.messageID); // Envoie un message d'erreur si l'API ne répond pas
    }
  },

  onReply: async function({ api, event, Reply }) {
    // Fonction exécutée lorsqu'une réponse est attendue à un message précédent

    if ([api.getCurrentUserID()].includes(event.senderID)) return; // Vérifie si l'auteur de la réponse est le bot lui-même, et si oui, s'arrête.
    const p = event.body; // Récupère le texte de la réponse de l'utilisateur
    if (!p) return; // Si la réponse est vide, s'arrête

    api.setMessageReaction("🫩", event.messageID, () => {}, true); // Ajoute une réaction "🫩" au message de l'utilisateur (optionnel)

    try {
      const r = await a.get(`${u}?prompt=${encodeURIComponent(p)}`); // Envoie la réponse de l'utilisateur à l'API Gemini
      const reply = r.data?.response; // Récupère la réponse de l'API

      if (!reply) throw new Error("aucune reponse de gemini API."); // S'il n'y a pas de réponse, lance une erreur

      api.setMessageReaction("✅", event.messageID, () => {}, true); // Ajoute une réaction "✅" au message de l'utilisateur (optionnel)

      api.sendMessage(reply, event.threadID, (err, i) => { // Envoie la réponse de Gemini à l'utilisateur
        if (!i) return;
        global.GoatBot.onReply.set(i.messageID, { commandName: this.config.name, author: event.senderID }); // Enregistre la commande et l'auteur pour une éventuelle réponse ultérieure
      }, event.messageID);

    } catch (e) {
      api.setMessageReaction("❌", event.messageID, () => {}, true); // Ajoute une réaction "❌" au message de l'utilisateur (optionnel)
      api.sendMessage("⚠ Erreur lors de la réponse de l'API Gemini.", event.threadID, event.messageID); // Envoie un message d'erreur si l'API ne répond pas
    }
  }
};

const w = new g.GoatWrapper(module.exports); // Crée une instance de GoatWrapper (probablement pour gérer les commandes)
w.applyNoPrefix({ allowPrefix: true }); // Applique les paramètres de la commande (probablement pour activer la commande sans préfixe)
