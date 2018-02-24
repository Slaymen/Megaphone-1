const Command = require(`${process.cwd()}/src/base/Command`);
const db = require('cookiesdb');
const { RichEmbed } = require('discord.js');
const hourly = [];

class Hourly extends Command {
    constructor(client) {
        super(client, {
            name: 'hourly',
            description: 'Gives you Points Hourly',
            category: 'Economy'
        })
    }

    async run(message) {
        const fetchedEconomy = await db.fetchCookies(`userPoints_${message.guild.id + message.author.id}`);
        let currency = await db.fetchCookies(`serverCurrency_${message.guild.id}`);

        if (!currency.text) {
            currency.text = ":dollar:"
        };

        if (hourly.includes(message.guild.id + message.author.id)) return message.channel.send('You\'ve already collected your Hourly Points!');

        var embed = new RichEmbed()
            .setColor(0xffff84)
            .setTitle(':bank: The Bank')
            .setDescription(`You have been given ${currency.text} 10`)
        message.channel.send({ embed })
        db.updateCookies(`userPoints_${message.guild.id + message.author.id}`, parseInt(10)).then(() => {
            hourly.push(message.guild.id + message.author.id)
        })
        setTimeout(function() {
            var index = hourly.indexOf(message.guild.id + message.author.id);
            if (index > -1) {
                hourly.splice(message.guild.id + message.author.id)
            }
        }, 3600000);
    }
};

module.exports = Hourly;