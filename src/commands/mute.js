const Command = require(`${process.cwd()}/src/base/Command`);
const db = require('cookiesdb');

class Mute extends Command {
    constructor(client) {
        super(client, {
            name: 'mute',
            description: 'Mute Users',
            usage: '<@user> <reason>',
            permlevel: 1,
            category: 'Moderation'
        })
    }

    async run(message, args) {
        const user = message.mentions.users.first();
        const reason = args.slice(1).join(' ');

        let modlog = await db.fetchCookies(`modlog_${message.guild.id}`);
        let foundChannel = message.guild.channels.filter(c => c.type === 'text').find(d => d.permissionsFor(message.guild.me).has("SEND_MESSAGES"));
        let modlog_id = modlog.text;

        if (!modlog_id) {
            modlog_id = foundChannel.id
        };
        if (!user || user === message.author || user === this.client.user) return message.channel.send('Please mention a User, but not You nor Me!');
        if (!reason) return message.channel.send('You cannot mute a User without reasons!');

        const msg = await message.channel.send('*Muting...*');
        let output = `**User Got Muted! | Shhh....! :wave:**\nUser Muted: **${user.tag}**\nReason: **${reason}**\nResponsible Moderator: **${message.author.tag}**`;

        msg.edit(`User Muted! Check ${message.guild.channels.get(modlog_id)} for More Information!`).then(() => {
            message.guild.channels.forEach(c => {
                c.overwritePermissions(user.id, { SEND_MESSAGES: false }, reason);
            });
        })
        message.guild.channels.get(modlog_id).send(output)
    }
};

module.exports = Mute;