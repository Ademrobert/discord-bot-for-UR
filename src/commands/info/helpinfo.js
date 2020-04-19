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
        name: "_**!helpping**_",
        value: "Gets the bot's ping in ms."
      },
      {
        name: "_**!helpserver**_",
        value: "Shows the server's information."
      },
      {
        name: "_**!helpauthor**_",
        value: "Shows the creators info."
      },
      {
        name: "_**!helpuserinfo (user)**_",
        value: "Shows your information."
      },
      {
        name: "_**!helproleinfo (role)**_",
        value: "Shows the information for the mentioned role."
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