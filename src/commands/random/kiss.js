exports.run = (client, message, args) => {
    console.log(`${message.author.tag} used the yeet kiss command.`)
    const superagent = require("snekfetch");
    const Discord = require('discord.js')
    const huser = message.mentions.users.first();
if (!huser){
    message.reply("You didn't mention any user to kiss!"); return;
}



      const options = ["Aw, so cute!"];
      const answer = options[Math.floor(Math.random()* 7)];
      superagent.get('https://nekos.life/api/v2/img/kiss')
            .end((err, response) => {
          const lewdembed = new Discord.MessageEmbed()
          .setTitle(`${message.author.tag} has kissed ${huser.tag}`)
          .setImage(response.body.url)
          .setColor(`#000000`)
          .setFooter(answer)
      message.channel.send(lewdembed);
        })

    }
