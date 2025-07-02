const { cmd } = require('../command');
const config = require('../config');
const os = require('os');
const fs = require('fs');

const formatUptime = (seconds) => {
    const pad = (s) => (s < 10 ? '0' + s : s);
    const days = Math.floor(seconds / (24 * 3600));
    const hrs = Math.floor((seconds % (24 * 3600)) / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);
    return `${days > 0 ? `${days}d ` : ''}${pad(hrs)}:${pad(mins)}:${pad(secs)}`;
};

cmd({
    pattern: "alive",
    react: "👀",
    desc: "Check if the bot is online and functioning.",
    category: "main",
    filename: __filename
},
async (danuwa, mek, m, {
    from, quoted, reply
}) => {
    try {
        const start = Date.now();
        await danuwa.sendPresenceUpdate('composing', from);
        const ping = Date.now() - start;
        const uptime = formatUptime(process.uptime());
        const platform = os.platform();
        
        const aliveImg = 'https://github.com/dcd21865/DANUWA-BOT/blob/main/images/alive.png?raw=true'; 
        const voicePath = './media/alive.ogg'; 

        const channelJid = '120363418166326365@newsletter'; 
        const channelName = '🍁 ＤＡＮＵＷＡ－ 〽️Ｄ 🍁';
        const channelInvite = '0029Vb65OhH7oQhap1fG1y3o';

        const aliveCaption = `╭─────── ⭓ ⭓ ⭓  ─────────╮
│          🧿 SYSTEM ONLINE 🧿       │
╰──────────────⟡───────╯
│ 🍁 *PREFIX:* "."
│ ⚡ *BOT NAME:* ${config.BOT_NAME || '🌀 DANUWA-MD 🌀'}
│ 🧭 *UPTIME:* ${uptime}
│ 🔋 *PLATFORM:* ${platform}
│ 👤 *OWNER:* ${config.OWNER_NAME || 'DANUKA DISANAYAKA'}
│ 🧩 *VERSION:* ${config.VERSION || '1.0.0'}
╰───────────────⬣
⚙️ Made with ❤️ by
╰🔥 𝘿𝘼𝙉𝙐𝙆𝘼 𝘿𝙄𝙎𝘼𝙉𝘼𝙔𝘼𝙆𝘼 🔥`;

        await danuwa.sendMessage(from, {
            image: { url: aliveImg },
            caption: aliveCaption,
            contextInfo: {
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: channelJid,
                    newsletterName: channelName,
                    serverMessageId: -1
                }
            }
        }, { quoted: mek });

        if (fs.existsSync(voicePath)) {
            await danuwa.sendMessage(from, {
                audio: fs.readFileSync(voicePath),
                mimetype: 'audio/ogg; codecs=opus',
                ptt: true
            }, { quoted: mek });
        }

    } catch (err) {
        console.error(err);
        reply(`❌ Error: ${err.message}`);
    }
});
