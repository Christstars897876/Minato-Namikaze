const fs = require("fs-extra");
const { utils } = global;

module.exports = {
  config: {
    name: "prefix",
    version: "1.5",
    author: "chris st",
    countDown: 5,
    role: 0,
    description: "Change the bot prefix in this chat or globally (admin only)",
    category: "system",
    guide: {
      en:
        "╭─『 ✨ 𝙼𝙸𝙽𝙰𝚃𝙾 𝙿𝚁𝙴𝙵𝙸𝚇 ✨ 』\n" +
        "│\n" +
        "│ 🔹 {pn} <newPrefix>\n" +
        "│     ➥ 𝖣é𝖿𝗂𝗇𝗂𝗌𝗌𝖾𝗓 𝗎𝗇 𝗇𝗈𝗎𝗏𝖾𝖺𝗎 𝗉𝗋é𝖿𝗂𝗑𝖾 𝖽𝖾 𝗆𝗂𝗇𝖺𝗍𝗈 𝗎𝗇𝗂𝗊𝗎𝖾𝗆𝖾𝗇𝗍 𝗉𝗈𝗎𝗋 𝖼𝖾𝗍𝗍𝖾 𝖼𝗈𝗇𝗏𝖾𝗋𝗌𝖺𝗍𝗂𝗈𝗇.\n" +
        "│     ➤ 𝖤𝗑𝖺𝗆𝗉𝗅𝖾: {pn} $\n" +
        "│\n" +
        "│ 🔹 {pn} <𝗇𝗈𝗎𝗏𝖾𝖺𝗎𝖯𝗋é𝖿𝗂𝗑𝖾> -g\n" +
        "│     ➥ 𝖣é𝖿𝗂𝗇𝗂𝗋 𝗎𝗇 𝗇𝗈𝗎𝗏𝖾𝖺𝗎 𝗉𝗋é𝖿𝗂𝗑𝖾 𝖽𝖾 𝗆𝗂𝗇𝖺𝗍𝗈 𝗀𝗅𝗈𝖻𝖺𝗅 (admin only)\n" +
        "│     ➤ 𝖤𝗑𝖺𝗆𝗉𝗅𝖾: {pn} ! -g\n" +
        "│\n" +
        "│ ♻️ {pn} reset\n" +
        "│     ➥ 𝖱é𝗂𝗇𝗂𝗍𝗂𝖺𝗅𝗂𝗌𝖾𝗋 𝗅𝖾 𝗉𝗋é𝖿𝗂𝗑𝖾 𝖽𝖾 𝗆𝗂𝗇𝖺𝗍𝗈 𝗉𝖺𝗋 𝖽é𝖿𝖺𝗎𝗍 à 𝗉𝖺𝗋𝗍𝗂𝗋 𝖽𝖾 𝗅𝖺 𝖼𝗈𝗇𝖿𝗂𝗀𝗎𝗋𝖺𝗍𝗂𝗈𝗇\n" +
        "│\n" +
        "│ 📌 𝖨𝗅 𝗌𝗎𝖿𝖿𝗂𝗍 𝖽𝖾 𝗍𝖺𝗉𝖾𝗋: 𝗉𝗋𝖾𝖿𝗂𝗑 𝖼𝗁𝖾𝗓 𝗆𝗂𝗇𝖺𝗍𝗈\n" +
        "│     ➥ 𝖠𝖿𝖿𝗂𝖼𝗁𝖾 𝗅𝖾𝗌 𝗂𝗇𝖿𝗈𝗋𝗆𝖺𝗍𝗂𝗈𝗇𝗌 𝖽𝖾 𝗉𝗋é𝖿𝗂𝗑𝖾 𝖽𝖾 𝗆𝗂𝗇𝖺𝗍𝗈 𝖺𝖼𝗍𝗎𝖾𝗅𝗅𝖾𝗌\n" +
        "╰─────────────────────────────"
    }
  },

  langs: {
    en: {
      reset: "✅ 𝚁é𝚒𝚗𝚒𝚝𝚒𝚊𝚕𝚒𝚜𝚎𝚛 𝚕𝚎 𝚙𝚛é𝚏𝚒𝚡𝚎 𝚍𝚎 𝚖𝚒𝚗𝚊𝚝𝚘 𝚙𝚊𝚛 𝚍é𝚏𝚊𝚞𝚝: %1",
      onlyAdmin: "⛔ 𝚂𝚎𝚞𝚕𝚜 𝚕𝚎𝚜 𝚊𝚍𝚖𝚒𝚗𝚜 𝚍𝚎 𝚖𝚒𝚗𝚊𝚝𝚘 𝚙𝚎𝚞𝚟𝚎𝚗𝚝 𝚖𝚘𝚍𝚒𝚏𝚒𝚎𝚛 𝚕𝚎 𝚙𝚛é𝚏𝚒𝚡𝚎 𝚐𝚕𝚘𝚋𝚊𝚕.!",
      confirmGlobal: "⚙️ 𝚁é𝚊𝚐𝚒𝚜𝚜𝚎𝚣 𝚙𝚘𝚞𝚛 𝚌𝚘𝚗𝚏𝚒𝚛𝚖𝚎𝚛 𝚕𝚊 𝚖𝚒𝚜𝚎 à 𝚓𝚘𝚞𝚛 𝚍𝚞 𝚙𝚛é𝚏𝚒𝚡𝚎 𝚍𝚎 𝚖𝚒𝚗𝚊𝚝𝚘 𝚍𝚞 𝚐𝚕𝚘𝚋𝚊𝚕.",
      confirmThisThread: "⚙️ 𝚁é𝚊𝚐𝚒𝚜𝚜𝚎𝚣 𝚙𝚘𝚞𝚛 𝚌𝚘𝚗𝚏𝚒𝚛𝚖𝚎𝚛 𝚕𝚊 𝚖𝚒𝚜𝚎 à 𝚓𝚘𝚞𝚛 𝚍𝚞 𝚙𝚛é𝚏𝚒𝚡𝚎 𝚍𝚎 𝚖𝚒𝚗𝚊𝚝𝚘 𝚍𝚎 𝚌𝚎𝚝𝚝𝚎 𝚌𝚘𝚗𝚟𝚎𝚛𝚜𝚊𝚝𝚒𝚘𝚗.",
      successGlobal: "✅ 𝙿𝚛é𝚏𝚒𝚡𝚎 𝚍𝚎 𝚖𝚒𝚗𝚊𝚝𝚘 𝚐𝚕𝚘𝚋𝚊𝚕 𝚖𝚒𝚜 à 𝚓𝚘𝚞𝚛: %1",
      successThisThread: "✅ 𝙿𝚛é𝚏𝚒𝚡𝚎 𝚍𝚎 𝚖𝚒𝚗𝚊𝚝𝚘 𝚍𝚎 𝚌𝚑𝚊𝚝 𝚖𝚒𝚜 à 𝚓𝚘𝚞𝚛: %1"
    }
  },

  onStart: async function ({ message, role, args, commandName, event, threadsData, getLang }) {
    if (!args[0]) return message.SyntaxError();

    if (args[0] === "reset") {
      await threadsData.set(event.threadID, null, "data.prefix");
      return message.reply(getLang("reset", global.GoatBot.config.prefix));
    }

    const newPrefix = args[0];
    const formSet = {
      commandName,
      author: event.senderID,
      newPrefix,
      setGlobal: args[1] === "-g"
    };

    if (formSet.setGlobal && role < 2) {
      return message.reply(getLang("onlyAdmin"));
    }

    const confirmMessage = formSet.setGlobal ? getLang("confirmGlobal") : getLang("confirmThisThread");
    return message.reply(confirmMessage, (err, info) => {
      formSet.messageID = info.messageID;
      global.GoatBot.onReaction.set(info.messageID, formSet);
    });
  },

  onReaction: async function ({ message, threadsData, event, Reaction, getLang }) {
    const { author, newPrefix, setGlobal } = Reaction;
    if (event.userID !== author) return;

    if (setGlobal) {
      global.GoatBot.config.prefix = newPrefix;
      fs.writeFileSync(global.client.dirConfig, JSON.stringify(global.GoatBot.config, null, 2));
      return message.reply(getLang("successGlobal", newPrefix));
    }

    await threadsData.set(event.threadID, newPrefix, "data.prefix");
    return message.reply(getLang("successThisThread", newPrefix));
  },

  onChat: async function ({ event, message, threadsData, usersData }) {
    const globalPrefix = global.GoatBot.config.prefix;
    const threadPrefix = await threadsData.get(event.threadID, "data.prefix") || globalPrefix;

    if (event.body && event.body.toLowerCase() === "prefix") {
      const userName = await usersData.getName(event.senderID);

      return message.reply(
        `🥷 𝚂𝚊𝚕𝚞𝚝 𝙱𝚘𝚜𝚜 ${userName}, 𝙰𝚟𝚎𝚣-𝚟𝚘𝚞𝚜 𝚍𝚎𝚖𝚊𝚗𝚍é 𝚖𝚘𝚗 𝚙𝚛é𝚏𝚒𝚡𝚎 ? 𝚀𝚞𝚎 𝚓𝚎 𝚕'𝚒𝚗𝚟𝚘𝚚𝚞𝚎 ??\n` +
        `➥ 🌐 𝙶𝚕𝚘𝚋𝚊𝚕: ${globalPrefix}\n` +
        `➥ 💬 𝙲𝚎𝚝𝚝𝚎 𝚌𝚘𝚗𝚟𝚎𝚛𝚜𝚊𝚝𝚒𝚘𝚗: ${threadPrefix}\n` +
        `𝙹𝚎 𝚜𝚞𝚒𝚜 𝚕'é𝚌𝚕𝚊𝚒𝚛 𝚓𝚊𝚞𝚗𝚎 𝚍𝚞 𝚔𝚘𝚗𝚘𝚑𝚊 𝚛𝚊𝚙𝚒𝚍𝚎 𝚌𝚘𝚖𝚖𝚎 𝚕'é𝚌𝚕𝚊𝚒𝚛 `
      );
    }
  }
};
