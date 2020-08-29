const Discord = require("discord.js");
const ms = require("ms");
const fs = require("fs");
let warns = JSON.parse(fs.readFileSync(`${__dirname}/warnings.json`, "utf8"));
exports.run = (client, message, args) => {
    console.log(`${message.author.tag} used the yeet warn command.`)



    if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("You don't have pemissions!");
    let wUser = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0])
    if (!wUser) return message.reply("Couldn't find the user.");
    if (wUser.hasPermission("MANAGE_MESSAGES")) return message.reply("You can't warn this user.");
    let reason = args.join(" ").slice(22);
    if (!reason) {
        message.channel.send("Please type a reason.");
    }

    if (!warns[wUser.id]) warns[wUser.id] = {
        warns: 0
    };

    warns[wUser.id].warns++;

    fs.writeFile("./warnings.json", JSON.stringify(warns), (err) => {
        if (err) console.log(err);
    });
    let warnEmbed = new Discord.MessageEmbed()
        .setDescription("Warns")
        .setAuthor(message.author.username)
        .setColor("#000000")
        .addField("Warned User", `<@${wUser.id}>`)
        .addField("Warned in", message.channel)
        .addField("Number of warnings", warns[wUser.id].warns)
        .addField("Reason", reason);

    let warnchannel = message.guild.channels.cache.find(channel => channel.name === "bot-logs");
    if (!warnchannel) return message.reply("Couldn't find channel.");

    warnchannel.send(warnEmbed);


    if (warns[wUser.id].warns == 3) {
        let muterole = message.guild.roles.cache.find(`name`, "Muted");
        if (!muterole) return message.reply("Role Muted not found.");

        let mutetime = "30m";
        (wUser.addRole(muterole.id));
        message.channel.send(`<@${wUser.id}> has been temporarily muted.`);

        setTimeout(function () {
            wUser.removeRole(muterole.id)
            message.channel.reply("The user has been unmuted.")
        }, ms(mutetime))
    }

    if (warns[wUser.id].warns == 5) {
        message.guild.member(wUser).kick(reason);
        message.channel.send(`<@${wUser.id}> has been kicked.`)

    }
};

