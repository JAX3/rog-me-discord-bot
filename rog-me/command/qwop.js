module.exports = {
    name: 'qwop',
    description: 'Gives the user the Qwop role',
    execute(message) {
        let roleid = message.member.guild.roles.find("name", "QWOP");
        message.member.addRole(roleid);
        message.reply(`Has been given a Role.`)
    },
  };