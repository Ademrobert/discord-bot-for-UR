const ytdl = require("ytdl-core");
const yts = require( 'yt-search' )
const prompter = require('discordjs-prompter');
const Discord = require('discord.js');

const queue = new Map();

module.exports = {
  handle: async (cmd, args, message, client) => {
    const text = args.join(' ');
    const serverQueue = queue.get(message.guild.id);
    switch(cmd) {
      case '!play':
        execute(text, client, message, serverQueue);
        break;
      case '!skip':
        skip(client, message, serverQueue);
        break;
      case '!stop':
        stop(client, message, serverQueue);
        break;
      case '!ytsearch':
        await search(text, client, message, serverQueue);
        break;
      case '!playqueue':
        await list(message, message.guild);
        break;
    }
    message.delete();
  },
}

function getVoiceChannel(client, message) {
  if (!message.member.voiceChannelID) {
    message.channel.send(
      "You need to be in a voice channel to play music!"
    );
    return;
  }
  const voiceChannel = client.channels.cache.get(message.member.voiceChannelID);
  if (!voiceChannel) {
    message.channel.send(
      "You need to be in a voice channel to play music!"
    );
    return;
  }
  const permissions = voiceChannel.permissionsFor(message.client.user);
  if (!permissions.has("CONNECT") || !permissions.has("SPEAK")) {
    message.channel.send(
      "I need the permissions to join and speak in your voice channel!"
    );
    return;
  }
  return voiceChannel;
}

async function execute(songCode, client, message, serverQueue, song) {
  console.log(message);
  const voiceChannel = getVoiceChannel(client, message);
  if (!voiceChannel) {
    return;
  }

  if (!song) {
    try {
      const songInfo = await ytdl.getInfo(songCode);
      song = {
        ...songInfo,
        member: message.author,
        title: songInfo.title,
        url: songInfo.video_url
      };
    } catch (err) {
      if (err.message.indexOf('No video id found') > -1) {
        search(songCode, client, message, serverQueue);
        return;
      }
    }
  }

  if (!serverQueue) {
    const queueContruct = {
      textChannel: message.channel,
      voiceChannel: voiceChannel,
      connection: null,
      songs: [],
      volume: 5,
      playing: true
    };

    queue.set(message.guild.id, queueContruct);

    queueContruct.songs.push(song);

    try {
      var connection = await voiceChannel.join();
      queueContruct.connection = connection;
      play(message.guild, queueContruct.songs[0]);
    } catch (err) {
      console.log(err);
      queue.delete(message.guild.id);
      return message.channel.send(err);
    }
  } else {
    serverQueue.songs.push(song);
    return message.channel.send({
      embed: getEmbed(song, false),
    });
  }
}

function skip(client, message, serverQueue) {
  const voiceChannel = getVoiceChannel(client, message);
  if (!voiceChannel)
    return message.channel.send(
      "You have to be in a voice channel to stop the music!"
    );
  if (!serverQueue)
    return message.channel.send("There is no song that I could skip!");
  serverQueue.connection.dispatcher.end();
}

function stop(client, message, serverQueue) {
  const voiceChannel = getVoiceChannel(client, message);
  if (!voiceChannel)
    return message.channel.send(
      "You have to be in a voice channel to stop the music!"
    );
  serverQueue.songs = [];
  serverQueue.connection.dispatcher.end();
}

function play(guild, song) {
  const serverQueue = queue.get(guild.id);
  if (!song) {
    serverQueue.voiceChannel.leave();
    queue.delete(guild.id);
    return;
  }
  const stream = ytdl(song.url, {filter: "audioonly"});

  serverQueue.dispatcher = serverQueue.connection
    .playStream(stream)
    .on("end", function() {
      serverQueue.songs.shift();
      play(guild, serverQueue.songs[0]);
    });
  serverQueue.dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);
  
  serverQueue.textChannel.send({
    embed: getEmbed(song, true),
  });
}

function list(message, guild) {
  const serverQueue = queue.get(guild.id);
  if (serverQueue && serverQueue.songs.length > 0) {
    const embed = {
      color: 3447003,
      title: 'Song Queue',
      thumbnail: {
        url: 'https://i.pinimg.com/originals/de/1c/91/de1c91788be0d791135736995109272a.png',
      },
      fields: serverQueue.songs.map((song, idx) => {
        return { name: `${idx+1}${idx+1 === 1 ? '     \:musical_note:' : ''}`, value: `[${song.title}](${song.url})` };
      }),
      timestamp: new Date(),
    };
    message.reply({
      embed
    });
  }
}

function getReplyEmoji(number, client) {
  switch(number){
    case 0:
      return '0️⃣';
    case 1:
      return '1️⃣';
    case 2:
      return '2️⃣';
    case 3:
      return '3️⃣';
    case 4:
      return '4️⃣';
    case 5:
      return '5️⃣';
    case 6:
      return '6️⃣';
    case 7:
      return '7️⃣';
    case 8:
      return '8️⃣';
    case 9:
      return '9️⃣';
  }
}

async function search(song, client, message, serverQueue) {
  const r = await yts(song);
  const videos = r.videos;
  const choices = [];
  let text = 'Please pick a song to play:\n';
  videos.slice(0, 5).forEach((v, idx) => {
    const emoji = getReplyEmoji(idx + 1, client);
    const views = String( v.views ).padStart( 10, ' ' )
    console.log( `${ views } | ${ v.title } (${ v.timestamp }) | ${ v.author.name } | ${v.id}` );
    text += `- ${emoji} ${ v.title } (${ v.timestamp })\n`;
    choices.push({
      emoji,
      song: {
        ...v,
        member: message.author,
      }
    })
  })
  const response = await prompter.choice(message.channel, {
    question: text,
    choices: choices.map((i) => i.emoji),
    userId: message.author.id
  });
  if (response) {
    const choice = choices.find((i) => i.emoji === response);
    execute(null, client, message, serverQueue, choice.song);
  }
}

function getEmbed(song, playing) {
  const views = String( song.views ).padStart( 10, ' ' )
  return {
    color: 3447003,
    title: playing ? 'Now Playing' : 'Added to Queue',
    thumbnail: {
      url: song.thumbnail,
    },
    fields: [
      { name: `${views} views`, value: `[${song.title}](${song.url})` },
    ],
    timestamp: new Date(),
    footer: {
      text: `Song added by ${song.member.username}`,
    },
  }
}
