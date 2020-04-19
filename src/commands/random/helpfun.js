exports.run = (client, message, args) => {
  console.log(`${message.author.tag} used the yeet helpfun command.`)
  message.channel.send({
    embed: {
      color: 000000,
      author: {
        name: client.user.username,
        icon_url: client.user.avatarURL
      },
      title: "Fun Help",
      description: "These are all the fun commands.",
      fields: [{
        name: "_**!helpcat**_",
        value: "Gets a picture of a cat."
      },
      {
        name: "_**!helpdog**_",
        value: "Gets a picture of a dog."
      },
      {
        name: "_**!helpparrot**_",
        value: "Gets a picture of a parrot."
      },
      {
        name: "_**!helpcatfact**_",
        value: "Gets a fact of cats."
      },
      {
        name: "_**!helpdogfact**_",
        value: "Gets a fact of dogs."
      },
      {
        name: "_**!helpcoinflip**_",
        value: "Flips a coin for you."
      },
      {
        name: "_**!helplizard**_",
        value: "Gets a picture of a lizard."
      },
      {
        name: "_**!helpmeme**_",
        value: "Gets a meme from subreddit /memes."
      },
      {
        name: "_**!helpdankmeme**_",
        value: "Gets a meme from subreddit /dankmemes."
      },
      {
        name: "_**!helphistorymeme**_",
        value: "Gets a meme from subreddit /historymemes."
      },
      {
        name: "_**!helphug**_",
        value: "Hug somebody."
      },
      {
        name: "_**!helpkiss**_",
        value: "Kiss somebody."
      },
      {
        name: "_**!helpslap**_",
        value: "Slap somebody."
      },
      {
        name: "Suggestions",
        value: "Have any suggestion? Click [here](https://discord.gg/SvNrenM)"
      },
      {
        name: "_**!helppanda**_",
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