const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  console.log(`${message.author.tag} used the help server command.`)
  const verlvl = {
    0: "None",
    1: "Low",
    2: "Medium",
    3: "(╯°□°）╯︵ ┻━┻",
    4: "(ノಠ益ಠ)ノ彡┻━┻"
  }

  let inline = true
  let sicon = message.guild.iconURL;
  let serverembed = new Discord.RichEmbed()
    .setColor("#000000")
    .setThumbnail(sicon)
    .setAuthor(message.guild.name)
    .addField("Name", message.guild.name, inline)
    .addField("ID", message.guild.id, inline)
    .addField("Owner", message.guild.owner, inline)
    .addField("Region", message.guild.region, inline)
    .addField("Verification Level", verlvl[message.guild.verificationLevel], inline)
    .addField("Members", `${message.guild.memberCount}`, inline)
    .addField("Roles", message.guild.roles.size, inline)
    .addField("Channels", message.guild.channels.size, inline)
    .addField("You Joined", message.member.joinedAt)
    .addField(`Created`, ` ${message.guild.createdAt}`)
    .setFooter(`Information for: ${message.guild.name}`);

  message.channel.send(serverembed);
}
