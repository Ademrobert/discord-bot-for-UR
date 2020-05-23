const Discord = require("discord.js");
const config = require("./config");
let xp = require("./xp.json");


client.config = {
	token: config.bot.token,
	prefix: config.bot.prefix,
	NOTALLOWED_COMMANDS: config.bot.notAllowedCommands,
};

module.exports.run = async (bot, message, args) => {
    
}


module.exports.help = {
    name: "level"
}