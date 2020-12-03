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
        name: "_**!cat**_",
        value: "Gets a picture of a cat."
      },
      {
        name: "_**!dog**_",
        value: "Gets a picture of a dog."
      },
      {
        name: "_**!parrot**_",
        value: "Gets a picture of a parrot."
      },
      {
        name: "_**!catfact**_",
        value: "Gets a fact of cats."
      },
      {
        name: "_**!dogfact**_",
        value: "Gets a fact of dogs."
      },
      {
        name: "_**!coinflip**_",
        value: "Flips a coin for you."
      },
      {
        name: "_**!lizard**_",
        value: "Gets a picture of a lizard."
      },
      {
        name: "_**!meme**_",
        value: "Gets a meme from subreddit /memes."
      },
      {
        name: "_**!dankmeme**_",
        value: "Gets a meme from subreddit /dankmemes."
      },
      {
        name: "_**!historymeme**_",
        value: "Gets a meme from subreddit /historymemes."
      },
      {
        name: "_**!hug**_",
        value: "Hug somebody."
      },
      {
        name: "_**!kiss**_",
        value: "Kiss somebody."
      },
      {
        name: "_**!slap**_",
        value: "Slap somebody."
      },
      {
        name: "_**!panda**_",
        value: "Shows a picture of a panda."
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