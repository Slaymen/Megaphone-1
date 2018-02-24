const Command = require(`${process.cwd()}/src/base/Command`);
const db = require('cookiesdb');
const timedOut = [];

class EditPoints extends Command {
    constructor(client) {
        super(client, {
            name: 'editpoints',
            aliases: ['edit'],
            description: 'Edit Points of users!',
            usage: '<@user> <add/remove> <amount>',
            permlevel: 5,
            category: 'Economy'
        })
    }

    async run(message, args) {
        const user = message.mentions.users.first();
        const amount = parseInt(args[2]);

        if (timedOut.includes(message.guild.id + message.author.id)) return message.channel.send('Your ID is still Timed Out! Please wait for it to go off.');

        if (!user || user === this.client.user) return message.channel.send('Please mention a User! Not me.');
        if (!args[1] || args[1] !== 'add' && args[1] !== 'remove') return message.channel.send('Please choose on either `add/remove`');

        if (args[1] === 'add') {
            if (!amount || amount < 20 || amount > 1000000) return message.channel.send('Please Choose a Number to add Between `20 - 1,000,000`');
            await db.updateCookies(`userPoints_${message.guild.id + user.id}`, amount);

            message.channel.send(`Given __${user.tag}__ ${amount.toLocaleString()} Points`)
            timedOut.push(message.guild.id + message.author.id);
        };
        if (args[1] === 'remove') {
            if (!amount || amount < 20 || amount > 1000000) return message.channel.send('Please Choose a Number to add Between `20 - 1,000,000`');
            await db.updateCookies(`userPoints_${message.guild.id + user.id}`, -amount);

            message.channel.send(`Removed ${amount.toLocaleString()} Points from __${user.tag}__`)
            timedOut.push(message.guild.id + message.author.id);
        };
        setTimeout(function() {
            var index = timedOut.indexOf(message.guild.id + message.author.id);
            if (index > -1) {
                timedOut.splice(message.guild.id + message.author.id);
            };
        }, 3600000);
    }
};

module.exports = EditPoints;