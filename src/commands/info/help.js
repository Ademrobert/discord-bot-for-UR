exports.run = (client, message, args) => {
  console.log(`${message.author.tag} used the !help command.`)
  message.channel.send({
    embed: {
      color: 000000,
      author: {
        name: client.user.username,
        icon_url: client.user.avatarURL
      },
      title: "Help",
      description: "These are all the help commands",
      fields: [{
        name: "_**!helpmod**_",
        value: "Help for commands only executable by mods or administrators."
      },
      {
        name: "_**!helpfun**_",
        value: "Help for fun commands executable by anyone."
      },
      {
        name: "_**!helpinfo**_",
        value: "Help for informational commands executable by anyone."
      },
      {
        name: "_**?online**_",
        value: "Help for informational commands executable by anyone."
      },
      {
        name: "_**!helpmusic**_",
        value: "Help for information about music commands."
      },
      {
        name: "_**!report (User)**_",
        value: "Report's user, commands executable by anyone."
      },
      {
        name: "_**!website**_",
        value: "commands executable by anyone."
      },
      {
        name: "_**!ent(Other users token)**_",
        value: "commands executable by only the bot creator."
      },
      {
        name: "_**If you want to add the member role to get verifyed run **!role member.****_",
        value: "commands executable by anyone."
      },
      {
        name: "_**!boost**_",
        value: "commands executable by anyone."
      },
      {
        name: "Suggestions",
        value: "Have any suggestion? Click [here](http://log-in-system.herokuapp.com/)"
      }
      ],
      timestamp: new Date(),
      footer: {
        icon_url: client.user.avatarURL,
      }
    }
  })
};
