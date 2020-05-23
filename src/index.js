const Discord = require("discord.js");
const { RichEmbed, Attachment } = require('discord.js');
const client = new Discord.Client();
const config = require("./config");
const fs = require("fs");
const Enmap = require("enmap");
const database = require('./database');
const db = database.getConnection({
  filename: config.database.file.name,
});
db.defaults({ counters: [] })
  .write();

client.config = {
	token: config.bot.token,
	prefix: config.bot.prefix,
	NOTALLOWED_COMMANDS: config.bot.notAllowedCommands,
};

let cooldown = new Set();
let cdseconds = 5;

const counterService = require('./counter')(client);

// // change working directory into server working directory!
// try {
//   process.chdir('/home/adembenothman/Discord-bot/');
// }
// catch (err) {
//   console.error(`chdirL ${err}`);
// }
process.chdir(__dirname);
const cmdDirs = [
  './commands/',
  './commands/info/',
  './commands/moderation/',
  './commands/random/',
  './commands/memes/',
  './commands/animals/',
  './commands/music/',
];

cmdDirs.forEach((dir) => {
  fs.readdir(dir, (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {
      if (!file.endsWith(".js")) return;
      let props = require(`${dir}${file}`);
      let commandName = file.split(".")[0];
      console.log(`Attempting to load ${dir} directory ${commandName}`);
      client.commands.set(commandName, props);
    });
  });
})


fs.readdir("./events/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    const event = require(`./events/${file}`);
    let eventName = file.split(".")[0];
    console.log(`Attempting to load ${eventName}`);
    client.on(eventName, event.bind(null, client));
  });
});

//custom command
client.on('message', (message) => {
  const args = message.content.split(' ');
  const cmd = args.splice(0, 1).join('');
  let embed;
  switch(cmd) {
    case '!code':
      embed = new RichEmbed().setTitle('Use Code').setColor(15844367).setDescription('Use Our Creator Code is: "UnstableRengades" in the Fortnite item shop :)');
      break;
    case '?online':
      embed = new RichEmbed().setTitle('Is bot online?').setColor(15844367).setDescription('Bot is online Bot is online from 9:00 Am (UTC+2) to 23:00 Pm (UTC+2)');
      break;
    case '!skepimode':
      embed = new RichEmbed().setTitle('Skepimode').setColor(15844367).setDescription("Sekpimode is a Legendary pvper in all of minecraft history and he is unstoppable, actually never mind, he's trash");
      break;
    case '!whyboost':
      embed = new RichEmbed()
        .setTitle('Why Boost')
        .setColor(15844367)
        .setDescription('If you Boost Unstable Rengades you will get a Boost role and you can send /tts messages you can post images in general you can stream in 1080p in Voice chats and you can Dm somebody from the UR| Developer Team and they will make a command for you only if you have Nitro role we are gonna add more perks for the nitro Boost role New perks coming Soon!');
      break;
    case '!boost':
      embed = new RichEmbed()
        .setTitle('Nitro Boosts')
        .setColor(15844367)
        .setDescription(':dash:Remember That If You Have Discord Nitro To Boost Our Server:dash:   :fire:If You Boost Our Server It Will Give A Better Experience:fire:');
      break;
    case '!setcounter':
      if (!message.guild) {
        console.log('message not from guild');
        return;
      }
      if (!message.member.roles.some(r => r.name === "Admin")) {
        return message.reply('only Admin role members can set this up');
      }
      const type = args.splice(0, 1)[0];
      const channelName = args.join(' ');
      console.log(`Counter =>`, type, channelName);
      if (type !== 'members' && type !== 'bots' && type !== 'users') {
        embed = new RichEmbed()
          .setTitle('Counter')
          .setColor(15844367)
          .setDescription('Only members, users & bots counter allowed at this time.\nTry `!setcounter {type} {channel-name}`');
      } else {
        const channel = message.guild.channels.find((c) => c.name === args.join(' '));
        if (!channel) {
          embed = new RichEmbed()
            .setTitle('Counter')
            .setColor(15844367)
            .setDescription(`Channel ${channelName} not found.`);
        } else {
          const existing = db.get('counters')
            .filter({guild: message.guild.id, type})
            .value();
          if (existing.length === 0) {
            db.get('counters')
              .push({guild: message.guild.id, channel: channel.id, type})
              .write();
          }
          counterService.counterInterval(message.guild.id, channel.id, type);
        }
      }
    
      break;
  }
  if (embed) {
    message.channel.send(embed);
    message.delete();
  }
});

client.commands = new Enmap();
client.login(config.bot.token)
  .then(() => {
    const countersSet = db.get('counters')
      .value();
    countersSet.forEach((c) => {
      counterService.counterInterval(c.guild, c.channel, c.type);
    })
  })

  client.on('message', (message) => {
    if (message.content === '!website') {
      const embed = new RichEmbed()
        .setTitle('Website')
        .setColor(15844367)
        .setDescription("Website isn't public at the moment");
      message.channel.send(embed);
    }
  });


  // Anti spamm system Code :Downarrow: 

  let prefix = prefixes[message.guild.id].prefixes;
  if(!message.content.startsWith(prefix)) return;
  if(cooldown.has(message.author.id)){
    message.delete();
    message.reply("You need to wait 5 seconds between commands.")
  }
  //if(!message.member.hasPermission("ADMINISTRATOR")){
    cooldown.add(message.author.id);
 // }

  setTimeout(() => {
    cooldown.delete(message.author.id)
  }, cdseconds * 1000)
  
client.login(config.bot.token);