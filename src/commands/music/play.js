const { handle } = require('../../music');

exports.run = async (client, message, args) => {
  console.log(`${message.author.tag} used the !play command.`)

  if (message.author.bot) return;

  await handle('!play', args, message, client);
};
