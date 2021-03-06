const Command = require(`${process.cwd()}/src/base/Command`);
const { RichEmbed } = require('discord.js');
const db = require('cookiesdb');

class Kick extends Command {
    constructor(client) {
        super(client, {
            name: 'kick',
            description: 'Kicks A User',
            usage: '<@user> <reason>',
            permlevel: 2,
            category: 'Moderation'
        })
    }
    
    async run(message, args) {
        let modlog = await db.fetchCookies(`modlog_${message.guild.id}`);
        let foundChannel = message.guild.channels.filter(c => c.type === 'text').find(d => d.permissionsFor(message.guild.me).has("SEND_MESSAGES"));
        let modlog_id = modlog.text;

        if (!modlog_id) {
            modlog_id = foundChannel.id
        };

        const user = message.mentions.users.first();
        const reason = args.slice(1).join(' ');
        if (!user || user === message.author || user === this.client.user) return message.channel.send('Please mention a User, but not You nor Me!');
        if (!reason) return message.channel.send('You cannot kick a User without reasons!');

        const msg = await message.channel.send('*Kicking...*');
        let output = `**User Got Kicked! | Goodbye! :wave:**\nUser Kicked: **${user.tag}**\nReason: **${reason}**\nResponsible Moderator: **${message.author.tag}**`;

        msg.edit(`User Kicked! Check ${message.guild.channels.get(modlog_id)} for More Information!`).then(() => {
            try {
                message.guild.member(user).kick();
                message.guild.channels.get(modlog_id).send(output)             
            } catch(e) {
                console.log(e)
            }
        })
    }
};

module.exports = Kick;