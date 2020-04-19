
const request = require("request");

exports.run = async (client, message, args) => { 
  message.channel.startTyping();
  console.log(`${message.author.tag} used the yeet dogfact command.`)
  request({ uri: "https://dog-api.kinduff.com/api/facts", json: true }, (error, response, body) => {
    if (error) throw new Error(error);
    message.channel.stopTyping();
    message.channel.send(`🐶 **Did you know?** ${body.facts[0]}`);
  });
};