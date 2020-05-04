const Discord = require('discord.js');
const randomPuppy = require('random-puppy')

module.exports.run = async(bot, message, args) => {
  console.log(`${message.author.tag} used the meme command.`)
  randomPuppy('memes')
            .then(url => {
                const embed = new Discord.RichEmbed()
                
                .setTitle(`Meme`)
                .setFooter(`Requested by ${message.author.tag}`)
                .setImage(url)
                .setColor(`${message.guild.me.displayHexColor!=='#000000' ? message.guild.me.displayHexColor : 000000}`)
    return message.channel.send({ embed });
            })
  }
