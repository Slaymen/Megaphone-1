const Command = require(`${process.cwd()}/src/base/Command`);

class Purge extends Command {
    constructor(client) {
        super(client, {
            name: 'purge',
            aliases: ['clear', 'prune'],
            description: 'Deletes some Messages!',
            usage: '<amount of messages, more than 1 less than 101>',
            permlevel: 1,
            category: 'Moderation'
        })
    }

    async run(message, args) {
        var amount = parseInt(args[0]);

        if (isNaN(amount) || !amount || amount <= 1 || amount > 100) return message.channel.send('Please Choose messages to Delete from, `2 - 100`');
        message.delete();
        let fetched = await message.channel.fetchMessages({ limit: amount });

        message.channel.bulkDelete(fetched, true).then(msg => {
            message.channel.send(`Deleted ${msg.size} Messages!`).then(m => {
                m.delete(3000)
            });
        });
    }
};

module.exports = Purge;