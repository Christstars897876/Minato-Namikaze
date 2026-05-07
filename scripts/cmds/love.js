const axios = require("axios"); // Importe la bibliothèque axios pour les requêtes HTTP.
const fs = require("fs-extra"); // Importe la bibliothèque fs-extra pour les opérations sur les fichiers (avec des fonctionnalités supplémentaires).
const path = require("path"); // Importe la bibliothèque path pour manipuler les chemins de fichiers.

module.exports = {
 config: { // Configuration de la commande.
  name: "love", // Nom de la commande (pour l'utiliser).
  version: "1.3", // Version de la commande.
  author: "chris st", // Auteur de la commande.
  countDown: 10, // Délai d'attente avant de pouvoir réutiliser la commande (en secondes).
  role: 0, // Rôle requis pour utiliser la commande (0 = tous les utilisateurs).
  shortDescription: { // Description courte de la commande (en anglais).
   en: "Create a love ship image of two users"
  },
  description: { // Description détaillée de la commande (en anglais).
   en: "Generates a cute ship image between two user avatars with love percentage and reaction"
  },
  category: "𝗙𝗨𝗡 & 𝗚𝗔𝗠𝗘", // Catégorie de la commande (pour l'organisation).
  guide: { // Guide d'utilisation de la commande (en anglais).
   en: "{p}love @user\nExample: {p}love @alice"
  }
 },

 onStart: async function ({ api, event, message }) { // Fonction qui s'exécute lorsque la commande est appelée.
  const { mentions, senderID } = event; // Extrait les mentions (utilisateurs mentionnés) et l'ID de l'expéditeur de l'événement.

  const mentionIDs = Object.keys(mentions); // Récupère les IDs des utilisateurs mentionnés.
  if (mentionIDs.length < 1) { // Vérifie si au moins un utilisateur a été mentionné.
   return message.reply("❌ | Veuillez mentionner un utilisateur avec qui afficher l'amour. Exemple :\n+love @utilisateur"); // Répond si aucun utilisateur n'est mentionné.
  }

  const uid1 = senderID; // ID de l'expéditeur (vous).
  const uid2 = mentionIDs[0]; // ID du premier utilisateur mentionné.

  // Récupération des noms d'utilisateur
  let name1 = "Vous"; // Nom par défaut pour l'expéditeur.
  let name2 = mentions[uid2] || "Utilisateur"; // Nom de l'utilisateur mentionné (ou "Utilisateur" si absent).

  try {
   const user1Data = await api.getUserInfo(uid1); // Récupère les informations de l'utilisateur 1 via l'API.
   const user2Data = await api.getUserInfo(uid2); // Récupère les informations de l'utilisateur 2 via l'API.

   name1 = user1Data[uid1].name; // Récupère le nom de l'utilisateur 1.
   name2 = user2Data[uid2].name; // Récupère le nom de l'utilisateur 2.
  } catch (err) {
   console.error("Échec de la récupération des noms d'utilisateur :", err); // Gère les erreurs de récupération des noms.
  }

  // Pourcentage d'amour aléatoire.
  const lovePercent = Math.floor(Math.random() * 91) + 10; // Génère un pourcentage d'amour aléatoire entre 10 et 100.

  // Réaction en fonction du pourcentage.
  let reaction = ""; // Initialise la réaction.
  if (lovePercent >= 80) reaction = "💖minato a utilisé sa technique Match parfait ! 💖"; // Réaction si le pourcentage est élevé.
  else if (lovePercent >= 50) reaction = "💘 Bon match ! 💘"; // Réaction si le pourcentage est moyen.
  else reaction = "💔 minato a Besoin d'un peu d'amour... 💔 🥷"; // Réaction si le pourcentage est faible.

  // URLs des photos de profil.
  const avatar1 = `https://graph.facebook.com/${uid1}/picture?width=512&height=512&access_token=350685531728|62f8ce9f74b12f84c123cc23437a4a32`; // URL de la photo de profil de l'utilisateur 1.
  const avatar2 = `https://graph.facebook.com/${uid2}/picture?width=512&height=512&access_token=350685531728|62f8ce9f74b12f84c123cc23437a4a32`; // URL de la photo de profil de l'utilisateur 2.

  try {
   const res = await axios.get(`https://api.popcat.xyz/v2/ship?user1=${encodeURIComponent(avatar1)}&user2=${encodeURIComponent(avatar2)}`, { // Effectue une requête GET vers l'API popcat.xyz pour générer l'image de ship.
    responseType: "arraybuffer" // Spécifie que la réponse est un buffer binaire.
   });

   const filePath = path.join(__dirname, "cache", `ship_${uid1}_${uid2}_${Date.now()}.png`); // Définit le chemin du fichier temporaire.
   fs.writeFileSync(filePath, res.data); // Écrit les données de l'image dans le fichier.

   const bodyMessage = `💞 Jauge d'amour 💞\n\n${name1} ❤ ${name2}\nPourcentage d'amour : ${lovePercent}%\n${reaction}`; // Crée le message à envoyer avec l'image.

   message.reply({ // Envoie le message avec l'image.
    body: bodyMessage, // Le texte du message.
    attachment: fs.createReadStream(filePath) // Attache le fichier image.
   }, () => fs.unlinkSync(filePath)); // Supprime le fichier temporaire après l'envoi.

  } catch (err) {
   console.error(err); // Gère les erreurs de génération de l'image.
   message.reply("❌ | Échec de la génération de l'image d'amour. Réessayez plus tard."); // Répond en cas d'erreur.
  }
 }
};
