
let guildsInterval = {};

module.exports = (client) => {
  console.log('Set up counter service');
  return {
    counterInterval: (guildId, channelId, type) => {
      console.log('Creating interval for ', guildId, channelId);
      const guild = client.guilds.get(guildId);
      if (!guild) {
        console.log('Guild not found', guildId);
        return;
      }  
      var memberCountChannel = client.channels.get(channelId);
      if (!memberCountChannel) {
        console.log('Channel not found', channelId);
        return;
      }
      if (guildsInterval[guildId]) {
        clearInterval(guildsInterval[guildId]);
      }
      guildsInterval[guildId] = setInterval(function () {
         var memberCount = guild.members.filter(member => !member.user.bot).size;
         var botCount = guild.members.filter(member => member.user.bot).size;
         switch(type) {
            case 'members':
              memberCountChannel.setName(`Members: ${memberCount}`);
              break;
            case 'bots':
              memberCountChannel.setName(`Bots: ${botCount}`);
              break;
         }
      }, 1000);
    }
  };
}