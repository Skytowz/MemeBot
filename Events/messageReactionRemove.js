const Discord = require("discord.js");
const liste = require("../Commandes/liste");
const prefix = "&";
let explosion = false;

module.exports = async (client, messageReaction, user) => {
	if (user.bot) return;
	if (messageReaction.partial) {
		try {
			await messageReaction.fetch();
		} catch (error) {
			console.error('Something went wrong when fetching the message: ', error);
			return;
		}
	}
	if (!messageReaction.me && messageReaction.message.embeds[0] && messageReaction.message.embeds[0].title == 'Liste des videos disponibles :') {
		// const liste = require('../Commandes/liste')
		// liste.liste(messageReaction.message)
		if (messageReaction.emoji.name == '👈') {
			let i = messageReaction.message.embeds[0].footer.text.split('/')[0];
			liste.liste(messageReaction.message, i - 1);
		}
		if (messageReaction.emoji.name == '👉') {
			let i = messageReaction.message.embeds[0].footer.text.split('/')[0];
			liste.liste(messageReaction.message, 1 + Number.parseInt(i));
		}
	}
}