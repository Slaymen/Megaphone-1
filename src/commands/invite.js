const Command = require(`${process.cwd()}/src/base/Command`);
const { RichEmbed } = require('discord.js');
const db = require('cookiesdb');

class Invite extends Command {
    constructor(client) {
        super(client, {
            name: 'invite',
            aliases: ['inv'],
            description: 'Sends the Bot Invite',
            details: 'Sends the Bot\'s Invite and Server Invite',
            usage: '[bot/server]',
            category: 'Information'
        })
    }

    async run(message, args) {
        let fetchedDB = await db.fetchCookies(`customPrefix_${message.guild.id}`);
        if (!fetchedDB.text) {
            fetchedDB.text = this.client.config.prefix
        };

        if (!args[0]) {
            message.reply(`You can also use check the Bot Only Invite by Doing: \`${fetchedDB.text}invite bot\`\nor, Server only, by doing \`${fetchedDB.text}invite server\``).then(() => message.author.send(`Invite Me to your Server!\n => https://discordapp.com/api/oauth2/authorize?client_id=${this.client.user.id}&permissions=8&scope=bot\n\nOur Support Server\n => https://discord.gg/TMtG63f`))
        } else {
            if (args[0].toLowerCase() !== 'bot' && args[0].toLowerCase() !== 'server') return message.channel.send('Please Choose on wether you want the `server` or `bot` Invites.');
    
            if (args[0].toLowerCase() === 'bot') return message.channel.send(`Invite me to your Server!\n => https://discordapp.com/api/oauth2/authorize?client_id=${this.client.user.id}&permissions=8&scope=bot`);
            if (args[0].toLowerCase() === 'server') return message.channel.send('Here\'s the Invite to the Support Server!\n => https://discord.gg/TMtG63f')
        }
    }
};

module.exports = Invite;