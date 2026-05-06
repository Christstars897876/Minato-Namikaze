const fs = require("fs-extra");
const moment = require("moment-timezone");
const { utils } = global;

module.exports = {
	config: {
		name: "prefix",
		version: "1.5",
		author: "chris st",
		countDown: 5,
		role: 0,
		description: {
			en: "Changer le signe de commande (prefix) du bot avec le style Uchiha"
		},
		category: "config",
		guide: {
			en: "   {pn} <nouveau prefix> : change le prefix dans ce groupe"
				+ "\n   Exemple :"
				+ "\n    {pn} #"
				+ "\n\n   {pn} <nouveau prefix> -g : change le prefix global (Admin Bot uniquement)"
				+ "\n   {pn} reset : remet le prefix par défaut"
		}
	},

	langs: {
		en: {
			reset: "✅ | Le prefix de ce groupe a été réinitialisé par défaut : %1",
			onlyAdmin: "❌ | 𝚂𝚎𝚞𝚕 𝚞𝚗 𝚖𝚎𝚖𝚋𝚛𝚎 𝚍𝚞 𝙲𝚑𝚛𝚒𝚜 (𝚌𝚛é𝚊𝚝𝚎𝚞𝚛 𝚖𝚒𝚗𝚊𝚝𝚘) 𝚙𝚎𝚞𝚝 𝚌𝚑𝚊𝚗𝚐𝚎𝚛 𝚕𝚎 𝚙𝚛𝚎𝚏𝚒𝚡 𝚐𝚕𝚘𝚋𝚊𝚕.",
			confirmGlobal: "╭───── • 🥷 • ─────╮\n   𝙼𝙾𝙳𝙸𝙵𝙸𝙲𝙰𝚃𝙸𝙾𝙽 𝙶𝙻𝙾𝙱𝙰𝙻𝙴\n╰───── • 🥷 • ─────╯\n⚠️ 𝚛é𝚊𝚐𝚒 à 𝚌𝚎 𝚖𝚎𝚜𝚜𝚊𝚐𝚎 𝚙𝚘𝚞𝚛 𝚒𝚗𝚟𝚘𝚚𝚞𝚎𝚛 𝚝𝚘𝚗 𝚗𝚘𝚞𝚟𝚎𝚊𝚞 𝚙𝚛𝚎𝚏𝚒𝚡 𝙿𝚘𝚞𝚛 𝚝𝚘𝚞𝚝 𝚕𝚎 𝚝𝚎𝚌𝚑𝚗𝚒𝚚𝚞𝚎.",
			confirmThisThread: "╭───── • 🥷 • ─────╮\n   𝙼𝙾𝙳𝙸𝙵𝙸𝙲𝙰𝚃𝙸𝙾𝙽 𝙻𝙾𝙲𝙰𝙻𝙴\n╰───── • 🥷 • ─────╯\n⚠️ Réagis à ce message pour confirmer le nouveau prefix dans ce groupe.",
			successGlobal: "╔═══════ 🥷 ═══════╗\n   ⚡ **𝙼𝙸𝙽𝙰𝚃𝙾 𝙸𝙽𝙵𝙾** ⚡\n╚═══════ 🥷 ═══════╝\n✅ Le prefix du système est désormais : %1\n⏰ Heure : %2",
			successThisThread: "╔═══════ 🥷 ═══════╗\n   🌀 **𝙿𝚁𝙴𝙵𝙸𝚇 𝙶𝚁𝙾𝚄𝙿𝙴** 🌀\n╚═══════ 🥷 ═══════╝\n✅ 𝚒𝚗𝚟𝚘𝚌𝚊𝚝𝚒𝚘𝚗 𝚍𝚎 𝚝𝚘𝚗 𝚙𝚛𝚎𝚏𝚒𝚡 : %1\n⏰ Heure : %2",
			myPrefix: "╔═══════ 🥷 ═══════╗\n   ⚡ **𝙼𝙸𝙽𝙰𝚃𝙾 𝙸𝙽𝙵𝙾** ⚡\n╚═══════ 🥷 ═══════╝\n🌐 𝚂𝚢𝚜𝚝è𝚖𝚎 : %1\n🛸 𝙲𝚎 𝚐𝚛𝚘𝚞𝚙𝚎 : %2\n●▬▬▬▬▬▬▬▬▬▬▬▬▬▬●\n🚀 Camille 🤍"
		}
	},

	onStart: async function ({ message, role, args, commandName, event, threadsData, getLang }) {
		if (!args[0]) {
			const systemPrefix = global.GoatBot.config.prefix;
			const threadPrefix = utils.getPrefix(event.threadID);
			return message.reply(getLang("myPrefix", systemPrefix, threadPrefix));
		}

		if (args[0] == 'reset') {
			await threadsData.set(event.threadID, null, "data.prefix");
			return message.reply(getLang("reset", global.GoatBot.config.prefix));
		}

		const newPrefix = args[0];
		const formSet = {
			commandName,
			author: event.senderID,
			newPrefix
		};

		if (args[1] === "-g") {
			if (role < 2) return message.reply(getLang("onlyAdmin"));
			formSet.setGlobal = true;
		} else {
			formSet.setGlobal = false;
		}

		return message.reply(args[1] === "-g" ? getLang("confirmGlobal") : getLang("confirmThisThread"), (err, info) => {
			formSet.messageID = info.messageID;
			global.GoatBot.onReaction.set(info.messageID, formSet);
		});
	},

	onReaction: async function ({ message, threadsData, event, Reaction, getLang }) {
		const { author, newPrefix, setGlobal } = Reaction;
		const time = moment.tz("Africa/Abidjan").format("HH:mm");
		if (event.userID !== author) return;

		if (setGlobal) {
			global.GoatBot.config.prefix = newPrefix;
			fs.writeFileSync(global.client.dirConfig, JSON.stringify(global.GoatBot.config, null, 2));
			return message.reply(getLang("successGlobal", newPrefix, time));
		}
		else {
			await threadsData.set(event.threadID, newPrefix, "data.prefix");
			return message.reply(getLang("successThisThread", newPrefix, time));
		}
	},

	onChat: async function ({ event, message, getLang }) {
		if (event.body && event.body.toLowerCase() === "prefix") {
			return () => {
				const systemPrefix = global.GoatBot.config.prefix;
				const threadPrefix = utils.getPrefix(event.threadID);
				return message.reply(getLang("myPrefix", systemPrefix, threadPrefix));
			};
		}
	}
};
