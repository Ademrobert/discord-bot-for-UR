const { handle } = require('../../music');

exports.run = async (client, message, args) => {
  console.log(`${message.author.tag} used the !skip command.`)

  if (message.author.bot) return;

  await handle('!skip', args, message, client);
};
