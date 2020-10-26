const Discord = require("discord.js");
module.exports.run =async (bot, message, args) => {
  console.log(`${message.author.tag} used the yeet userinfo command.`)
  let inline = true
  let resence = true
  const status = {
      online: "Online",
      idle: "Idle",
      dnd: "Do Not Disturb",
      offline: "Offline/Invisible"
    }
      
const member = message.mentions.members.first() || message.guild.members.get(args[0]) || message.member;
let target = message.mentions.users.first() || message.author

if (member.user.bot === true) {
  bot = "Yes";
} else {
  bot = "No";
}
if (member.nickname === null) {
  member.nickname = "No nickname";
};

          let embed = new Discord.MessageEmbed()
              .setAuthor(member.user.username)
              .setThumbnail((target.displayAvatarURL))
              .setColor("#000000")
              .addField("Full Username", `${member.user.tag}`, inline)
              .addField("ID", member.user.id, inline)
              .addField("Nickname", `Nickname: ${member.nickname}`, true)
              .addField("Bot", `${bot}`,inline, true)
              .addField("Status", `${status[member.user.presence.status]}`, inline, true)
              .addField("Playing", `${member.user.presence.game ? ` ${member.user.presence.game.name}` : "Not playing"}`,inline, true)
              .addField("Roles", `${member.roles.cache.filter(r => r.id !== message.guild.id).map(roles => `\`${roles.name}\``).join(" **|** ") || "No Roles"}`, true)
              .addField("Joined Discord At", member.user.createdAt)
              .setFooter(`Information about ${member.user.username}`)
              .setTimestamp()
  
          message.channel.send(embed);

  }
