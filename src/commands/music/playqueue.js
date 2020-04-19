const { handle } = require('../../music');

exports.run = async (client, message, args) => {
  console.log(`${message.author.tag} used the !playqueue command.`)

  if (message.author.bot) return;

  await handle('!playqueue', args, message, client);
};
