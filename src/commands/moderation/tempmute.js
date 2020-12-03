exports.run = (client, message, args) => {
  const ms = require("ms");
  const fs = require("fs");
  if (!message.guild) return;

    const user = message.mentions.users.first();
    let allowedRoles = message.guild.roles.find("name", "Admin", "Mod", "Owner","Manager","Discord Manager","Trainee");
    if(message.member.hasPermissions("MUTE_MEMBERS")){

      let reason = args.join(" ").slice(22);
      if(reason){

    if (user) {

  let wUser = message.guild.member(message.mentions.users.first())
      const member = message.guild.member(user);
    let mutetime = args[1];
    let muterole = message.guild.roles.find(`name`, "Muted");

    if(!muterole) return message.reply("Role Muted not found.");


    (wUser.addRole(muterole.id));
    const reason = args[2]
    message.channel.send(`<@${wUser.id}> has been temporarily muted.`);
    wUser.sendMessage(`You have been temporarily muted in ${message.guild.name}  for: ${mutetime} by: ${message.author.tag} Reason: ${reason}.`);

    const logs = message.guild.channels.find(channel => channel.name === "bot-logs");

logs.send({embed: {
    color: 000000,
    author: {
      name: client.user.username,
      icon_url: client.user.avatarURL
    },
    title: "TempMute",
    description: `A user has been tempmuted in <#${message.channel.id}>`,
    fields: [
      {
        name: "**User muted:**",
        value: `<@${user.id}>`,
      },
      {
        name: "**Muted by:**",
        value: `${message.author}`,
      },
      {
        name: "**Time muted:**",
        value: `${mutetime}`,
      },
      {
        name: "**Reason:**",
        value: `${reason}`,
      },

    ],
    timestamp: new Date(),
    footer: {
      icon_url: client.user.avatarURL,
    }
  }
});
    setTimeout(function(){
        wUser.removeRole(muterole.id)
        message.reply("The user has been unmuted.")
    }, ms(mutetime))
  }} else {
    message.reply("Please type a reason.");
  }} else {
    message.reply("You don't have permission to do that!");
  }};
