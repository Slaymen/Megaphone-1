const Command = require(`${process.cwd()}/src/base/Command`);
const timedOut = [];
const db = require('cookiesdb');

class Work extends Command {
    constructor(client) {
        super(client, {
            name: 'work',
            description: 'Work for Points!',
            category: 'Economy'
        })
    }

    async run(message) {
        let prize = Math.floor(Math.random() * 50);
        let works = [
            "You helped the Cops fight a Criminal!, you got",
            "You helped an old lady cross the Street, she gave you",
            "You helped a User Code! They gave you",
            "You helped Juan farm, he gave you",
            `You helped me ( ${this.client.user.tag} ) finish my Homework! I will now give you`
        ];

        if (timedOut.includes(message.guild.id + message.author.id)) return message.channel.send('Sorry, you finished your work! Please try again later');

        let worked = await db.updateCookies(`userPoints_${message.guild.id + message.author.id}`, prize);
        message.channel.send(`${works[Math.floor(Math.random() * works.length)]} ${prize.toLocaleString()} Points!`);
        timedOut.push(message.guild.id + message.author.id);
        
        setTimeout(function() {
            var index = timedOut.indexOf(message.guild.id + message.author.id);
            if (index > -1) {
                timedOut.splice(message.guild.id + message.author.id);
            }
        }, 3600000)
    }
};

module.exports = Work;