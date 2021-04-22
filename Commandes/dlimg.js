const Discord = require("discord.js");
const fetch = require("node-fetch")
const fs = require("fs");
module.exports.run = async (client, message, args) => {
    if (!message.attachments.array()[0]) return message.channel.send("Please send an image with this command");
    const url = message.attachments.array()[0].url;
    const name = args[0];
    if (!name) return message.channel.send("Please enter a name");
    const response = await fetch(url);
    const buffer = await response.buffer();
    fs.writeFile(`./Video/${name}.png`, buffer, () =>
        message.channel.send('finished downloading!'));

};
module.exports.help = {
    name: "dlimg",
    cmd: ";dlimg <name>",
    help: "Download Image\n" +
        "> Mettre l'image a telecharger en l'attachant à votre message"
}
