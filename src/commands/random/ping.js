
  exports.run = (client, message, args) => {
    console.log(`${message.author.tag} used the yeet ping command.`)
    message.channel.send('Pinging...')
    .then(m => {
      m.edit(`Pong! \`${m.createdTimestamp - message.createdTimestamp}\`ms`)
    }).catch(
      error => {
        console.log(error)
      }
    );
    
}, ['response'], 'Bot Response Test', '[]';
