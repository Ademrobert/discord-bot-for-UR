exports.run = (client, message, args) => {
  if (!message.guild) return;

  const user = message.mentions.users.first();
  if (message.member.hasPermission("MUTE_MEMBERS")) {
    if (user) {

      const member = message.guild.member(user);
      let reason = args.join(" ").slice(22);
      if (reason) {
        if (member) {
          member.guild.roles.fetch().then(role => role.cache.forEach(role => {
            if (role.name !== 'Muted') {
              message.guild.roles.create({
                data: {
                  name: 'Muted',
                  color: 'Grey',
                },
                reason: 'we needed a Muted role So thats why i created one!'
              }).then((newrole) => { newrole.permissions.remove("SEND_MESSAGES", "ATTACH_FILES", "SPEAK") }).catch(
                error => {
                  console.log(error)
                }
              )
            } else if (role.name === 'Muted') {
              member.roles.add(role.name).then(() => {

                message.reply(`Successfully muted ${user.tag}!`);
                const logs = message.guild.channels.find(channel => channel.name === "bot-logs");
                const reason = args.join(" ").slice(22);
                logs.send({
                  embed: {
                    color: 000000,
                    author: {
                      name: client.user.username,
                      icon_url: client.user.avatarURL
                    },
                    title: "Mute",
                    description: `A user has been muted in #${message.channel.name}`,
                    fields: [
                      {
                        name: "**User muted:**",
                        value: `${user.tag}`,
                      },
                      {
                        name: "**Muted by:**",
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
              }).catch(err => {

                message.reply('I was unable to mute the member.');

                console.error(err);
              });
            }
          })).catch(
            error => {
              console.log(error)
            }
          )

        } else {

          message.reply('That user isn\'t in this guild!'); return;
        }
      } else { message.reply("Please type a reason."); return; }
    } else {
      message.reply('You didn\'t mention the user to mute!'); return;
    }

  } else {
    message.reply("You don't have permission to do that!"); return;
  }

};


