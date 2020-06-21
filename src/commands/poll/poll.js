const { Client, RichEmbed } = require('discord.js')
const client = new Discord.Client();


const PREFIX = "p!";

client.on('message', message => {
    let args = message.content.substring(PREFIX.length).split(" ");

    switch (args[0]) {
        case "poll":
            const Embed = new RichEmbed()
            .setColor(0xFFC300)
            .setTitle("Inititate Poll")
            .setDescription("p!poll to inititate a simple yes or no poll")

            if(!args[1]){
                message.channel.send(Embed);
            }
            break
    }
});
