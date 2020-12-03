const Discord = require('discord.js');
const randomPuppy = require('random-puppy');
const { RichEmbed, Attachment } = require('discord.js');

module.exports.run = async(bot, message, args) => {
  console.log(`${message.author.tag} used the help historymeme command.`)
  randomPuppy('historymemes')
            .then(url => {
                const embed = new RichEmbed()
                
                .setTitle(`Historic Meme`)
                .setFooter(`Requested by ${message.author.tag}`)
                .setImage(url)
                .setColor(`${message.guild.me.displayHexColor!=='#000000' ? message.guild.me.displayHexColor : 000000}`)
    return message.channel.send({ embed });
            }).catch(
              error => {
                console.log(error)
              }
            )
  }
