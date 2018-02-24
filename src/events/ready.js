const colors = require('colors');

module.exports.run = (client) => {
    console.log(`
${colors.cyan('====================================================')}
- ${colors.blue('Client Username:')} ${colors.green(client.user.tag)}
- ${colors.blue('Client ID:')} ${colors.cyan(client.user.id)}
- ${colors.blue('Bot Default Prefix:')} ${colors.yellow(client.config.prefix)}
- ${colors.blue('Guilds In:')} ${colors.red(client.guilds.size.toLocaleString())} ${colors.blue('Guilds')}
- ${colors.blue('Channels:')} ${colors.yellow(client.channels.size.toLocaleString())} ${colors.blue('Channels')}
- ${colors.blue('Users:')} ${colors.magenta(client.users.size.toLocaleString())} ${colors.blue('Users Connected!')}
${colors.cyan('====================================================')}
`)
};