


const fs = require("fs");
const Discord = require('discord.js');
const client = new Discord.Client();
const commandFiles = fs.readdirSync('./command');
const config = require ("./config.json");

client.login(config.token);


client.on("ready",() => {
	console.log("yo boi im online");
	client.user.setUsername("ROGer");
	client.user.setPresence({ game: { name:"ASUS ROG ME", type: 0 } });
});


///Welcome message
client.on('guildMemberAdd', (member) => {
const channel =  client.channels.get(config.channel);
	
channel.send(`Welcome ${member}, Enjoy your time here in the Asus ROG Middle eastern discord server.\n Make sure to do **${config.prefix}help**.<:ROG:418034341168414739>`);

console.log(`${member.user.username} has joined`);


/*const user = member.guild.channels.find('id', '435155600553541634')
 
user.setName(`Total Users: ${member.guild.memberCount}`);
*/
});

//ping command very usefull

client.on('message', (message)=>{
    if(message.content.startsWith(config.prefix+"ping")) {
    
          message.channel.send(`Pong! ⏱: ${Math.round(client.ping)}ms.`);
  
  }});
  


  client.on('message', (message)=>{
    if(message.content.startsWith(config.prefix+"help")) {
		const fs = require('fs');
		var help = fs.readFileSync("./help.txt","utf-8");
		message.delete().catch(O_o=>{});    
	  message.author.send(help)
	  
	  
	  
         
  }});

	
//test functions

const sql = require("sqlite");
  sql.open("./score.sqlite");




  client.on('message', (message)=>{
	
    
	sql.get(`SELECT * FROM scores WHERE userId ="${message.author.id}"`).then(row => {
		if (!row) {
		  sql.run("INSERT INTO scores (userId, points, level) VALUES (?, ?, ?)", [message.author.id, 1, 0]);
		} else {
		  let curLevel = Math.floor(0.1 * Math.sqrt(row.points + 1));
		  if (curLevel > row.level) {
			row.level = curLevel;
			sql.run(`UPDATE scores SET points = ${row.points + 1}, level = ${row.level} WHERE userId = ${message.author.id}`);
			message.reply(`You've leveled up to level **${curLevel}**! Ain't that dandy?`);
		
	
		  }
		  sql.run(`UPDATE scores SET points = ${row.points + 1} WHERE userId = ${message.author.id}`);
		 
		
		}
	  }).catch(() => {
		console.error;
		sql.run("CREATE TABLE IF NOT EXISTS scores (userId TEXT, points INTEGER, level INTEGER)").then(() => {
		  sql.run("INSERT INTO scores (userId, points, level) VALUES (?, ?, ?)", [message.author.id, 1, 0]);
		});
	  });
	
	  if (!message.content.startsWith(config.prefix)) return;
	
	  if (message.content.startsWith(config.prefix + "level")) {
		sql.get(`SELECT * FROM scores WHERE userId ="${message.author.id}"`).then(row => {
		  if (!row) return message.reply("Your current level is 0");
		  message.reply(`Your current level is ${row.level}`);
		});
	  } else
	
	  if (message.content.startsWith(config.prefix + "points")) {
		sql.get(`SELECT * FROM scores WHERE userId ="${message.author.id}"`).then(row => {
		  if (!row) return message.reply("sadly you do not have any points yet!");
		  message.reply(`you currently have ${row.points} points, good going!`);
		});
	  }
	










        
  });
  










  client.on("message", (message) => {
    if(message.content.startsWith(config.prefix+`joined`)){

    const embed = new Discord.RichEmbed()
		.setTitle(`${message.author.username}` + "#"+ `${message.author.discriminator}`)
		.setThumbnail(`${message.author.avatarURL}`)
		.setColor(0xab0f2e)
		.addField("Joined Date",`${message.member.joinedAt.toUTCString()}`)
		.setFooter("Made by JAX")
		.setTimestamp()
    message.channel.send({embed});
}});	







//info stuff
client.on('message', (message)=>{
	if(message.content.startsWith(config.prefix+"info")) {
  
	  const embed = new Discord.RichEmbed()
		  .setTitle("ROG_ME")
		  .setAuthor("Description")
		  .setColor(0xDE7421)
		  .setDescription("#ASUS #ROG #Gaming #eSports.")
		  .setFooter("Made by JAX")
		  .setTimestamp()
		  .addField("Commands","Do /help for the list of commands.")
		  .addField("JAX", "The creator of this wonderful bot. PLz no steal.", true)
		  .addField("Social","below are the important social media links.")
		  .addField(`Discord`,`Here's our discord invite link <:ROG:418034341168414739> .\n https://discord.gg/WhntVh5`,true)
		  .addField(`Twitter`,`Here's our Website link link <:ROG:418034341168414739> .\nhttps://twitter.com/ROG_ME`,true)
		  message.channel.send({embed});
  
  }});







//// do not touch it allows for commands to work
for (const file of commandFiles) {

client.commands = new Discord.Collection();
	const command = require(`./command/${file}`);
	client.commands.set(command.name, command);
}

client.on('message', message => {
	if (!message.content.startsWith(config.prefix) || message.author.bot) return;

	const args = message.content.slice(config.prefix.length).split(/\s+/);
  const command = args.shift().toLowerCase();

	if (!client.commands.has(command)) return;

	try {
		client.commands.get(command).execute(message, args,client);
	}
	catch (error) {
		console.error(error);
		message.reply(config.error);
	}
});


