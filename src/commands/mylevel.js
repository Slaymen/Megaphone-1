const Command = require(`${process.cwd()}/src/base/Command`);

class MyLevel extends Command {
    constructor(client) {
        super(client, {
            name: 'mylevel',
            description: 'Shows your Permission Level!',
            category: 'Information'
        })
    }

    async run(message, args, level) {
        message.channel.send(`Here is your Permission Level:\n**${level} (${this.client.config.permlevels.find(l => l.level === level).name})**`);
    }
};

module.exports = MyLevel;