const DIG = require("discord-image-generation");
const fs = require("fs-extra");

module.exports = {
  config: {
    name: "ads",
    version: "1.0",
    author: "chris st",
    countDown: 1,
    role: 0,
    shortDescription: "Advertisement!",
    longDescription: "",
    category: "fun",
    guide: "{pn} [mention|leave_blank]",
    envConfig: {
      deltaNext: 5
    }
  },

  langs: {
    vi: {
      noTag: "Bạn phải tag người bạn muốn tát"
    },
    en: {
      noTag: " 𝚅𝚘𝚞𝚜 𝚍𝚎𝚟𝚎𝚣 𝚒𝚍𝚎𝚗𝚝𝚒𝚏𝚒𝚎𝚛 𝚕𝚊 𝚙𝚎𝚛𝚜𝚘𝚗𝚗𝚎 𝚚𝚞𝚎 𝚟𝚘𝚞𝚜 𝚜𝚘𝚞𝚑𝚊𝚒𝚝𝚎𝚣 𝚎𝚗 𝚞𝚝𝚒𝚕𝚒𝚜𝚊𝚗𝚝 𝚖𝚒𝚗𝚊𝚝𝚘"
    }
  },

  onStart: async function ({ event, message, usersData, args, getLang }) {
    let mention = Object.keys(event.mentions)
    let uid;

    if (event.type == "message_reply") {
      uid = event.messageReply.senderID
    } else {
      if (mention[0]) {
        uid = mention[0]
      } else {
        console.log(" jsjsj")
        uid = event.senderID
      }
    }

    let url = await usersData.getAvatarUrl(uid)
    let avt = await new DIG.Ad().getImage(url)

    const pathSave = `${__dirname}/tmp/ads.png`;
    fs.writeFileSync(pathSave, Buffer.from(avt));

    let body = "Latest Brand In The Market 🥳"
    if (!mention[0]) body = "Latest Brand In The Market 🥳"

    // Send the image as a reply to the command message
    message.reply({
      body: body,
      attachment: fs.createReadStream(pathSave)
    }, () => fs.unlinkSync(pathSave));
  }
};
