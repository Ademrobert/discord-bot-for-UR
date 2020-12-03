exports.run = (client, message, args) => {
  console.log(`${message.author.tag} used the yeet coinflip command.`)
let random = (Math.floor(Math.random() * Math.floor(2)));

if(random === 0) {
  message.channel.send('It flipped heads!');
}
else {
  message.channel.send('It flipped tails!');
}
};
