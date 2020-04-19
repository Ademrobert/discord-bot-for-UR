const request = require("request");

exports.run = async (client, message, args) => { 
  message.channel.startTyping();
  console.log(`${message.author.tag} used the help cat command.`)
  request({
    url: "https://api.thecatapi.com/v1/images/search?format=json&mime_types=jpg,png",
    headers: {
      "x-api-key": client.config.catToken
    },
    json: true
  }, (error, response, body) => {
    if (error) throw new Error(error);
    message.channel.stopTyping();
    message.channel.send({
      files: [{
        attachment: body[0].url,
        name: "cat.png"
      }]
    });
  });
};
