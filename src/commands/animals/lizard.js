const superagent = require("snekfetch");
const Discord = require('discord.js')

exports.run = async (client, message, args, level) => {
  console.log(`${message.author.tag} used the yeet lizard command.`)
    superagent.get('https://nekos.life/api/v2/img/lizard')
        .end((err, response) => {
      const lewdembed = new Discord.MessageEmbed()
      .setTitle("Lizard")
      .setImage(response.body.url)
      .setColor(`#000000`)
      .setFooter(`Requested by: ${message.author.tag}`)
      .setURL(response.body.url);
  message.channel.send(lewdembed);
    })
	
}