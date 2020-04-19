exports.run = (client, message, args) => {
  console.log(`${message.author.tag} used the !tempban command.`)
    const ms = require("ms");
    const fs = require("fs");
    if (!message.guild) return;
  
      const user = message.mentions.users.first();
      let allowedRoles = message.guild.roles.find("name", "Admin", "Mod", "Owner","Manager","Discord Manager","Trainee");
      if(message.member.hasPermissions("BAN_MEMBERS")){
  
        let reason = args.join(" ").slice(22);
        if(reason){
  
      if (user) {
  
    let wUser = message.guild.member(message.mentions.users.first())
        const member = message.guild.member(user);
      let mutetime = args[1];
  
  
  
      wUser.ban('A user was temporarily banned.');
      message.channel.send(`<@${wUser.id}> has been temporarily banned.`);
      const logs = message.guild.channels.find(channel => channel.name === "bot-logs");
      const reason = args.join(" ").slice(22);
  logs.send({embed: {
      color: 000000,
      author: {
        name: client.user.username,
        icon_url: client.user.avatarURL
      },
      title: "TempBan",
      description: `A user has been TempBanned in #${message.channel.name}`,
      fields: [
        {
          name: "**User TempBanned:**",
          value: `${user.tag}`,
        },
        {
          name: "**TempBanned by:**",
          value: `${message.author}`,
        },
        {
          name: "**Time banned:**",
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
          wUser.unban("User has been unbanned.")
          message.reply("The user has been unbanned.")
      }, ms(mutetime))
    }} else {
      message.reply("Please type a reason.");
    }}};