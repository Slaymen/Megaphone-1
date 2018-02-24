const Command = require(`${process.cwd()}/src/base/Command`);
const { RichEmbed } = require('discord.js');

class Ping extends Command {
    constructor(client) {
        super(client, {
            name: 'ping',
            aliases: ['pong'],
            description: 'Pong!',
            details: 'Gives you the API Latency of Discord!',
        })
    }

    async run(message) {
        const msg = await message.channel.send('*Pinging...*');
        var embed = new RichEmbed()
            .setColor(0xffff84)
            .setDescription(`:stopwatch: ${msg.createdTimestamp - message.createdTimestamp}ms\n\n:heartbeat: ${Math.round(this.client.ping)}ms`)
        msg.edit({ embed });

    }
};

module.exports = Ping;