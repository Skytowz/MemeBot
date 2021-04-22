const Discord = require("discord.js");
const fs = require("fs");
module.exports.run = async(client, message, args) =>{        
    const help = new Discord.MessageEmbed()
        .setColor('#8e238e')
        .setTitle('Help')
        .setThumbnail("https://cdn.discordapp.com/attachments/683663363653238794/685227026617073719/cry.gif");
    fs.readdir("./Commandes/",(error,f) => {
        if(error) console.log(error);
        let fun = f.filter(f => f.split(".").pop() === "js"); 
        fun.splice(fun.indexOf("send.js",1));
        fun.forEach(v => {
            let commande = require(`./${v}`);
            help.addField(commande.help.cmd,commande.help.help);
        })
    });
    await message.channel.send("Help...").then(async (m) =>{
        m.edit("",help);
        //m.delete();
    });

};
module.exports.help = {
    name:"help",
    cmd:';help',
    help:"> Appelle l'aide"
}
