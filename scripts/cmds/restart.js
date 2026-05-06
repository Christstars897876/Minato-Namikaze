const fs = require("fs-extra");

module.exports = {
	config: {
		name: "restart",
		version: "1.1",
		author: "chrisst",
		countDown: 5,
		role: 2,
		description: {
			vi: "Khởi động lại bot",
			en: "Restart bot"
		},
		category: "Owner",
		guide: {
			vi: "   {pn}: Khởi động lại bot",
			en: "   {pn}: Restart bot"
		}
	},

	langs: {
		vi: {
			restartting: "🔄 | Đang khởi động lại bot..."
		},
		en: {
			restartting: "🔄 | 𝙹𝚎 𝚜𝚞𝚒𝚜 𝚛𝚊𝚙𝚒𝚍𝚎 𝚌𝚘𝚖𝚖𝚎 𝚕'é𝚌𝚕𝚊𝚒𝚛 𝚊𝚝𝚝𝚎𝚗𝚍𝚜 𝚚𝚞𝚎𝚕𝚚𝚞𝚎𝚜 𝚜𝚎𝚌..."
		}
	},

	onLoad: function ({ api }) {
		const pathFile = `${__dirname}/tmp/restart.txt`;
		if (fs.existsSync(pathFile)) {
			const [tid, time] = fs.readFileSync(pathFile, "utf-8").split(" ");
			api.sendMessage(`✅ | T'ᴀs ʀɪᴇɴ ᴀ ᴄʀᴀɪɴᴅʀᴇ Mɪɴᴀᴛᴏ à ᴛᴏᴜᴛ ʀéᴘᴀʀᴇʀ\n⏰ | Tᴇᴍᴘs ᴍɪɴᴀᴛᴏ.ɴ: ${(Date.now() - time) / 1000}s`, tid);
			fs.unlinkSync(pathFile);
		}
	},

	onStart: async function ({ message, event, getLang }) {
		const pathFile = `${__dirname}/tmp/restart.txt`;
		fs.writeFileSync(pathFile, `${event.threadID} ${Date.now()}`);
		await message.reply(getLang("restartting"));
		process.exit(2);
	}
};
