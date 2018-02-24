const Command = require(`${process.cwd()}/src/base/Command`);
const { RichEmbed } = require('discord.js');
const db = require('cookiesdb');

class Help extends Command {
    constructor(client) {
        super(client, {
            name: 'help',
            aliases: ['h'],
            description: 'Help Command',
            details: 'Puts Commands in Category and Filter By Permission Level. Also used for Checking the Details of a Command',
            usage: '[command name]',
            category: 'Support'
        })
    }

    async run(message, args, level) {
        let fetchedDB = await db.fetchCookies(`customPrefix_${message.guild.id}`);
        if (!fetchedDB.text) {
            fetchedDB.text = this.client.config.prefix
        };

        if (!args[0]) {
            const filteredCommands = this.client.commands.filter(cmd => cmd.others.permlevel <= level && !cmd.others.isHidden);
            let output = `Here's a List of All the Commands that are Available for Your Permission Level! To find out your Permission Level, do \`${fetchedDB.text}mylevel\`\nFor more Information about a Command, do \`${fetchedDB.text}help [command Name]\``;
            let sorted = filteredCommands.array().sort((p, c) => p.others.category > c.others.category ? 1 : p.help.name > c.help.name && p.others.category === c.others.category ? 1 : -1);
            let currentCategory = '';
            
            sorted.forEach(c => {
                let cat = c.others.category;

                if (currentCategory !== cat) {
                    output += `\n\n__**${cat}**__\n`;
                    currentCategory = cat;
                }
                output += `**${fetchedDB.text}${c.help.name}**: ${c.help.description}\n`;
            })
            message.reply('Check your DMs!').then(() => {
                message.author.send(output + '\n\nCheck our website at: https://megaphone.glitch.me/')
            })
        } else {
            const command = this.client.commands.get(args[0]) || this.client.commands.find(cmd => cmd.help.aliases && cmd.help.aliases.includes(args[0]));

            if (!command) return;
            if (level < command.others.permlevel) return;

            let aliases = command.help.aliases.join(', ');

            if (aliases.length === 0) {
                aliases = 'No Aliases Set'
            }

            var embed = new RichEmbed()
                .setColor(0xffff84)
                .addField('Command Aliases', aliases, true)
                .addField('Command Details', command.help.details, true)
                .addField('Command Usage', `${fetchedDB.text}${command.help.name} ${command.help.usage}`)
                .addField('Command Category', command.others.category, true)
            message.channel.send({ embed })
        }
    }
};

module.exports = Help;