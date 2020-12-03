exports.run = (client, message, args) => {
    console.log(`${message.author.tag} used the yeet helpinfo command.`)
    message.channel.send({
      embed: {
        color: 000000,
        author: {
          name: client.user.username,
          icon_url: client.user.avatarURL
        },
        title: "Info Help",
        description: "These are all the info commands.",
        fields: [{
          name: "_**!Play**_",
          value: "Gets the bot to play music."
        },
        {
          name: "_**!Skip**_",
          value: "The Bot skips the song."
        },
        {
          name: "_**!playqueue**_",
          value: "The Bot show's what song is next."
        },
        {
          name: "_**!ytsearch**_",
          value: "Uses Youtube to search for music."
        },
        {
            name: "_**!stop**_",
            value: "Stops the songs."
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
    })
  };
