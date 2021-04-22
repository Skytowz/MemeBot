const Discord = require("discord.js");
const fs = require("fs");
module.exports.run = async(client, message, args) =>{        
    fs.rename(`./Video/${args.shift()}.mp4`,`./Video/${args.shift()}.mp4`,err =>{
        if(err){
            console.log(err);
            message.channel.send("This video doesn't exist'")
            return;
        }
        message.channel.send("Rename Successfully")
    })

};
module.exports.help = {
    name:"rename",
    cmd:";rename <anciennom> <nouveaunom>",
    help:"Renomme un fichier"
}
