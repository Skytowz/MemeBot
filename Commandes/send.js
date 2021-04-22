const Discord = require("discord.js");
const chan = "suggestions";
module.exports.run = async(client, message, commande) =>{
    const member = message.channel.guild.member(message.author);
    console.log("test");
    message.channel.send(
        `> <@${message.author.id}> sends:`,//member.nickname ? member.nickname : message.author.username
        {files: ['Video/'+commande+".mp4"]}
    ).then((m) =>{
         console.log('send');
        message.delete();
    }).catch(() => 
        message.channel.send(
            `> <@${message.author.id}> sends:`,//member.nickname ? member.nickname : message.author.username
            {files: ['Video/'+commande+".png"]}
        ).then((m) =>{
            console.log('send');
            message.delete();
        }).catch(() => console.log("not found"))
    );
};
module.exports.help = {
    name:"send"
}
