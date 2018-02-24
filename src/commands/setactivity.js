const Command = require(`${process.cwd()}/src/base/Command`);

class setActivity extends Command {
	constructor(client) {
		super(client, {
			name: 'setactivity',
			aliases: ['setgame'],
			description: 'Changes the bot\'s Status',
			usage: '<types: 0, 1, 2, 3, 4 or more> <name>',
			permlevel: 10,
			category: 'Owner Commands'
		})
	}

	async run(message, args) {
		let actNumber = parseInt(args[0]);
		if (actNumber >= 4) {
			return this.client.user.setPresence({ game: null });
		} else {
			if (actNumber === 1) {
				if (!args[1]) return message.channel.send('Please provide a Twitch Username!');
				this.client.user.setActivity(args.slice(2).join(' '), {
					url: `https://www.twitch.tv/${args[1]}`,
					type: 1
				});
			} else {
				this.client.user.setActivity(args.slice(1).join(' '), {
					type: actNumber
				});
			}
        };
	}
};

module.exports = setActivity;