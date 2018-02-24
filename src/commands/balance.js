const Command = require(`${process.cwd()}/src/base/Command`);
const db = require('cookiesdb');
const { RichEmbed } = require('discord.js');

class Balance extends Command {
    constructor(client) {
        super(client, {
            name: 'balance',
            description: 'Check yours or other\'s Balance on the Bank!',
            usage: '[@user]',
            category: 'Economy'
        })
    }
    
    async run(message) {
        const user = message.mentions.users.first();
        let currency = await db.fetchCookies(`serverCurrency_${message.guild.id}`);

        if (!currency.text) {
            currency.text = ":dollar:"
        }

        if (user) {
            var userPoints = await db.fetchCookies(`userPoints_${message.guild.id + user.id}`);
            var embed = new RichEmbed()
                .setColor(0xffff84)
                .setTitle(':bank: The Bank')
                .setDescription(`__**${user.tag}**__ has ${currency.text} ${userPoints.value.toLocaleString()}`)
            message.channel.send({ embed })
        } else {
            var userPoints = await db.fetchCookies(`userPoints_${message.guild.id + message.author.id}`);
            var embed = new RichEmbed()
                .setColor(0xffff84)
                .setTitle(':bank: The Bank')
                .setDescription(`You have ${currency.text} ${userPoints.value.toLocaleString()}`)
            message.channel.send({ embed })
        };
    }
};

module.exports = Balance;