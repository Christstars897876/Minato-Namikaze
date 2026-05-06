const fs = require("fs");
const path = require("path");
const { createCanvas } = require("canvas");

module.exports = {
    config: {
        name: "bank",
        version: "0.0.7",
        author: "chrisst",
        role: 0,
        shortDescription: "𝐔𝐥𝐭𝐢𝐦𝐚𝐭𝐞 𝐁𝐚𝐧𝐤𝐢𝐧𝐠 𝐒𝐲𝐬𝐭𝐞𝐦",
        longDescription: "𝐂𝐨𝐦𝐩𝐥𝐞𝐭𝐞 𝐝𝐢𝐠𝐢𝐭𝐚𝐥 𝐛𝐚𝐧𝐤𝐢𝐧𝐠 𝐰𝐢𝐭𝐡 𝐫𝐞𝐚𝐥𝐢𝐬𝐭𝐢𝐜 𝐀𝐓𝐌 𝐜𝐚𝐫𝐝𝐬",
        category: "economy",
        guide: `${String.fromCharCode(55357, 56485)} 𝐁𝐀𝐍𝐊𝐈𝐍𝐆 𝐂𝐎𝐌𝐌𝐀𝐍𝐃𝐒:
━━━━━━━━━━━━━━━━━━━
💳 𝐀𝐂𝐂𝐎𝐔𝐍𝐓:
{𝐩𝐧} 𝐫𝐞𝐠𝐢𝐬𝐭𝐞𝐫 - 𝐎𝐩𝐞𝐧 𝐚𝐜𝐜𝐨𝐮𝐧𝐭
{𝐩𝐧} 𝐛𝐚𝐥𝐚𝐧𝐜𝐞 - 𝐂𝐡𝐞𝐜𝐤 𝐛𝐚𝐥𝐚𝐧𝐜𝐞
{𝐩𝐧} 𝐚𝐜𝐜𝐨𝐮𝐧𝐭 - 𝐀𝐜𝐜𝐨𝐮𝐧𝐭 𝐝𝐞𝐭𝐚𝐢𝐥𝐬

💳 𝐀𝐓𝐌 𝐂𝐀𝐑𝐃:
{𝐩𝐧} 𝐜𝐚𝐫𝐝 - 𝐕𝐢𝐞𝐰 𝐀𝐓𝐌 𝐜𝐚𝐫𝐝
{𝐩𝐧} 𝐜𝐚𝐫𝐝 𝐛𝐚𝐜𝐤 - 𝐕𝐢𝐞𝐰 𝐜𝐚𝐫𝐝 𝐛𝐚𝐜𝐤
{𝐩𝐧} 𝐜𝐚𝐫𝐝 𝐝𝐞𝐬𝐢𝐠𝐧𝐬 - 𝐀𝐥𝐥 𝐝𝐞𝐬𝐢𝐠𝐧𝐬
{𝐩𝐧} 𝐚𝐭𝐦𝐜𝐨𝐝𝐞 - 𝐆𝐞𝐧𝐞𝐫𝐚𝐭𝐞 𝐀𝐓𝐌 𝐜𝐨𝐝𝐞
{𝐩𝐧} 𝐚𝐭𝐦𝐰𝐢𝐭𝐡𝐝𝐫𝐚𝐰 <𝐜𝐨𝐝𝐞> <𝐚𝐦𝐨𝐮𝐧𝐭> - 𝐀𝐓𝐌 𝐰𝐢𝐭𝐡𝐝𝐫𝐚𝐰

💸 𝐓𝐑𝐀𝐍𝐒𝐀𝐂𝐓𝐈𝐎𝐍𝐒:
{𝐩𝐧} 𝐝𝐞𝐩𝐨𝐬𝐢𝐭 <𝐚𝐦𝐨𝐮𝐧𝐭> - 𝐀𝐝𝐝 𝐦𝐨𝐧𝐞𝐲
{𝐩𝐧} 𝐰𝐢𝐭𝐡𝐝𝐫𝐚𝐰 <𝐚𝐦𝐨𝐮𝐧𝐭> - 𝐓𝐚𝐤𝐞 𝐦𝐨𝐧𝐞𝐲
{𝐩𝐧} 𝐬𝐞𝐧𝐝 <@𝐮𝐬𝐞𝐫> <𝐚𝐦𝐨𝐮𝐧𝐭> - 𝐒𝐞𝐧𝐝 𝐦𝐨𝐧𝐞𝐲
{𝐩𝐧} 𝐭𝐫𝐚𝐧𝐬𝐟𝐞𝐫 <𝐚𝐜𝐜#> <𝐚𝐦𝐨𝐮𝐧𝐭> - 𝐁𝐲 𝐚𝐜𝐜𝐨𝐮𝐧𝐭

💰 𝐈𝐍𝐕𝐄𝐒𝐓𝐌𝐄𝐍𝐓𝐒:
{𝐩𝐧} 𝐟𝐝 - 𝐅𝐢𝐱𝐞𝐝 𝐃𝐞𝐩𝐨𝐬𝐢𝐭
{𝐩𝐧} 𝐢𝐧𝐭𝐞𝐫𝐞𝐬𝐭 - 𝐂𝐨𝐥𝐥𝐞𝐜𝐭 𝐢𝐧𝐭𝐞𝐫𝐞𝐬𝐭

🏦 𝐋𝐎𝐀𝐍𝐒:
{𝐩𝐧} 𝐥𝐨𝐚𝐧 <𝐚𝐦𝐨𝐮𝐧𝐭> - 𝐀𝐩𝐩𝐥𝐲 𝐥𝐨𝐚𝐧
{𝐩𝐧} 𝐫𝐞𝐩𝐚𝐲 <𝐚𝐦𝐨𝐮𝐧𝐭> - 𝐑𝐞𝐩𝐚𝐲 𝐥𝐨𝐚𝐧

📊 𝐎𝐓𝐇𝐄𝐑𝐒:
{𝐩𝐧} 𝐡𝐢𝐬𝐭𝐨𝐫𝐲 - 𝐅𝐮𝐥𝐥 𝐡𝐢𝐬𝐭𝐨𝐫𝐲
{𝐩𝐧} 𝐦𝐢𝐧𝐢𝐬𝐭𝐚𝐭𝐞𝐦𝐞𝐧𝐭 - 𝐋𝐚𝐬𝐭 𝟓
{𝐩𝐧} 𝐥𝐞𝐚𝐝𝐞𝐫𝐛𝐨𝐚𝐫𝐝 - 𝐓𝐨𝐩 𝟏𝟎 𝐫𝐢𝐜𝐡`
    },

    // Helper Functions
    formatMoney(amount) {
        if (isNaN(amount)) return "𝟎";
        amount = Number(amount);
        const scales = [
            { value: 1e15, suffix: '𝐐' },
            { value: 1e12, suffix: '𝐓' },
            { value: 1e9, suffix: '𝐁' },
            { value: 1e6, suffix: '𝐌' },
            { value: 1e3, suffix: '𝐤' }
        ];
        for (let scale of scales) {
            if (amount >= scale.value) {
                let val = amount / scale.value;
                return val % 1 === 0 ? `${val}${scale.suffix}` : `${val.toFixed(2)}${scale.suffix}`;
            }
        }
        return amount.toString();
    },

    generateCardNumber() {
        const visaPrefix = "𝟒";
        const mastercardPrefix = "𝟓";
        const prefix = Math.random() > 0.5 ? visaPrefix : mastercardPrefix;
        
        let number = prefix;
        for (let i = 0; i < 15; i++) {
            number += Math.floor(Math.random() * 10).toString();
        }
        
        return number.match(/.{1,4}/g).join(" ");
    },

    generateCVV() { 
        const cvv = Math.floor(100 + Math.random() * 900).toString();
        return cvv.split('').map(d => String.fromCharCode(120783 + parseInt(d))).join('');
    },
    
    generatePIN() { 
        const pin = Math.floor(1000 + Math.random() * 9000).toString();
        return pin.split('').map(d => String.fromCharCode(120783 + parseInt(d))).join('');
    },
    
    generateATMCode() {
        const chars = '𝐀𝐁𝐂𝐃𝐄𝐅𝐆𝐇𝐈𝐉𝐊𝐋𝐌𝐍𝐎𝐏𝐐𝐑𝐒𝐓𝐔𝐕𝐖𝐗𝐘𝐙𝟎𝟏𝟐𝟑𝟒𝟓𝟔𝟕𝟖𝟗';
        let code = '';
        for (let i = 0; i < 8; i++) {
            code += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return code;
    },

    generateAccountNumber() {
        const num1 = Math.floor(10000000 + Math.random() * 90000000).toString();
        const num2 = Math.floor(1000 + Math.random() * 9000).toString();
        return `𝐆𝐁${num1.split('').map(d => String.fromCharCode(120783 + parseInt(d))).join('')}${num2.split('').map(d => String.fromCharCode(120783 + parseInt(d))).join('')}`;
    },

    getExpiry() {
        const now = new Date();
        const month = now.getMonth() + 1;
        const year = (now.getFullYear() + 4).toString().slice(-2);
        return `${month.toString().padStart(2, '0').split('').map(d => String.fromCharCode(120783 + parseInt(d))).join('')}/${year.split('').map(d => String.fromCharCode(120783 + parseInt(d))).join('')}`;
    },

    nowISO() {
        return new Date().toISOString();
    },

    calculateInterest(amount, days) {
        const rate = 0.05;
        return amount * rate * (days / 365);
    },

    calculateLoanInterest(amount, days) {
        const rate = 0.12;
        return amount * rate * (days / 365);
    },

    calculateCreditScore(transactions, balance, loanHistory) {
        let score = 500;
        score += Math.min(transactions.length * 5, 200);
        score += Math.min(Math.floor(balance / 10000) * 2, 200);
        if (loanHistory) {
            if (loanHistory.repaidOnTime) score += 100;
            if (loanHistory.defaulted) score -= 200;
        }
        return Math.min(Math.max(score, 300), 850);
    },

    // Ultra Realistic Card Designs
    cardDesigns: {
        visa_platinum: {
            name: "𝐕𝐈𝐒𝐀 𝐏𝐋𝐀𝐓𝐈𝐍𝐔𝐌",
            gradient: ["#0d1b3a", "#1b2b4f", "#2a3b64"],
            chipColor: "#b8860b",
            hologramColors: ["#c0c0c0", "#e8e8e8", "#a0a0a0"],
            textColor: "#ffffff",
            accentColor: "#d4af37",
            logo: "𝐕𝐈𝐒𝐀",
            logoColor: "#1a1f71",
            network: "visa",
            type: "𝐏𝐋𝐀𝐓𝐈𝐍𝐔𝐌",
            metallic: true
        },
        mastercard_black: {
            name: "𝐌𝐀𝐒𝐓𝐄𝐑𝐂𝐀𝐑𝐃 𝐁𝐋𝐀𝐂𝐊",
            gradient: ["#000000", "#1a1a1a", "#2d2d2d"],
            chipColor: "#c0c0c0",
            hologramColors: ["#808080", "#a9a9a9", "#666666"],
            textColor: "#ffffff",
            accentColor: "#ffd700",
            logo: "𝐌𝐀𝐒𝐓𝐄𝐑𝐂𝐀𝐑𝐃",
            logoColor: "#ff5f00",
            network: "mastercard",
            type: "𝐁𝐋𝐀𝐂𝐊 𝐄𝐃𝐈𝐓𝐈𝐎𝐍",
            metallic: true
        },
        american_express: {
            name: "𝐀𝐌𝐄𝐑𝐈𝐂𝐀𝐍 𝐄𝐗𝐏𝐑𝐄𝐒𝐒",
            gradient: ["#002663", "#003087", "#0046b3"],
            chipColor: "#b5b5b5",
            hologramColors: ["#8a6e4b", "#c0a97a", "#9b7e55"],
            textColor: "#ffffff",
            accentColor: "#ffffff",
            logo: "𝐀𝐌𝐄𝐗",
            logoColor: "#ffffff",
            network: "amex",
            type: "𝐆𝐎𝐋𝐃",
            metallic: true
        },
        gold_elite: {
            name: "𝐄𝐋𝐈𝐓𝐄 𝐆𝐎𝐋𝐃",
            gradient: ["#8B7355", "#B8860B", "#DAA520"],
            chipColor: "#DAA520",
            hologramColors: ["#FBB917", "#E5B73B", "#FFD700"],
            textColor: "#000000",
            accentColor: "#000000",
            logo: "𝐄𝐋𝐈𝐓𝐄",
            logoColor: "#000000",
            network: "premium",
            type: "𝐆𝐎𝐋𝐃",
            metallic: true
        },
        signature_visa: {
            name: "𝐕𝐈𝐒𝐀 𝐒𝐈𝐆𝐍𝐀𝐓𝐔𝐑𝐄",
            gradient: ["#0a0f2c", "#1a1f4a", "#2a2f6a"],
            chipColor: "#9b870c",
            hologramColors: ["#b8860b", "#daa520", "#ffd700"],
            textColor: "#ffffff",
            accentColor: "#c0c0c0",
            logo: "𝐕𝐈𝐒𝐀",
            logoColor: "#ffffff",
            network: "visa",
            type: "𝐒𝐈𝐆𝐍𝐀𝐓𝐔𝐑𝐄",
            metallic: true
        },
        world_mastercard: {
            name: "𝐖𝐎𝐑𝐋𝐃 𝐌𝐀𝐒𝐓𝐄𝐑𝐂𝐀𝐑𝐃",
            gradient: ["#1a237e", "#283593", "#3949ab"],
            chipColor: "#c0c0c0",
            hologramColors: ["#e0e0e0", "#f5f5f5", "#ffffff"],
            textColor: "#ffffff",
            accentColor: "#ffd700",
            logo: "𝐌𝐀𝐒𝐓𝐄𝐑𝐂𝐀𝐑𝐃",
            logoColor: "#ffffff",
            network: "mastercard",
            type: "𝐖𝐎𝐑𝐋𝐃 𝐄𝐋𝐈𝐓𝐄",
            metallic: true
        },
        titanium: {
            name: "𝐓𝐈𝐓𝐀𝐍𝐈𝐔𝐌",
            gradient: ["#2b2b2b", "#3d3d3d", "#4f4f4f"],
            chipColor: "#a8a9ad",
            hologramColors: ["#71797E", "#8C8F94", "#A9ACB1"],
            textColor: "#ffffff",
            accentColor: "#00ffff",
            logo: "𝐓𝐈𝐓𝐀𝐍𝐈𝐔𝐌",
            logoColor: "#00ffff",
            network: "premium",
            type: "𝐌𝐄𝐓𝐀𝐋",
            metallic: true
        },
        infinite: {
            name: "𝐈𝐍𝐅𝐈𝐍𝐈𝐓𝐄",
            gradient: ["#0b0b0b", "#1e1e1e", "#2d2d2d"],
            chipColor: "#ffd700",
            hologramColors: ["#c0c0c0", "#d4af37", "#e5e4e2"],
            textColor: "#ffffff",
            accentColor: "#d4af37",
            logo: "𝐈𝐍𝐅𝐈𝐍𝐈𝐓𝐄",
            logoColor: "#d4af37",
            network: "premium",
            type: "𝐁𝐋𝐀𝐂𝐊",
            metallic: true
        }
    },

    // Create Front of Card
    async createCardFront(card, username, balance, transactions = [], design = "visa_platinum", creditScore = 700) {
        const width = 900, height = 540;
        const canvas = createCanvas(width, height);
        const ctx = canvas.getContext("2d");
        const d = this.cardDesigns[design] || this.cardDesigns.visa_platinum;
        
        // Background with metallic effect
        if (d.metallic) {
            const gradient = ctx.createLinearGradient(0, 0, width, height);
            gradient.addColorStop(0, d.gradient[0]);
            gradient.addColorStop(0.3, d.gradient[1]);
            gradient.addColorStop(0.6, d.gradient[2]);
            gradient.addColorStop(1, d.gradient[0]);
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, width, height);
            
            ctx.globalAlpha = 0.1;
            for (let i = 0; i < height; i += 20) {
                ctx.beginPath();
                ctx.moveTo(0, i);
                ctx.lineTo(width, i + 100);
                ctx.strokeStyle = "#ffffff";
                ctx.lineWidth = 2;
                ctx.stroke();
            }
            ctx.globalAlpha = 1;
        } else {
            const bg = ctx.createLinearGradient(0, 0, width, height);
            bg.addColorStop(0, d.gradient[0]);
            bg.addColorStop(0.5, d.gradient[1]);
            bg.addColorStop(1, d.gradient[2]);
            ctx.fillStyle = bg;
            ctx.fillRect(0, 0, width, height);
        }
        
        // Card border
        ctx.strokeStyle = d.accentColor;
        ctx.lineWidth = 3;
        ctx.strokeRect(5, 5, width - 10, height - 10);
        
        // Bank Name with 3D effect (Stylish)
        ctx.font = "bold 42px 'Arial'";
        ctx.fillStyle = "rgba(255,255,255,0.2)";
        ctx.fillText("𝐔𝐋𝐓𝐈𝐌𝐀𝐓𝐄 𝐁𝐀𝐍𝐊", 42, 82);
        ctx.fillStyle = d.textColor;
        ctx.fillText("𝐔𝐋𝐓𝐈𝐌𝐀𝐓𝐄 𝐁𝐀𝐍𝐊", 40, 80);
        
        // EMV Chip
        ctx.fillStyle = d.chipColor;
        ctx.fillRect(40, 160, 120, 80);
        
        // Chip circuit pattern
        ctx.strokeStyle = "#000000";
        ctx.lineWidth = 2;
        for (let i = 170; i < 240; i += 20) {
            ctx.beginPath();
            ctx.moveTo(45, i);
            ctx.lineTo(155, i);
            ctx.stroke();
        }
        for (let i = 55; i < 160; i += 25) {
            ctx.beginPath();
            ctx.moveTo(i, 165);
            ctx.lineTo(i, 235);
            ctx.stroke();
        }
        
        // Small squares on chip
        ctx.fillStyle = "#000000";
        for (let i = 60; i < 150; i += 30) {
            for (let j = 175; j < 225; j += 20) {
                ctx.fillRect(i, j, 5, 5);
            }
        }
        
        // Contactless symbol
        ctx.font = "bold 32px 'Arial'";
        ctx.fillStyle = "rgba(255,255,255,0.3)";
        ctx.fillText("📶", 200, 210);
        
        // Card Number (Stylish)
        ctx.font = "bold 38px 'Courier New'";
        ctx.fillStyle = "rgba(0,0,0,0.3)";
        ctx.fillText(card.number, 42, 342);
        ctx.fillStyle = d.textColor;
        ctx.fillText(card.number, 40, 340);
        
        // Valid Thru (Stylish)
        ctx.font = "bold 18px 'Arial'";
        ctx.fillStyle = "rgba(255,255,255,0.6)";
        ctx.fillText("𝐕𝐀𝐋𝐈𝐃", 600, 280);
        ctx.fillText("𝐓𝐇𝐑𝐔", 700, 280);
        
        ctx.font = "bold 32px 'Courier New'";
        ctx.fillStyle = d.textColor;
        ctx.fillText(card.expiry, 600, 330);
        
        // Card Holder Name (Stylish)
        ctx.font = "bold 28px 'Arial'";
        ctx.fillStyle = d.textColor;
        ctx.fillText(username.toUpperCase().split('').map(c => {
            if (c.match(/[A-Z]/)) return String.fromCharCode(55349, 56804 + (c.charCodeAt(0) - 65));
            return c;
        }).join(''), 40, 450);
        
        // Account type (Stylish)
        ctx.font = "bold 20px 'Arial'";
        ctx.fillStyle = d.accentColor;
        ctx.fillText(d.type, 40, 490);
        
        // Card network logo (Stylish)
        ctx.font = "bold 48px 'Arial'";
        ctx.fillStyle = d.logoColor;
        ctx.fillText(d.logo, 720, 150);
        
        // Balance and Credit Score (Stylish)
        ctx.font = "bold 20px 'Arial'";
        ctx.fillStyle = d.textColor;
        ctx.textAlign = "right";
        ctx.fillText(`𝐁𝐀𝐋: ${this.formatMoney(balance)} 𝐁𝐃𝐓`, 860, 400);
        ctx.fillText(`𝐂𝐒: ${creditScore.toString().split('').map(d => String.fromCharCode(120783 + parseInt(d))).join('')}`, 860, 430);
        
        // Hologram
        ctx.globalAlpha = 0.7;
        const hologram = ctx.createLinearGradient(750, 50, 830, 130);
        hologram.addColorStop(0, d.hologramColors[0]);
        hologram.addColorStop(0.5, d.hologramColors[1]);
        hologram.addColorStop(1, d.hologramColors[2]);
        ctx.fillStyle = hologram;
        ctx.beginPath();
        ctx.ellipse(790, 90, 35, 20, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;
        
        // Small text (Stylish)
        ctx.font = "12px 'Arial'";
        ctx.fillStyle = "rgba(255,255,255,0.3)";
        ctx.textAlign = "left";
        ctx.fillText("𝐓𝐡𝐢𝐬 𝐜𝐚𝐫𝐝 𝐢𝐬 𝐩𝐫𝐨𝐩𝐞𝐫𝐭𝐲 𝐨𝐟 𝐔𝐥𝐭𝐢𝐦𝐚𝐭𝐞 𝐁𝐚𝐧𝐤", 40, 520);
        ctx.fillText("𝐈𝐟 𝐟𝐨𝐮𝐧𝐝, 𝐩𝐥𝐞𝐚𝐬𝐞 𝐫𝐞𝐭𝐮𝐫𝐧 𝐭𝐨 𝐚𝐧𝐲 𝐛𝐫𝐚𝐧𝐜𝐡", 40, 535);
        
        const outputDir = path.join(__dirname, "cache");
        fs.mkdirSync(outputDir, { recursive: true });
        const filePath = path.join(outputDir, `${Date.now()}_card_front.png`);
        fs.writeFileSync(filePath, canvas.toBuffer());
        return filePath;
    },

    // Create Back of Card
    async createCardBack(card, username, design = "visa_platinum") {
        const width = 900, height = 540;
        const canvas = createCanvas(width, height);
        const ctx = canvas.getContext("2d");
        const d = this.cardDesigns[design] || this.cardDesigns.visa_platinum;
        
        // Background
        ctx.fillStyle = "#2b2b2b";
        ctx.fillRect(0, 0, width, height);
        
        // Magnetic stripe
        ctx.fillStyle = "#3b2b1a";
        ctx.fillRect(0, 60, width, 80);
        
        // Magnetic stripe texture
        ctx.globalAlpha = 0.3;
        for (let i = 0; i < width; i += 10) {
            ctx.fillStyle = "#000000";
            ctx.fillRect(i, 65, 5, 70);
        }
        ctx.globalAlpha = 1;
        
        // Signature panel
        ctx.fillStyle = "#f0f0f0";
        ctx.fillRect(50, 200, 500, 80);
        
        // Signature line
        ctx.strokeStyle = "#000000";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(50, 240);
        ctx.lineTo(550, 240);
        ctx.stroke();
        
        // Signature text (Stylish)
        ctx.font = "bold 16px 'Arial'";
        ctx.fillStyle = "#000000";
        ctx.fillText("𝐀𝐔𝐓𝐇𝐎𝐑𝐈𝐙𝐄𝐃 𝐒𝐈𝐆𝐍𝐀𝐓𝐔𝐑𝐄", 55, 230);
        ctx.fillStyle = "#666666";
        ctx.fillText("𝐍𝐎𝐓 𝐕𝐀𝐋𝐈𝐃 𝐖𝐈𝐓𝐇𝐎𝐔𝐓 𝐒𝐈𝐆𝐍𝐀𝐓𝐔𝐑𝐄", 55, 265);
        
        // CVV (Stylish)
        ctx.font = "bold 24px 'Courier New'";
        ctx.fillStyle = "#000000";
        ctx.fillText("𝐂𝐕𝐕𝟐: ***", 580, 240);
        ctx.fillStyle = "#666666";
        ctx.fillText(card.cvv, 680, 240);
        
        // Card number last 4 (Stylish)
        const last4 = card.number.slice(-4);
        ctx.font = "20px 'Courier New'";
        ctx.fillStyle = "#ffffff";
        ctx.fillText(`**** **** **** ${last4}`, 100, 350);
        
        // Customer service (Stylish)
        ctx.font = "18px 'Arial'";
        ctx.fillStyle = "#cccccc";
        ctx.fillText("𝟐𝟒/𝟕 𝐂𝐔𝐒𝐓𝐎𝐌𝐄𝐑 𝐒𝐄𝐑𝐕𝐈𝐂𝐄", 100, 400);
        ctx.fillText("+𝟖𝟖𝟎 𝟏𝟐𝟑𝟒-𝟓𝟔𝟕𝟖𝟗𝟎", 100, 430);
        
        // Bank address (Stylish)
        ctx.font = "14px 'Arial'";
        ctx.fillStyle = "#999999";
        ctx.fillText("𝐔𝐥𝐭𝐢𝐦𝐚𝐭𝐞 𝐁𝐚𝐧𝐤 𝐋𝐭𝐝.", 100, 480);
        ctx.fillText("𝐃𝐡𝐚𝐤𝐚, 𝐁𝐚𝐧𝐠𝐥𝐚𝐝𝐞𝐬𝐡", 100, 500);
        
        // Website (Stylish)
        ctx.font = "bold 16px 'Arial'";
        ctx.fillStyle = d.accentColor;
        ctx.fillText("𝐰𝐰𝐰.𝐮𝐥𝐭𝐢𝐦𝐚𝐭𝐞𝐛𝐚𝐧𝐤.𝐜𝐨𝐦", 650, 500);
        
        const outputDir = path.join(__dirname, "cache");
        fs.mkdirSync(outputDir, { recursive: true });
        const filePath = path.join(outputDir, `${Date.now()}_card_back.png`);
        fs.writeFileSync(filePath, canvas.toBuffer());
        return filePath;
    },

    async onStart({ message, args, usersData, event, api }) {
        const uid = event.senderID;
        const action = args[0]?.toLowerCase();
        let data = await usersData.get(uid);
        
        // Initialize bank data
        if (!data.data) data.data = {};
        if (!data.data.bank) {
            data.data.bank = {
                balance: 0,
                registered: false,
                card: null,
                transactions: [],
                accountNumber: this.generateAccountNumber(),
                createdAt: null,
                savings: 0,
                atmCodes: [],
                loan: {
                    amount: 0,
                    takenAt: null,
                    dueDate: null,
                    interest: 0
                },
                fixedDeposits: [],
                creditScore: 500,
                lastInterestClaim: null,
                accountType: "𝐒𝐭𝐚𝐧𝐝𝐚𝐫𝐝",
                dailyLimit: 100000,
                usedToday: 0,
                lastReset: new Date().setHours(0,0,0,0),
                cardDesign: "visa_platinum"
            };
        }
        
        const bank = data.data.bank;
        
        // Reset daily limit
        const today = new Date().setHours(0,0,0,0);
        if (bank.lastReset < today) {
            bank.usedToday = 0;
            bank.lastReset = today;
        }
        
        // Update account type
        if (bank.balance >= 10000000) bank.accountType = "𝐏𝐥𝐚𝐭𝐢𝐧𝐮𝐦";
        else if (bank.balance >= 5000000) bank.accountType = "𝐆𝐨𝐥𝐝";
        else if (bank.balance >= 1000000) bank.accountType = "𝐏𝐫𝐞𝐦𝐢𝐮𝐦";
        else bank.accountType = "𝐒𝐭𝐚𝐧𝐝𝐚𝐫𝐝";
        
        // Update credit score
        bank.creditScore = this.calculateCreditScore(bank.transactions, bank.balance, bank.loan);

        // Show available card designs
        if (action === "card" && args[1] === "designs") {
            let designsText = "💳 𝐀𝐕𝐀𝐈𝐋𝐀𝐁𝐋𝐄 𝐂𝐀𝐑𝐃 𝐃𝐄𝐒𝐈𝐆𝐍𝐒\n━━━━━━━━━━━━━━━━━━━\n\n";
            
            Object.keys(this.cardDesigns).forEach((key, index) => {
                const d = this.cardDesigns[key];
                designsText += `${(index + 1).toString().split('').map(d => String.fromCharCode(120783 + parseInt(d))).join('')}. ${d.name}\n`;
                designsText += `   🏷️ 𝐓𝐲𝐩𝐞: ${d.type}\n`;
                designsText += `   💫 𝐍𝐞𝐭𝐰𝐨𝐫𝐤: ${d.network.toUpperCase()}\n`;
                designsText += `   𝐔𝐬𝐞: bank card ${key}\n\n`;
            });
            
            designsText += "━━━━━━━━━━━━━━━━━━━\n";
            designsText += "𝐄𝐱𝐚𝐦𝐩𝐥𝐞: 
