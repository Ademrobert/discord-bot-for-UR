module.exports = (client, member) => {

    const channel = member.guild.channels.cache.find(ch => ch.name === 'welcome');
    if (!channel) return;
    channel.send(`Welcome ${member.user} to this server. Don't forget to read the rules and to have fun!`).catch(console.error);
   // member.addRole(member.guild.roles.cache.find(role => role.name === "Member"));
  };
