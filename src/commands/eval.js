const Command = require(`${process.cwd()}/src/base/Command`);
const Discord = require('discord.js');

class Eval extends Command {
    constructor(client) {
        super(client, {
            name: 'eval',
			description: 'Evaluates JS Codes',
			details: 'Evaluates Javascript Codes, yet is really Dangerous, so keep it safe!',
			permlevel: 10,
			category: 'Owner Commands'
        })
    }

	async run(message, args) {
		if (!args.join(' ') || args.join(' ').length <= 0) return message.channel.send('Please supply a Code to Evaluate!');
		try {
			var embed = new Discord.RichEmbed()
				.setColor(0xfc6b6b)
				.addField(':inbox_tray: Input:', `\`\`\`js\n${args.join(' ')}\`\`\``)
				.addField(':outbox_tray: Output:', `\`\`\`js\n${await this.client.clean(eval(args.join(' ')))}\`\`\``)
			message.channel.send({ embed })
		} catch(e) {
			var embed = new Discord.RichEmbed()
				.setColor(0xfc6b6b)
				.setTitle(':x: Error!')
				.setDescription(`\`\`\`js\n${e}\`\`\``)
			message.channel.send({ embed })
		}
	}
};

module.exports = Eval;