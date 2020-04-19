const { handle } = require('../../music');

exports.run = async (client, message, args) => {
  console.log(`${message.author.tag} used the !ytsearch command.`)

  if (message.author.bot) return;

  await handle('!ytsearch', args, message, client);
};
