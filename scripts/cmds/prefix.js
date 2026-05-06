const fs = require("fs-extra");
const { utils } = global;

module.exports = {
  config: {
    name: "prefix",
    version: "0.0.7",
    author: "chris st",
    countDown: 5,
    role: 0,
    shortDescription: "Prefix manager",
    longDescription: "Control bot prefix (chat/global)",
    category: "system"
  },

  langs: {
    en: {
      askPrefix: "😏 𝚂𝙰𝙻𝚄𝚃 %name%, 𝚅𝚘𝚞𝚜 𝚖'𝚊𝚟𝚎𝚣 𝚍𝚎𝚖𝚊𝚗𝚍é 𝚖𝚘𝚗 𝚙𝚛é𝚏𝚒𝚡𝚎 ?\n╭─❯🌐 𝙶𝚕𝚘𝚋𝚊𝚕 ⟿『%global%』\n╰─❯💬 𝙳𝚒𝚜𝚌𝚞𝚜𝚜𝚒𝚘𝚗 ⟿ 『%chat%』\n\n🤖 𝙼𝚒𝚗𝚊𝚝𝚘 𝚊𝚖𝚒𝚔𝚊𝚣𝚎 à 𝚟𝚘𝚝𝚛𝚎 𝚜𝚎𝚛𝚟𝚒𝚌𝚎 🥷",
      resetPrefix: "☢️ 𝙿𝚛𝚎𝚏𝚒𝚡 𝚎𝚗 𝚛𝚎𝚙𝚘𝚜\n\n🌐 𝙶𝚕𝚘𝚋𝚊𝚕 ⟿ %global%\n💬 𝙳𝚒𝚜𝚌𝚞𝚜𝚜𝚒𝚘𝚗 ⟿ %global%\n\n🤖 𝙼𝚒𝚗𝚊𝚝𝚘 𝚊𝚖𝚒𝚔𝚊𝚣𝚎 𝚅𝟹",
      confirmChange: "♻️ %type% 𝙲𝚑𝚊𝚗𝚐𝚎\n%old% ⇢ %new%\n\n👆 𝚁é𝚊𝚐𝚒 𝚊𝚟𝚎𝚌 𝚙𝚘𝚞𝚛 𝚌𝚘𝚗𝚏𝚒𝚛𝚖𝚎𝚛 𝚕𝚊 𝚝𝚎𝚌𝚑𝚗𝚒𝚚𝚞𝚎",
      updatedGlobal: "✅ 𝙶𝚕𝚘𝚋𝚊𝚕 𝙼𝚒𝚜𝚎 à 𝚓𝚘𝚞𝚛 ⇢ %prefix%\n\n🤖 𝙼𝚒𝚗𝚊𝚝𝚘 𝚊𝚖𝚒𝚔𝚊𝚣𝚎 𝚅𝟹",
      updatedChat: "✅ 𝙳𝚒𝚜𝚌𝚞𝚜𝚜𝚒𝚘𝚗 𝙼𝚒𝚜𝚎 à 𝚓𝚘𝚞𝚛 ⇢ %prefix%\n\n🤖 𝙼𝚒𝚗𝚊𝚝𝚘 𝚊𝚖𝚒𝚔𝚊𝚣𝚎 𝚅𝟹",
      ownerOnly: "⛔ 𝚃𝚞 𝚝𝚎 𝚙𝚛𝚎𝚗𝚍𝚜 𝚙𝚘𝚞𝚛 𝚌𝚑𝚛𝚒𝚜 ?",
      cancelled: "❌ 𝙼𝚒𝚗𝚊𝚝𝚘 à 𝙰𝚗𝚗𝚞𝚕é 𝙻𝚊 𝚝𝚎𝚌𝚑𝚗𝚒𝚚𝚞𝚎 𝚒𝚗𝚝𝚎𝚛𝚍𝚒𝚝"
    }
  },

  onStart: async function ({ api, event, args, threadsData, getLang }) {
    const { threadID, messageID, senderID } = event;

    let name = "User";
    try {
      const data = await api.getUserInfo(senderID);
      name = data[senderID]?.name?.split(" ")[0] || "User";
    } catch {}

    const globalPf = global.GoatBot.config.prefix;
    const threadPf = await threadsData.get(threadID, "data.prefix").catch(() => null);
    const currentPf = threadPf || globalPf;

    if (!args[0]) {
      return api.sendMessage(
        getLang("askPrefix").replace("%name%", name).replace("%global%", globalPf).replace("%chat%", currentPf),
        threadID,
        messageID
      );
    }

    if (args[0].toLowerCase() === "reset") {
      await threadsData.set(threadID, null, "data.prefix");
      return api.sendMessage(
        getLang("resetPrefix").replace(/%global%/g, globalPf),
        threadID,
        messageID
      );
    }

    const nextPf = args[0];
    const isGlobal = args[1] === "-g";

    if (isGlobal && senderID !== api.getCurrentUserID()) {
      return api.sendMessage(getLang("ownerOnly"), threadID, messageID);
    }

    const confirmText = isGlobal
      ? getLang("confirmChange").replace("%type%", "Global").replace("%old%", globalPf).replace("%new%", nextPf)
      : getLang("confirmChange").replace("%type%", "Chat").replace("%old%", currentPf).replace("%new%", nextPf);

    return api.sendMessage(confirmText, threadID, (err, info) => {
      if (err) return;
      
      global.GoatBot.onReaction.set(info.messageID, {
        messageID: info.messageID,
        commandName: "prefix",
        uid: senderID,
        prefix: nextPf,
        isGlobal: isGlobal,
        threadID: threadID
      });
    }, messageID);
  },

  onReaction: async function ({ api, event, Reaction, threadsData, getLang }) {
    const { userID, messageID, reaction, threadID } = event;
    
    if (!Reaction || Reaction.uid !== userID) return;
    
    const normalizedReaction = reaction ? reaction.toString().replace(/\uFE0F/g, '').trim() : '';
    const targetEmoji = "✅";
    
    const isConfirm = normalizedReaction === targetEmoji || 
                      normalizedReaction === "✓" || 
                      normalizedReaction === "☑" ||
                      normalizedReaction === "✔";
    
    if (!isConfirm) {
      global.GoatBot.onReaction.delete(messageID);
      return api.sendMessage(getLang("cancelled"), Reaction.threadID, messageID);
    }

    const { prefix, isGlobal } = Reaction;
    
    global.GoatBot.onReaction.delete(messageID);

    if (isGlobal) {
      global.GoatBot.config.prefix = prefix;
      await fs.writeFile(global.client.dirConfig, JSON.stringify(global.GoatBot.config, null, 2));
      return api.sendMessage(getLang("updatedGlobal").replace("%prefix%", prefix), threadID);
    }

    await threadsData.set(threadID, prefix, "data.prefix");
    return api.sendMessage(getLang("updatedChat").replace("%prefix%", prefix), threadID);
  }
};
