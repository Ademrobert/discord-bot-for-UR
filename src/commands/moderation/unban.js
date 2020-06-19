const Discord = require("discord.js");
const { bot } = require("../../config");
exports.run = (client, message, args) => {
    console.log(`${message.author.tag} used the Unban command.`)

    if (!message.member.hasPermission(["BAN_MEMBERS", "ADMINISTRATOR"])) return message.channel.send("You Don't have permission to preform this command!")

    let bannedMember = await client.fetchUser(args[0])
    if(!bannedMember) return message.channel.send("Please provide a user id to unban someone!")

    let reason = args.slice(1).join(" ")
    if(!reason) reason = "no reason given!"

    if(!message.guild.me.hasPermission(["BAN_MEMBERS", "ADMINISTRATOR"])) return message.channel.send("I don't have the permission to preform that action!")
    message.delete()
    try{
        message.guild.unban(bannedMember, {reason: reason})
        message.channel.send(`${bannedMember.tag} has been unbanned from the guild`)
    }catch(e) {
        console.log(e.message)
    }

    const logs = message.guild.channels.find(channel => channel.name === "bot-logs");
            const reason = args.join(" ").slice(22);

            logs.send({
              embed: {
                color: 000000,
                author: {
                  name: client.user.username,
                  icon_url: client.user.avatarURL
                },
                title: "UnBan",
                description: `A user has been banned in <#${message.channel.id}>`,
                fields: [{
                    name: "**User Unbanned:**",
                    value: `${user.tag}`,
                  },
                  {
                    name: "**UnBanned by:**",
                    value: `${message.author}`,
                  },
                  {
                    name: "**Reason:**",
                    value: `${reason}`,
                  },
                ],
                timestamp: new Date(),
                footer: {
                  icon_url: client.user.avatarURL,
                }
              }
            });

};
