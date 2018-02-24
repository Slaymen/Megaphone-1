const db = require('cookiesdb');

module.exports.run = async(client, member) => {
    let status = await db.fetchCookies(`statusWelcome_${member.guild.id}`);
    let channel = await db.fetchCookies(`welcomeID_${member.guild.id}`);
    let message = await db.fetchCookies(`welcomeMessage_${member.guild.id}`);

    if (!status.text || status.text === 'disable') return;
    if (!channel.text || channel.text === 'undefined' || channel.text === '') return;
    if (!message.text || message.text === 'undefined' || message.text === '') return;

    let messages = message.text.replace('{user}', member.user).replace('{server}', member.guild.name).replace('{usertag}', member.user.tag).replace('{username}', member.user.username);

    client.channels.get(channel.text).send(messages);
};