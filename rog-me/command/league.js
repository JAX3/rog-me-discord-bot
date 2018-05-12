module.exports = {
    name: 'league',
    description: 'Gives the user the league of legends  role',
    execute(message) {
        let roleid = message.member.guild.roles.find("name", "League of Legends");
        message.member.addRole(roleid);
        message.reply(`Has been given a Role.`)
    },
  };