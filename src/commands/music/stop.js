const { handle } = require('../../music');

exports.run = async (client, message, args) => {
  console.log(`${message.author.tag} used the !stop command.`)

  if (message.author.bot) return;

  await handle('!stop', args, message, client);
};
