exports.run = (client, message, args) => {
  console.log(`${message.author.tag} used the yeet hug command.`)
    const superagent = require("snekfetch");
    const Discord = require('discord.js')
    const huser = message.mentions.users.first();
if (!huser){
    message.reply("You didn't mention any user to hug!"); return;
}

if (message.author === huser){
  const lewdembed = new Discord.RichEmbed()
  .setTitle(`So.. you are alone <@${message.author.id}>...`)
  .setColor(`#000000`)
  .setFooter("uhhh...")
message.channel.send(lewdembed); 
} else {

      const options = ["Huggy!", "( ͡° ͜ʖ ͡°)","**uwu**"];  
      const answer = options[Math.floor(Math.random()* 5)];
      superagent.get('https://nekos.life/api/v2/img/hug')
            .end((err, response) => {
          const lewdembed = new Discord.RichEmbed()
          .setTitle(`${message.author.tag} has hugged ${huser.tag}`)
          .setImage(response.body.url)
          .setColor(`#000000`)
          .setFooter(answer)
      message.channel.send(lewdembed);
        })
    } };
