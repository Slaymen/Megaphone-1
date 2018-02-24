const Command = require(`${process.cwd()}/src/base/Command`);
const { RichEmbed } = require('discord.js');

class Discrim extends Command {
    constructor(client) {
        super(client, {
            name: 'discrim',
            description: 'Search Users who has the Same Discriminator as you!',
            usage: '<discriminator to find>',
            category: 'Information'
        })
    }
    
    async run(message, args) {
        const flag = args[0];
        const discrim = args[1];

        if (!flag || flag !== '--guild' && flag !== '--global') return message.channel.send('Please choose on either a Global Flag ( `--global` ), or Guild Flag ( `--guild` )');
        
        if (flag === '--guild') {
            if (isNaN(discrim) || discrim.length < 4 ||discrim < parseInt('0001') || discrim > parseInt('9999')) return message.channel.send('Please search a Valid Discriminator!');

                let sameDiscrim = message.guild.members.filter(m => m.user.discriminator === discrim);
                let output = `Here\'s a List of all the User\'s on this Guild with the Discriminator: **${discrim}**\n\n${sameDiscrim.map(u => `**${u.user.tag}**`).join('\n')}`
                if (sameDiscrim.size === 0) {
                    output = 'No Users!'
            };

            var embed = new RichEmbed()
                .setAuthor(message.author.username, message.author.displayAvatarURL)
                .setColor(0xffff84)
                .setDescription(output)
            message.channel.send({ embed })
        } else {
            if (isNaN(discrim) || discrim.length < 4 ||discrim < parseInt('0001') || discrim > parseInt('9999')) return message.channel.send('Please search a Valid Discriminator!');

            let sameDiscrim = this.client.users.filter(u => u.discriminator === discrim);
            let output = `Here\'s a List of all the User\'s with the Discriminator: **${discrim}**\n\n${sameDiscrim.map(u => `**${u.tag}**`).join('\n')}`
            if (sameDiscrim.size === 0) {
                output = 'No Users!'
            };

            var embed = new RichEmbed()
                .setAuthor(message.author.username, message.author.displayAvatarURL)
                .setColor(0xffff84)
                .setDescription(output)
            message.channel.send({ embed })
        };
    }
};

module.exports = Discrim;