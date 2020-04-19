const Discord = require("discord.js");
const { RichEmbed, Attachment } = require('discord.js');
const client = new Discord.Client();
const config = require("./config");
const fs = require("fs");
const Enmap = require("enmap");
client.config = {
	token: config.bot.token,
	prefix: config.bot.prefix,
	NOTALLOWED_COMMANDS: config.bot.notAllowedCommands,
};

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

// fs.readdir("./commands/info/", (err, files) => {
//   if (err) return console.error(err);
//   files.forEach(file => {
//     if (!file.endsWith(".js")) return;
//     let props = require(`./commands/info/${file}`);
//     let commandName = file.split(".")[0];
//     console.log(`Attempting to load info directory ${commandName}`);
//     client.commands.set(commandName, props);
//   });
// });
// fs.readdir("./commands/moderation/", (err, files) => {
//   if (err) return console.error(err);
//   files.forEach(file => {
//     if (!file.endsWith(".js")) return;
//     let props = require(`./commands/moderation/${file}`);
//     let commandName = file.split(".")[0];
//     console.log(`Attempting to load moderation directory ${commandName}`);
//     client.commands.set(commandName, props);
//   });
// });
// fs.readdir("./commands/random/", (err, files) => {
//   if (err) return console.error(err);
//   files.forEach(file => {
//     if (!file.endsWith(".js")) return;
//     let props = require(`./commands/random/${file}`);
//     let commandName = file.split(".")[0];
//     console.log(`Attempting to load random directory ${commandName}`);
//     client.commands.set(commandName, props);
//   });
// });
// fs.readdir("./commands/memes/", (err, files) => {
//   if (err) return console.error(err);
//   files.forEach(file => {
//     if (!file.endsWith(".js")) return;
//     let props = require(`./commands/memes/${file}`);
//     let commandName = file.split(".")[0];
//     console.log(`Attempting to load memes directory ${commandName}`);
//     client.commands.set(commandName, props);
//   });
// });
// fs.readdir("./commands/animals/", (err, files) => {
//   if (err) return console.error(err);
//   files.forEach(file => {
//     if (!file.endsWith(".js")) return;
//     let props = require(`./commands/animals/${file}`);
//     let commandName = file.split(".")[0];
//     console.log(`Attempting to load animals directory ${commandName}`);
//     client.commands.set(commandName, props);
//   });
// });

// fs.readdir("./commands/music/", (err, files) => {
//   if (err) return console.error(err);
//   files.forEach(file => {
//     if (!file.endsWith(".js")) return;
//     let props = require(`./commands/animals/${file}`);
//     let commandName = file.split(".")[0];
//     console.log(`Attempting to load animals directory ${commandName}`);
//     client.commands.set(commandName, props);
//   });
// });

// fs.readdir("./commands/", (err, files) => {
//   if (err) return console.error(err);
//   files.forEach(file => {
//     if (!file.endsWith(".js")) return;
//     let props = require(`./commands/${file}`);
//     let commandName = file.split(".")[0];
//     console.log(`Attempting to load ${commandName}`);
//     client.commands.set(commandName, props);
//   });
// });


/*
fs.readdir("./commands/special/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    if (!file.endsWith(".js")) return;
    let props = require(`./commands/special/${file}`);
    let commandName = file.split(".")[0];
    console.log(`Attempting to load ${commandName}`);
    client.commands.set(commandName, props);
  });
});
*/



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

console.log("hey");

client.on('message', (message) => {
  if (message.content === '!code') {
    const embed = new RichEmbed().setTitle('Use Code').setColor(15844367).setDescription('Use Our Creator Code is: "UnstableRengades" in the Fortnite item shop :)');
    message.channel.send(embed);
  }
});

client.on('message', (message) => {
  if (message.content === '?online') {
    const embed = new RichEmbed().setTitle('Is bot online?').setColor(15844367).setDescription('Bot is online Bot is online from 9:00 Am (UTC+2) to 23:00 Pm (UTC+2)');
    message.channel.send(embed);
  }
});


client.on('message', (message) => {
  if (message.content === '!whyboost') {
    const embed = new RichEmbed()
      .setTitle('Why Boost')
      .setColor(15844367)
      .setDescription('If you Boost Unstable Rengades you will get a Boost role and you can send /tts messages you can post images in general you can stream in 1080p in Voice chats and you can Dm somebody from the UR| Developer Team and they will make a command for you only if you have Nitro role we are gonna add more perks for the nitro Boost role New perks coming Soon!');
    message.channel.send(embed);
  }
});

client.on('message', (message) => {
  if (message.content === '!boost') {
    const embed = new RichEmbed()
      .setTitle('Nitro Boosts')
      .setColor(15844367)
      .setDescription(':dash:Remember That If You Have Discord Nitro To Boost Our Server:dash:   :fire:If You Boost Our Server It Will Give A Better Experience:fire:');
    message.channel.send(embed);
  }
});



client.commands = new Enmap();






//discord anti spam
/*antispam(client, {
     warnBuffer: 10, // Maximum ammount of messages allowed to send in the interval time before getting warned.
     maxBuffer: 60, // Maximum amount of messages allowed to send in the interval time before getting banned.
     interval: 2000, // Amount of time in ms users can send the maxim amount of messages(maxBuffer) before getting banned.
     warningMessage: "please stop spamming!", // Message users receive when warned. (message starts with '@User, ' so you only need to input continue of it.)
     banMessage: "has been hit by ban hammer for spamming!", // Message sent in chat when user is banned. (message starts with '@User, ' so you only need to input continue of it.)
     maxDuplicatesWarning: 7,// Maximum amount of duplicate messages a user can send in a timespan before getting warned.
     maxDuplicatesBan: 10, // Maximum amount of duplicate messages a user can send in a timespan before getting banned.
     deleteMessagesAfterBanForPastDays: 7, // Deletes the message history of the banned user in x days.
     exemptRoles: ["Moderator"], // Name of roles (case sensitive) that are exempt from spam filter.
     exemptUsers: ["Todo#2120"] // The Discord tags of the users (e.g: MrAugu#9016) (case sensitive) that are exempt from spam filter.
   });

// Rest of your code

client.on('message', msg => {
client.emit('checkMessage', msg); // This runs the filter on any message bot receives in any guilds.

// Rest of your code
});*/







//XP system
/*
client.on("message", message => {
let xp = require("./xp.json");
let xpAdd = Math.floor(Math.random() * 2) + 6;


if(!xp[message.author.id]){
xp[message.author.id] = {
    xp: 0,
    level: 1,
};
}


let curxp = xp[message.author.id].xp;
let curllvl = xp[message.author.id].level;
let nxtLvl = xp[message.author.id].level * 100;
xp[message.author.id].xp = curxp + xpAdd;
if(nxtLvl <= xp[message.author.id].xp){
xp[message.author.id].level = curllvl + 1;
let lvlup = new Discord.RichEmbed()
.setAuthor(message.author.username)
.setTitle(`${message.author.username} Leveled up!`)
.setColor(000000)
.addField("New level!", curllvl + 1);

message.channel.send(lvlup);
}
fs.writeFile("./xp.json", JSON.stringify(xp), (err) => {
if(err) console.log(err)
})
}); */

client.login(config.bot.token);

// start the bot by runing = Npm start