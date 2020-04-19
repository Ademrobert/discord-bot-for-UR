module.exports.run = (client, message, args) => {
  console.log(`${message.author.tag} used the yeet mute command.`)
	if (message.member.hasPermission("MANAGE_MESSAGES")) {
  if (isNaN(args[0])) {
    return message.channel.send('Please define a number..').then(m => m.delete(2000))
  }

  var am = args[0]
  message.channel.send(":exclamation: Beginning to clear " + am + " messages... :exclamation:").then(m => m.delete(2500))

  setTimeout(() => {
    message.channel.bulkDelete(am)
    .then(() => {
        message.channel.send("Done! Cleared " + am + " messages!").then(m => m.delete(2000))
    })
    .catch(err => message.channel.send("I couldn't purge those messages.").then(m => m.delete(2000)))
  }, 1000);
} else {
	message.channel.send(":neutral_face: You don't have permission to do that. :neutral_face:").then(m => m.delete(2000))
	}
}
