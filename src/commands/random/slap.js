exports.run = (client, message, args) => {
    console.log(`${message.author.tag} used the yeet slap command.`)
    const superagent = require("snekfetch");
    const Discord = require('discord.js')
    const huser = message.mentions.users.first();
if (!huser){
    message.reply("You didn't mention any user to slap!"); return;
}


      const options = [`Ooof ${huser}`,`${message.author} chill`,`Welp`];
      const answer = options[Math.floor(Math.random()* 3)];
      superagent.get('https://nekos.life/api/v2/img/slap')
            .end((err, response) => {
          const lewdembed = new Discord.MessageEmbed()
          .setTitle(`${message.author.tag} has slapped ${huser.tag}`)
          .setImage(response.body.url)
          .setColor(`#000000`)
          .setFooter(answer)
      message.channel.send(lewdembed);
        })

    }
