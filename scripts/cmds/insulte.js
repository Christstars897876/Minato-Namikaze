axios = require("axios");

module.exports = {
  config: {
    name: "insulte",
    version: "1.0",
    author: "Lahatra",
    shortDescription: {
      fr: "Recherche des insultes",
    },
    longDescription: {
      fr: "Cette commande recherche des livres en fonction d'un terme donné. Usage :/insulte",
    },
    category: "fun",
    guide: {
      fr: "{prefix}insulte",
    },
  },

  onStart: async function ({ api, event, args }) {
    try {
      const searchTerm = args.join(" ");
      const url = `https://evilinsult.com/generate_insult.php?lang=en&type=json`;

      const response = await axios.get(url);
      const insult = response.data.insult;

      api.sendMessage(insult, event.threadID, event.messageID);

    } catch (error) {
      console.error(error);
      api.sendMessage("Eh merde, j'ai pas réussi à générer une insulte... Désolé !", event.threadID, event.messageID);
    }
  },
};
