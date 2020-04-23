exports.run = (client, message, args) => {
  console.log(`${message.author.tag} used the !helpmod command.`)
    message.channel.send({embed: {
        color: 000000,
        author: {
          name: client.user.username,
          icon_url: client.user.avatarURL
        },
        title: "Mod Help",
        description: "These are all the moderation commands",
        fields: [{
            name: "_**!kick (User) (reason)**_",
            value: "Kicks the user mentioned."
          },
          {
            name: "_**!ban (User) (reason)**_",
            value: "Bans the user mentioned."
          },
          {
            name: "_**!tempban (User) (Time s/m/h/d) (Reason)**_",
            value: "Bans the user mentioned for an ammount of time."
          },
          {
            name: "_**!mute (User) (Reason)**_",
            value: "Mutes the user mentioned."
          },
          {
            name: "_**!unmute (User) (Reason)**_",
            value: "Unmutes the user mentioned."
          },
          {
            name: "_**!tempmute (User) (Time s/m/h/d) (Reason)**_",
            value: "Mutes the user mentioned for an ammount of time."
          },
          {
            name: "_**!clear (Number)**_",
            value: "Deletes an specific ammount of messages."
          },
          {
            name: "_**!warn (User)**_",
            value: "Warns the user mentioned."
          },
          {
            name: "_**!report (User)**_",
            value: "Report's user."
          },
          {
            name: "Suggestions",
            value: "Have any suggestion? Click [here](https://discord.gg/SvNrenM)"
          }
        ],
        timestamp: new Date(),
        footer: {
          icon_url: client.user.avatarURL,
        }
      }
    })};