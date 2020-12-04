const Discord = require("discord.js");
module.exports.run = async (client, message, args) => {
  console.log(`${message.author.tag} used the !help command.`)

    let inline = true
    let resence = true

    console.log(`${message.author.tag} used the bot author command.`)
    let embed = new Discord.MessageEmbed()
        .setThumbnail((client.displayAvatarURL))
        .setColor("#000000")
        .addField("Twitter", `[here](None)`, inline)
        .addField("Discord", `Adem#6895, </> Giuliopime#4965`, true)
        .addField("Discord Server", `[here](None)`, inline, true)
        .addField("E-Mail", `Adembenothman@gmail.com`, inline, true)
        .addField("Website", `[here](None)`, inline, true)
        .setTimestamp()

    message.channel.send(embed)
};
