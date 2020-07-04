var Filter = require('bad-words'),
    filter = new Filter({ placeHolder: '\\*'});

module.exports = (client, message) => {
  if (message.author.bot) return;

  if (filter.isProfane(message.content)) {
    message.content = filter.clean(message.content).replace('@everyone', 'everyone');
    message.content = filter.clean(message.content).replace('@here', 'here');
    message.content = filter.clean(message.content).replace('@community', 'community');
    message.channel.send(`${message.member.displayName}: ${message.content}`).then(() => message.delete());
    // message.member.send("Please dont say bad words :). we are good people. This time i filtered your message, its just a warn.");
    return;
  }
  
  if (message.content.indexOf(client.config.prefix) !== 0) return;


  const args = message.content.slice(client.config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();


  const cmd = client.commands.get(command);

  
  if (!cmd) return;

  
  cmd.run(client, message, args);
};