module.exports = (client) => {
    console.log(`Ready to YEET and DELETE in ${client.channels.size} channels on ${client.guilds.size} servers, for a total of ${client.users.size} users.`);
    // client.user.setStatus("dnd");

    const activities_list = [
      "people type",
      "Netflix",
      "over the server",
      "yeet help"
      ];

      setInterval(() => {
          const index = Math.floor(Math.random() * (activities_list.length - 1) + 1);
          client.user.setActivity(activities_list[index]);
          client.user.setPresence({
            game: {
                name: activities_list[index],
                type: 'WATCHING'
            }})}, 10000);
          };
