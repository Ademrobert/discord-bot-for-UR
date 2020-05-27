const Discord = require("discord.js");
const { RichEmbed, Attachment } = require('discord.js');
const client = new Discord.Client();
const config = require("./config");
const fs = require("fs");
const Enmap = require("enmap");
const database = require('./database');
let xp = require("./xp.json");
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
        .setDescription("Website Is here clikc on this link --> http://log-in-system.herokuapp.com/");
      message.channel.send(embed);
    }
  });

  let xpAdd = Math.floor(Math.random() * 7) + 8;
  console.log(xp);



  const userCreatedPolls = new Map();

  client.login(config.TOKEN);
  client.on('ready', () => console.log(client.user.tag + " has logged in."));
  
  client.on('message', async message => {
      if(message.author.bot) return;
      if(message.content.toLowerCase() === '!createpoll') {
          if(userCreatedPolls.has(message.author.id)) {
              message.channel.send("You already have a poll going on right now.");
              return;
          }
          message.channel.send("Enter options. Max 5. Type done when finished.");
          let filter = m => {
              if(m.author.id === message.author.id) {
                  if(m.content.toLowerCase() === 'done') collector.stop();
                  else return true;
              }
              else return false;
          }
          let collector = message.channel.createMessageCollector(filter, { maxMatches: 5 });
          let pollOptions = await getPollOptions(collector);
          if(pollOptions.length < 2) {
              message.channel.send("Not enough options, must contain 2!");
              return;
          }
          let embed = new discord.RichEmbed();
          embed.setTitle("Your Poll");
          embed.setDescription(pollOptions.join("\n"));
          let confirm = await message.channel.send(embed);
          
          await confirm.react('✅');
          await confirm.react('❎');
  
          let reactionFilter = (reaction, user) => (user.id === message.author.id) && !user.bot;
          let reaction = (await confirm.awaitReactions(reactionFilter, { max: 1 })).first();
          if(reaction.emoji.name === '✅') {
              message.channel.send("Poll will begin in 1 seconds.");
              await delay(1000);
              message.channel.send("Vote now!");
              let userVotes = new Map();
              let pollTally = new discord.Collection(pollOptions.map(o => [o, 0]));
              let pollFilter = m => !m.bot;
              let voteCollector = message.channel.createMessageCollector(pollFilter, {
                  time: 60000
              });
              userCreatedPolls.set(message.author.id, voteCollector);
              await processPollResults(voteCollector, pollOptions, userVotes, pollTally);
              let max = Math.max(...pollTally.array());
              console.log(pollTally.entries());
              let entries = [...pollTally.entries()];
              let winners = [];
              let embed = new discord.RichEmbed();
              let desc = '';
              entries.forEach(entry => entry[1] === max ? winners.push(entry[0]) : null);
              entries.forEach(entry => desc  += entry[0] + " received " + entry[1] + " votes(s)\n");
              embed.setDescription(desc);
  
              if(winners.length === 1) {
                  message.channel.send(winners[0] + " is the winner!", embed);
              }
              else {
                  message.channel.send("We have a draw!", embed);
              }
          }   
          else if(reaction.emoji.name === '❎') {
              message.channel.send("Poll cancelled.");
          }
      }
      else if(message.content.toLowerCase() === '!stopvote') {
          if(userCreatedPolls.has(message.author.id)) {
              console.log("Trying to stop poll.");
              userCreatedPolls.get(message.author.id).stop();
              userCreatedPolls.delete(message.author.id);
          }
          else {
              message.channel.send("You don't have a poll going on right now.");
          }
      }
  });
  
  function processPollResults(voteCollector, pollOptions, userVotes, pollTally) {
      return new Promise((resolve, reject) => {
          voteCollector.on('collect', msg => {
              let option = msg.content.toLowerCase();
              if(!userVotes.has(msg.author.id) && pollOptions.includes(option)) {
                  userVotes.set(msg.author.id, msg.content);
                  let voteCount = pollTally.get(option);
                  pollTally.set(option, ++voteCount);
              }
          });
          voteCollector.on('end', collected => {
              console.log("Collected " + collected.size + " votes.");
              resolve(collected);
          })
      });
  }
  
  function getPollOptions(collector) {
      return new Promise((resolve, reject) => {
          collector.on('end', collected => resolve(collected.map(m => m.content.toLowerCase())));
      });
  }
  
  function delay(time) {
      return new Promise((resolve, reject) => {
          setTimeout(() => {
              resolve();
          }, time)
      })
  }