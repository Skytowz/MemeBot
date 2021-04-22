const Discord = require('discord.js');
const client = new Discord.Client({ partials: ['MESSAGE', 'CHANNEL', 'REACTION'] });

const fs = require('fs');

//client.login("Njg1NTQyMzQxNDM1NzE5Njg2.XmKLDg.3G87GK1Y6nFy3gisErOmF_Q_uY0");
client.login("ODI5ODI5OTMxOTU3MjIzNDI1.YG91WQ.0cP8It2HRevvlwJlQ4xhjUYe384");
client.commands = new Discord.Collection();

fs.readdir("./Commandes/",(error,f) => {
    if(error) console.log(error);

    let commandes = f.filter(f => f.split(".").pop() === "js");
    if(commandes.length <= 0) return console.log("Aucune commande trouvé");

    commandes.forEach((f) => {
        let commande = require(`./Commandes/${f}`);
        console.log(`${f} commandes chargée`);

    client.commands.set(commande.help.name, commande);
    });
});

fs.readdir("./Events/", (error, f) => {
    if(error) console.log(error);
    console.log(`${f.length} events en chargement`);

    f.forEach((f) =>{
        const events = require(`./Events/${f}`);
        const event = f.split(".")[0];

    client.on(event, events.bind(null, client));
    })
})

var http = require('http');  
http.createServer(function (req, res) {   
  res.write("I'm alive");   
  res.end(); 
}).listen(8080);