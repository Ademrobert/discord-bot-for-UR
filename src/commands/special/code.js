const client = new Discord.Client();

console.log("helloo");

client.on('message', (message) => {
    if (message.content == '!code') {
      const embed = new Discord.MessageEmbed().setTitle('Use Code').setColor(15844367).setDescription('Use Our Creator Code is: "UnstableRengades" in the Fortnite item shop :)');
      message.channel.send(embed);
    }
  });
