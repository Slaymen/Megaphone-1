const { Client, Collection } = require('discord.js'); // Require the Client Property and Collection
const fs = require('fs'); // Require the FS Package

class Megaphone extends Client { // Make a New Class called  that extends the Client Property
	constructor(options) {
		super(options);
		this.config = require('./config');
		this.commands = new Collection();
	}
};

const client = new Megaphone({ // Define client as
	fetchAllMembers: true
});

client.permlevel = (message) => {
	let permlevel = 0;
	
	if (message.member.hasPermission('MANAGE_MESSAGES')) permlevel = 1
	
	if (message.member.hasPermission('KICK_MEMBERS')) permlevel = 2;
	
	if (message.member.hasPermission('BAN_MEMBERS')) permlevel = 3;
	
	if (message.member.hasPermission('ADMINISTRATOR')) permlevel = 4;
	
	if (message.author.id === message.guild.ownerID) permlevel = 5;
	
	if (client.config.ownerID.includes(message.author.id)) permlevel = 10;
	
    return permlevel;
};

client.clean = async(text) => {
	if (text && text.constructor.name == "Promise")
	text = await text;
  	if (typeof evaled !== "string")
	text = require("util").inspect(text, {depth: 0});

	return text;
}

fs.readdir('./src/commands', (err, files) => {
	if (err) console.log(err);

	if (!files || files.length <= 0) throw Error('No Commands Found!');

	files.forEach(cmd => {
		if (cmd.split('.')[1] !== 'js') throw Error('Bot can\'t start with a Non-Javascript File!');

		const command = new(require(`./src/commands/${cmd}`))(client);

		client.commands.set(command.help.name, command);
		console.log('Loaded Command: ' + command.help.name);
	});
});

fs.readdir('./src/events', (err, files) => {
	if (err) console.log(err);

	if (!files || files.length <= 0) throw Error('No Events Found!');

	files.forEach(event => {
		if (event.split('.')[1] !== 'js') throw Error('Bot can\'t start with a Non-Javascript File!')

		const eventName = event.split('.')[0];
		const eventFunction = require(`./src/events/${event}`);

		client.on(eventName, (...args) => eventFunction.run(client, ...args));
		console.log('Loaded Event: ' + eventName);
	});
});

client.login(process.env.BOT_TOKEN);
