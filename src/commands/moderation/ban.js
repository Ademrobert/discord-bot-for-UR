exports.run = (client, message, args) => {
  console.log(`${message.author.tag} used the ban command.`)
  if (!message.guild) return;

  const user = message.mentions.users.first();
  if (message.member.hasPermission("BAN_MEMBERS")) {
    if (user) {

      const member = message.guild.member(user);
      let reason = args.join(" ").slice(22);
      if (reason) {
        if (member) {

          member.ban('A user was banned.').then(() => {
            const logs = message.guild.channels.cache.find(channel => channel.name === "bot-logs");
            const reason = args.join(" ").slice(22);

            logs.send({
              embed: {
                color: 000000,
                author: {
                  name: client.user.username,
                  icon_url: client.user.avatarURL
                },
                title: "Ban",
                description: `A user has been banned in <#${message.channel.id}>`,
                fields: [{
                    name: "**User banned:**",
                    value: `${user.tag}`,
                  },
                  {
                    name: "**Banned by:**",
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

            message.reply(`Successfully banned ${user.tag}!`);
          }).catch(err => {

            message.reply('I was unable to ban the member.');
            console.error(err);
            return;


          });
        } else {

          message.reply('That user isn\'t in this guild!');
          return;
        }
      } else {
        message.reply("Please type a reason.");
        return;
      }

    } else {
      message.reply('You didn\'t mention the user to ban!');
      return;
    }

  } else {
    message.channel.send("You don't have permission to do that!");
    return;
  }
};
