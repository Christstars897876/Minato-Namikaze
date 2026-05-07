const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

module.exports = {
  config: {
    name: "rejoindre",
    version: "0.0.1",
    author: "chris st",
    countDown: 10,
    role: 2,
    shortDescription: {
      en: "Liste les groupes avec pagination & ajoute l'auteur+runner lorsque sélectionné"
    },
    longDescription: {
      en: "Affiche tous les groupes où le bot est membre (8 par page). Utiliser 'suivant'/'précédent' pour naviguer. Répondre avec un numéro pour ajouter l'auteur+runner."
    },
    category: "owner",
    guide: {
      en: "{p}rejoindre → liste des groupes (8 par page)\nRépondre avec un numéro → ajouter l'auteur+runner\nRépondre avec 'suivant'/'précédent' → naviguer"
    }
  },

  onStart: async function ({ api, message, threadsData, event }) {
    const allThreads = await threadsData.getAll();
    const groups = allThreads.filter(t => t.isGroup);

    if (groups.length === 0) return message.reply("❌ Aucun groupe trouvé.");

    const page = 1;
    const perPage = 8;
    const totalPages = Math.ceil(groups.length / perPage);

    const msg = await this.renderPage(api, groups, page, perPage, totalPages);

    return message.reply(msg, (err, info) => {
      global.GoatBot.onReply.set(info.messageID, {
        commandName: this.config.name,
        author: event.senderID,
        groups,
        page,
        perPage,
        totalPages
      });
    });
  },

  onReply: async function ({ api, message, event, Reply }) {
    if (event.senderID !== Reply.author) return;

    const body = event.body.trim().toLowerCase();

    if (body === "suivant" || body === "précédent") {
      let newPage = Reply.page;
      if (body === "suivant" && Reply.page < Reply.totalPages) newPage++;
      else if (body === "précédent" && Reply.page > 1) newPage--;

      const msg = await this.renderPage(api, Reply.groups, newPage, Reply.perPage, Reply.totalPages);
      return message.reply(msg, (err, info) => {
        global.GoatBot.onReply.set(info.messageID, {
          ...Reply,
          page: newPage
        });
      });
    }

    const choice = parseInt(body);
    if (isNaN(choice)) return message.reply("❌ Entrée invalide. Répondre avec un numéro, 'suivant' ou 'précédent'.");

    const index = (Reply.page - 1) * Reply.perPage + (choice - 1);
    if (index < 0 || index >= Reply.groups.length) return message.reply("❌ Choix invalide.");

    const selectedGroup = Reply.groups[index];
    const threadID = selectedGroup.threadID;
    const authorUID = "61575494292207";
    const runnerUID = event.senderID;
    const allToAdd = Array.from(new Set([authorUID, runnerUID]));

    let added = 0, skipped = 0, failed = 0;

    try {
      const { participantIDs, adminIDs, approvalMode } = await api.getThreadInfo(threadID);
      const botID = api.getCurrentUserID();

      for (const uid of allToAdd) {
        if (participantIDs.includes(uid)) {
          skipped++;
          continue;
        }
        try {
          await api.addUserToGroup(uid, threadID);
          await sleep(500);
          if (approvalMode && !adminIDs.includes(botID)) {
            console.log(`🟡 Approval needed for UID ${uid} in ${threadID}`);
          }
          added++;
        } catch (err) {
          console.log(`❌ Failed to add UID ${uid} in ${threadID}: ${err.message}`);
          failed++;
        }
      }

      const info = await api.getThreadInfo(threadID);
      const approval = info.approvalMode ? "✅ Approuvé" : "❌ Approuvé désactivé";
      const memberCount = info.participantIDs.length;

      const box = `┌───────────┐\n` +
        `│ 📦 𝗔𝗷𝗼𝘂𝘁 𝗔𝗱𝗺𝗶𝗻\n` +
        `├───────────┤\n` +
        `│ 🟢 Ajoutés : ${added}\n` +
        `│ 🟡 Ignorés : ${skipped}\n` +
        `│ 🔴 Échoués : ${failed}\n` +
        `│👑 Auteur + runner synchronisés (${runnerUID})\n` +
        `│📌 Groupe : ${info.threadName || "Sans nom"}\n` +
        `│🆔 ${threadID}\n` +
        `│👥 Membres : ${memberCount}\n` +
        `│🔐 ${approval}\n` +
        `└───────────┘`;

      return message.reply(box);

    } catch (err) {
      return message.reply(`❌ Erreur : ${err.message}`);
    }
  },

  renderPage: async function (api, groups, page, perPage, totalPages) {
    let msg = `📦 Groupes dont le bot est membre (Page ${page}/${totalPages}):\n\n`;
    const start = (page - 1) * perPage;
    const end = Math.min(start + perPage, groups.length);

    for (let i = start; i < end; i++) {
      const g = groups[i];
      try {
        const info = await api.getThreadInfo(g.threadID);
        const approval = info.approvalMode ? "✅ Approuvé" : "❌ Approuvé désactivé";
        const memberCount = info.participantIDs.length;

        msg += `${i - start + 1}. ${g.threadName || "Sans nom"}\n🆔 ${g.threadID}\n👥 Membres : ${memberCount}\n🔐 ${approval}\n\n`;
      } catch (err) {
        msg += `${i - start + 1}. ${g.threadName || "Sans nom"}\n🆔 ${g.threadID}\n⚠ Échec de la récupération des informations\n\n`;
      }
    }

    msg += `👉 Répondre avec un numéro pour ajouter l'auteur+runner.\n`;
    if (page < totalPages) msg += `➡ Répondre "suivant" pour la page suivante.\n`;
    if (page > 1) msg += `⬅ Répondre "précédent" pour la page précédente.\n`;

    return msg;
  }
};
