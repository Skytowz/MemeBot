const Discord = require("discord.js");
const prefix = ";";
const double_dot = ":";
module.exports = async(client, message) => {
    
    if(message.channel.type === "dm") return;

    if(message.content.startsWith(prefix)){
    
        const args = message.content.slice(prefix.length).trim().split(/ /g); // .slice = enleve prefix ; .trim = enleve espace ; .split args[] chaque espace nv mot args
        const commande = args.shift(); // mets nom commande dans commande et enleve première case args;
        const cmd = client.commands.get(commande);
        
        if(!cmd || cmd == "send") return;

        message.delete();
        cmd.run(client, message, args);
    }else if(message.content.startsWith(double_dot) && message.content.endsWith(double_dot)){
        const commande = message.content.slice(prefix.length,message.content.length-1);
        const cmd = client.commands.get('send');
        cmd.run(client, message, commande);
    }

};




