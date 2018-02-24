const Command = require(`${process.cwd()}/src/base/Command`);
const db = require('cookiesdb');
const { RichEmbed } = require('discord.js');

class Set extends Command {
    constructor(client) {
        super(client, {
            name: 'set',
            description: 'Set a key',
            details: 'Set a Specified Key for the Guild',
            usage: '<key> <args of key>',
            permlevel: 4,
            category: 'Server'
        })
    }

    async run(message, args) {
        const keys = ['prefix', 'blacklist', 'modlog', 'currency', 'welcome', 'goodbye'];
        let fetchedDB = await db.fetchCookies(`customPrefix_${message.guild.id}`);
        let statusWelcome = await db.fetchCookies(`statusWelcome_${message.guild.id}`);
        if (!fetchedDB.text) {
            fetchedDB.text = this.client.config.prefix
        };
        let currency = await db.fetchCookies(`serverCurrency_${message.guild.id}`);

        if (!currency.text) {
            currency.text = ":dollar:"
        };

        const embed = new RichEmbed()
            .setColor(0xffff84)
            .setTitle('Please Choose Below a Key to Set!')
            .setDescription(`\nTake Note: ***ALL OF THESE ARE AUTO ENABLED, YOU CAN'T DISABLE IT!***`)
            .addField('Prefix', `Current: **${fetchedDB.text}**`)
            .addField('Blacklist', 'Blocks Users from Using the Bot in the Current Guild!')
            .addField('Modlog', 'Set the mod-log Channel for the Guild!')
            .addField('Currency', `Sets the Server Currency\nCurrent: ${currency.text}`)
            .addField('welcome', 'Sets the Welcome Messages for the Server')

        if (!args[0]) {
            return message.channel.send({ embed });
        } else {
            if (!keys.includes(args[0].toLowerCase())) return message.channel.send({ embed });
            if (args[0].toLowerCase() === 'prefix') {
                if (!args[1]) {
                    args[1] = this.client.config.prefix
                };

                await db.updateText(`customPrefix_${message.guild.id}`, args[1]);
                message.channel.send(`Changed Guild Prefix to: **${args[1]}**`)
            };
            if (args[0].toLowerCase() === 'blacklist') {
                let user = message.mentions.users.first();
                if (!args[1] || args[1] !== 'remove' && !user || user === message.author || user === this.client.user) return message.channel.send(`Insufficient Parameters!\nPlease do \`${fetchedDB.text}set blacklist remove <@user>\` to Unblock a Blocked User!\nOr, do \`${fetchedDB.text}set blacklist <@user>\` to block a User!`)
                let blockedDB = await db.fetchCookies(`block_${message.guild.id + user.id}`);
                if (args[1] === 'remove') {
                    if (blockedDB.text !== 'blocked') {
                        return message.channel.send('This user is Not Blocked!');
                    } else {
                        await db.updateText(`block_${message.guild.id + user.id}`, 'unblocked');
                        message.channel.send(`Successfully Unblocked **${user.tag}**`).then(() => user.send(`__**${message.author.tag}**__ has Unblocked you! You can now use Me (${this.client.user.tag}) :clap: Thank him Later!`));
                    }
                } else {
                    if (blockedDB.text === 'blocked') return message.channel.send('User is already Blocked!');
                    await db.updateText(`block_${message.guild.id + user.id}`, 'blocked');
    
                    message.channel.send(`Successfully Blocked **${user.tag}**!`).then(() => user.send(`__**${message.author.tag}**__ has Blocked you from Using Me (${this.client.user.tag}) on __**${message.guild.name}**__`));
                };
            };
            if (args[0].toLowerCase() === 'modlog') {
                let noChannel = message.guild.channels.filter(c => c.type === 'text').find(c => c.permissionsFor(message.guild.me).has("SEND_MESSAGES"));
                let fetchedChannel = await db.fetchCookies(`modlog_${message.guild.id}`);
                if (!fetchedChannel.text) {
                    fetchedChannel.text = noChannel.id
                    db.updateText(`modlog_${message.guild.id}`, fetchedChannel.text);
                };

                let channel = message.mentions.channels.first();

                if (!channel) {
                    await db.updateText(`modlog_${message.guild.id}`, noChannel.id);
                    message.channel.send(`Added Default **mod-log** Channel, name: ` + noChannel);
                    return;
                } else {
                    await db.updateText(`modlog_${message.guild.id}`, channel.id);
                    message.channel.send(`The new mod-log channel is now, ${channel}`);
                };
            };
            if (args[0].toLowerCase() === 'currency') {
                if (!args[1]) {
                    args[1] = ':dollar:'
                    await db.updateText(`serverCurrency_${message.guild.id}`, args[1]);
                    
                    message.channel.send('Changed Server Currency to: :dollar:');
                } else {
                    await db.updateText(`serverCurrency_${message.guild.id}`, args[1])
                    message.channel.send(`Changed Server Currency to ${args[1]} !`)
                };
            };
            if (args[0].toLowerCase() === 'welcome') {
                var EorD = args[1].toLowerCase();
                var channel = message.mentions.channels.first();
                var welcomeMessage = args.slice(3).join(' ');

                if (EorD !== 'enable' && EorD !== 'disable') {
                    return message.channel.send('Wrong Format! `<args[1]:string>` must be either `enable` or `disable`');
                } else {
                    await db.updateText(`statusWelcome_${message.guild.id}`, EorD);
                };
                if (!channel || channel === 'undefined') {
                    return message.channel.send('`<channel:mention>` not Found! Try mentioning a Channel');
                } else {
                    await db.updateText(`welcomeID_${message.guild.id}`, channel.id);
                };
                if (!welcomeMessage || welcomeMessage === 'undefined') {
                    return message.channel.send(`\`<welcomeMessage:string>\` Returned Undefined! Try adding a Message!\n\n**Formats**:\n\n**{user}** = ${message.author}\n**{server}** = ${message.guild.name}\n**{usertag}** = ${message.author.tag}\n**{username}** = ${message.author.username}`);
                } else {
                    await db.updateText(`welcomeMessage_${message.guild.id}`, welcomeMessage);
                    message.channel.send(`Successfully added the Information!\n\n**Message**: \`\`\`${args.slice(3).join(' ')}\`\`\`\n**Status**: ${EorD}\n**Channel**: ${channel}`)
                };
            };
            if (args[0].toLowerCase() === 'goodbye') {
                var EorD = args[1].toLowerCase();
                var channel = message.mentions.channels.first();
                var goodbyeMessage = args.slice(3).join(' ');

                if (EorD !== 'enable' && EorD !== 'disable') {
                    return message.channel.send('Wrong Format! `<args[1]:string>` must be either `enable` or `disable`');
                } else {
                    await db.updateText(`statusGoodbye_${message.guild.id}`, EorD);
                };
                if (!channel || channel === 'undefined') {
                    return message.channel.send('`<channel:mention>` not Found! Try mentioning a Channel');
                } else {
                    await db.updateText(`welcomeID2_${message.guild.id}`, channel.id);
                };
                if (!goodbyeMessage || goodbyeMessage === 'undefined') {
                    return message.channel.send(`\`<welcomeMessage:string>\` Returned Undefined! Try adding a Message!\n\n**Formats**:\n\n\n**{server}** = ${message.guild.name}\n**{usertag}** = ${message.author.tag}\n**{username}** = ${message.author.username}`);
                } else {
                    await db.updateText(`goodbyeMessage_${message.guild.id}`, goodbyeMessage);
                    message.channel.send(`Successfully added the Information!\n\n**Message**: \`\`\`${goodbyeMessage}\`\`\`\n**Status**: ${EorD}\n**Channel**: ${channel}`)
                };
            };
        };
    }
};

module.exports = Set;