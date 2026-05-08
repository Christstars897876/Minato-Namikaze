module.exports = {
  config: {
    name: "botnick",
    aliases: ["botname"],
    version: "1.0",
    author: "unknown",
    countDown: 5,
    role: 2,
    shortDescription: {
      en: "Change nickname of the bot in all group chats"
    },
    longDescription: {
      en: "Change nickname of the bot in all group chats"
    },
    category: "𝗢𝗪𝗡𝗘𝗥",
    guide: {
      en: "{pn} <new nickname>"
    },
    envConfig: {
      delayPerGroup: 250
    }
  },

  langs: {
    en: {
      missingNickname: "𝚅𝚎𝚞𝚒𝚕𝚕𝚎𝚣 𝚜𝚊𝚒𝚜𝚒𝚛 𝚕𝚎 𝚗𝚘𝚞𝚟𝚎𝚊𝚞 𝚜𝚞𝚛𝚗𝚘𝚖 𝚍𝚎 𝚖𝚒𝚗𝚊𝚝𝚘",
      changingNickname: "𝙲𝚘𝚖𝚖𝚎𝚗𝚌𝚎𝚣 à 𝚌𝚑𝚊𝚗𝚐𝚎𝚛 𝚕𝚎 𝚜𝚞𝚛𝚗𝚘𝚖 𝚍𝚎 𝚖𝚒𝚗𝚊𝚝𝚘 𝚎𝚗 '%1' in %2 𝚍𝚒𝚜𝚌𝚞𝚜𝚜𝚒𝚘𝚗𝚜 𝚍𝚎 𝚐𝚛𝚘𝚞𝚙𝚎",
      errorChangingNickname: "𝚄𝚗𝚎 𝚎𝚛𝚛𝚎𝚞𝚛 𝚜'𝚎𝚜𝚝 𝚙𝚛𝚘𝚍𝚞𝚒𝚝𝚎 𝚕𝚘𝚛𝚜 𝚍𝚞 𝚌𝚑𝚊𝚗𝚐𝚎𝚖𝚎𝚗𝚝 𝚍𝚎 𝚜𝚞𝚛𝚗𝚘𝚖 𝚍𝚊𝚗𝚜 %1 𝚐𝚛𝚘𝚞𝚙𝚎𝚜:\n%2",
      successMessage: "✅ 𝙹'𝚊𝚒 𝚛é𝚞𝚜𝚜𝚒 à 𝚌𝚑𝚊𝚗𝚐𝚎𝚛 𝚕𝚎 𝚙𝚜𝚎𝚞𝚍𝚘 𝚍𝚊𝚗𝚜 𝚝𝚘𝚞𝚝𝚎𝚜 𝚕𝚎𝚜 𝚍𝚒𝚜𝚌𝚞𝚜𝚜𝚒𝚘𝚗𝚜 𝚍𝚎 𝚐𝚛𝚘𝚞𝚙𝚎 𝚐𝚛â𝚌𝚎 à 𝚖𝚊 𝚝𝚎𝚕𝚎𝚙𝚘𝚛𝚝𝚊𝚝𝚒𝚘𝚗. to '%1'",
      sendingNotification: "𝙴𝚗𝚟𝚘𝚒 𝚍'𝚞𝚗𝚎 𝚗𝚘𝚝𝚒𝚏𝚒𝚌𝚊𝚝𝚒𝚘𝚗 à %1 𝚍𝚒𝚜𝚌𝚞𝚜𝚜𝚒𝚘𝚗𝚜 𝚍𝚎 𝚐𝚛𝚘𝚞𝚙𝚎."
    }
  },

  onStart: async function({ api, args, threadsData, message, getLang }) {
    const newNickname = args.join(" ");

    if (!newNickname) {
      return message.reply(getLang("invalidInput"));
    }

    const allThreadID = (await threadsData.getAll()).filter(t => t.isGroup && t.members.find(m => m.userID == api.getCurrentUserID())?.inGroup);
    const threadIds = allThreadID.map(thread => thread.threadID);

    const nicknameChangePromises = threadIds.map(async threadId => {
      try {
        await api.changeNickname(newNickname, threadId, api.getCurrentUserID());
        return threadId;
      } catch (error) {
        console.error(`Failed to change nickname for thread ${threadId}: ${error.message}`);
        return null;
      }
    });

    const failedThreads = (await Promise.allSettled(nicknameChangePromises))
      .filter(result => result.status === "rejected")
      .map(result => result.reason.message);

    if (failedThreads.length === 0) {
      message.reply(getLang("successMessage", newNickname));
    } else {
      message.reply(getLang("partialSuccessMessage", newNickname, failedThreads.join(", ")));
    }
    message.reply(getLang("sendingNotification", allThreadID.length));
  }
};
