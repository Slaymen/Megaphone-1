const Command = require(`${process.cwd()}/src/base/Command`);

class Shutdown extends Command {
    constructor(client) {
        super(client, {
            name: 'shutdown',
            aliases: ['reboot'],
            description: 'Shuts down the Bot',
            permlevel: 10,
            category: 'Owner Commands'
        })
    }

    async run(message) {
        try {
            await message.channel.send('*Shutting Down...*');
            await this.client.destroy();
            await process.exit();
        } catch(e) {
            console.log(e)
        };
    }
};

module.exports = Shutdown;