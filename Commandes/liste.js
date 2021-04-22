const Discord = require("discord.js");
const fs = require('fs');
const chan = "suggestions";
module.exports.run = async (client, message, args) => {

    const fun = require('./liste')
    await message.channel.send("Liste...").then((m) => fun.liste(m));
};
module.exports.help = {
    name: "liste",
    cmd: ';liste',
    help: "> Liste les memes existants"
}

module.exports.liste = async (m, inc = 1) => {
    let video = "";
    const help = new Discord.MessageEmbed()
        .setColor('#8e238e')
        .setTitle('Liste des videos disponibles :')
        .setThumbnail("https://cdn.discordapp.com/attachments/683663363653238794/685227026617073719/cry.gif");
    fs.readdir("./Video/", (error, f) => {
        if (error) console.log(error);
        let videos = f.map(fi => fi.split(".").shift());
        console.log(inc)
        console.log(Math.ceil(videos.length / 15))
        console.log(mod(inc - 1, Math.ceil(videos.length / 15)))
        inc = mod(inc - 1, Math.ceil(videos.length / 15)) + 1;
        console.log(inc);
        help.setFooter(`${inc}/${Math.ceil(videos.length / 15)}`);
        for (let i = (inc - 1) * 15; i < 15 * inc; i++) {
            if (!videos[i]) break;
            video += `> :${videos[i]}:\n`
        }
        help.setDescription(video);
        m.edit("", help).then(async (h) => {
            h.react('👈');
            h.react('👉');
            h.react('❌');
        });
    });
}

function mod(n, m) {
    return ((n % m) + m) % m;
}