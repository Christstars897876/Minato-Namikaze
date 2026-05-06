 module.exports = {
  config: {
    name: "autoreact",
    author: "chris st",
    version: "1.0",
    countDown: 5,
    role: 0,
    shortDescription: "Auto React",
    longDescription: " ",
    category: "System",
  },
  onStart: async function () {
    // Add initialization logic here if needed
    // Ajoutez ici la logique d'initialisation si nécessaire.
  },
  onChat: async function ({ event, api }) {
    const message = event.body.toLowerCase();

    const reactionsMap = {
      "😂": ["haha", "lol", "drole", "funny", "hahah", "hahaha", "masaya", "happy", "🤣", "natomba", "tumomba", "tomomba", "tumumba", "tomumba", "side eye", "awooop jumpscare", "so masaya ka?", "sana all", "mdr"],
      "😭": ["cry", "sad", "crying", "bakit ka malungkot?", "bakit ka malongkot?", "hindi na", "sad ka", "walang ulam"],
      "🥰": ["love", "mahal", "crush", "amour" "t'aime" "aime", "bb", "baby",],
      "🎮": ["laro", "laru", "game", "mc", "minecraft", "ml", "mlbb", "mobile legends", "mobile legends bang bang", "cod", "call of duty", "jeux", "PlayStation", "psp", "ppsspp", "free fire"],
      "🙋": ["salut", "hey", "how", "hi", "slt", "xlt", "cv", "çv", "bien"],
      "🫂": ["merci", "beaucoup", "de", "rien" "thanks"]
      "😐": ["pourquoi", "mère", "mere", "quoi", "que", ".", "?", "=", "@", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0"]
      // Add more reactions and associated keywords as needed
      //Ajoutez d'autres réactions et mots-clés associés selon les besoins.
    };

    console.log("Message:", message);

    for (const [reaction, keywords] of Object.entries(reactionsMap)) {
      console.log("Reaction:", reaction);
      console.log("Keywords:", keywords);

      if (keywords.some((word) => message.includes(word))) {
        console.log("Reacting with:", reaction);
        api.setMessageReaction(reaction, event.messageID, event.threadID, api);
        break; // Stop checking once a reaction is set
      }
    }
  },
};
