const request = require("request");

exports.run = async (client, message, args) => {
  message.channel.startTyping();
  console.log(`${message.author.tag} used the yeet dog command.`)
  request({ uri: "https://dog.ceo/api/breeds/image/random", json: true }, (error, response, body) => {
    if (error) throw new Error(error);
    message.channel.stopTyping();
    message.channel.send({
      files: [{
        attachment: body.message,
        name: "dog.png"
      }]
    });
  });
};