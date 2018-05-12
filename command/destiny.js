module.exports = {
    name: 'destiny',
    description: 'Gives the user the Overwatch role',
    execute(message) {
        let roleid = message.member.guild.roles.find("name", "Destiny 2");
        message.member.addRole(roleid);
        message.reply(`Has been given a Role.`)
    },
  };