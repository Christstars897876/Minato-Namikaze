const a = require("axios");

module.exports = {
  config: {
    name: "minato",
    aliases: ["minato"],
    version: "5.1.0",
    author: "Shizuka AI ( https://shizuai.vercel.app )",
    role: 0,
    category: "ai",
    guide: {
      en: "{pn} [your message] – Chat with minato AI"
    }
  },

  onStart: async function (b) {
    await c(b.api, b.event, b.args.join(" "), b.message);
  },

  onReply: async function (b) {
    await c(b.api, b.event, b.args?.join(" ") || "", b.message);
  }
};

async function c(d, e, f, g) {
  const h = e.senderID;
  const i = f.trim();

  if (!h || !i) {
    d.setMessageReaction("❌", e.messageID, () => {}, true);
    return g.reply("baby ");
  }

  d.setMessageReaction("⏳", e.messageID, () => {}, true);

  try {
    const j = await a.post("http://shizuai.vercel.app/shizu", { userId: h, message: i });
    const k = j.data.reply || "✅ Shizuka replied.";
    const l = await g.reply(k);

    global.GoatBot.onReply.set(l.messageID, {
      commandName: "shizuka",
      messageID: l.messageID,
      author: h
    });

    d.setMessageReaction("✅", e.messageID, () => {}, true);
  } catch (m) {
    console.error("❌ API Error:", m.response?.data || m.message);
    d.setMessageReaction("❌", e.messageID, () => {}, true);
    return g.reply("🚫 Shizuka couldn’t reply. Try again later.");
  }
}
