const Discord = require("discord.js");
const fs = require('fs');

module.exports.run = async(client, message, args) =>{        
     fs.rm(`./Video/${args.pop()}.mp4`, err =>{
         if(err){
            console.error(err);
            message.channel.send("This file doesn't exist");
            return;
         }
         message.channel.send("Fichier supprimer")
     })

};
module.exports.help = {
    name:"rm",
    cmd:';rm <nom>',
    help:"> Supprime une vidéo"
}
