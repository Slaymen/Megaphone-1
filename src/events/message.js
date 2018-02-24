module.exports.run = async(client, message) => {
    const db = require('cookiesdb');
    if (message.author.bot || !message.guild) return;

    let fetchedDB = await db.fetchCookies(`customPrefix_${message.guild.id}`);
    let blockedDB = await db.fetchCookies(`block_${message.guild.id + message.author.id}`);

    let prefix = fetchedDB.text;

    if (!prefix) {
        prefix = client.config.prefix
    };

    const args = message.content.replace(prefix, '').split(/ +/); // If you type, !HELLO WORLD! it would return ['HELLO', 'WORLD!']
    const command = args.shift().toLowerCase();
    const level = client.permlevel(message);

    if (!message.content.startsWith(prefix)) return;

    const cmd = client.commands.get(command) || client.commands.find(c => c.help.aliases && c.help.aliases.includes(command));

    if (cmd) {
        if (blockedDB.text === 'blocked') {
            message.delete();
            message.reply('Sorry, but you are Blocked from Using me!');
            return;
        }

        if (cmd.isNSFW && !message.channel.nsfw) return message.reply('Trying to show the **KIDS** NSFW Pictures eh? Move to a NSFW Channel, you...');
    
        if (level < cmd.others.permlevel) return message.channel.send(`Sorry, but you cannot execute this Command!\nReason: You are not Authorized on using this Command, due to not having the Required Permission Level\n\nYour Permission Level: **${level} (${client.config.permlevels.find(l => l.level === level).name})**\nCommand Needs: **${cmd.others.permlevel} (${client.config.permlevels.find(l => l.level === cmd.others.permlevel).name})**`);

        message.author.permlevel = level;

        cmd.run(message, args, level);
    } else {
        return;
    }
};