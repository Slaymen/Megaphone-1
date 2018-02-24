const Command = require(`${process.cwd()}/src/base/Command`);
const Discord = require('discord.js');
const moment = require('moment')
require('moment-duration-format');
const db = require('cookiesdb');

class Stats extends Command {
    constructor(client) {
        super(client, {
            name: 'stats',
            aliases: ['info'],
            description: 'Sends the bot\'s Info',
            details: 'Gives you the Bot\'s Statistics',
            category: 'Information'
        })
    }

    async run(message) {
        let fetchedDB = await db.fetchCookies(`customPrefix_${message.guild.id}`);
        if (!fetchedDB.text) {
            fetchedDB.text = this.client.config.prefix
        };
        
        var embed = new Discord.RichEmbed()
            .setColor(0xffff84)
            .addField('Bot Uptime :clock:', moment.duration(this.client.uptime).format("D [Days]. H [Hours]. m [Minutes], s [Seconds]"), true)
            .addField('Discord.JS Version :desktop:', 'v' + Discord.version, true)
            .addField('NodeJS Version :desktop:', process.version, true)
            .addField('Total Users :busts_in_silhouette:', this.client.users.size.toLocaleString() + ' Users!', true)
            .addField('Channels :dividers:', this.client.channels.size.toLocaleString() + ' Channels!', true)
            .addField('Servers :family_mwgb:', this.client.guilds.size.toLocaleString() + ' Guilds!', true)
            .addField('Total Commands :regional_indicator_c:', this.client.commands.array().length + ' Commands!', true)
            .addField('Current Server Prefix :exclamation:', 'It is: ' + fetchedDB.text, true)
            .addField('Bots :robot:', this.client.users.filter(m => m.bot).size.toLocaleString() + ' Bots!', true)
            .addField('Humans :man:', this.client.users.filter(m => !m.bot).size + ' Humans!', true)
            .addField('Online <:online:411817941676589079>', this.client.users.filter(m => m.presence.status !== 'offline').size + ' Online Users!', true)
            .addField('Offline <:offline:411817923733094401>', this.client.users.filter(m => m.presence.status === 'offline').size + ' Offline Users!', true)
        message.channel.send({ embed })
    }
};

module.exports = Stats;