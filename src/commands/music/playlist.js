const { handle } = require('../../music');

exports.run = async (client, message, args) => {
  console.log(`${message.author.tag} used the !playlist command.`)

  if (message.author.bot) return;

  await handle('!playlist', args, message, client);
};
