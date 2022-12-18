const chalk = require('chalk')

module.exports = {
    name: 'messageCreate',
    async execute(message, client) {
        
        console.log(
            chalk.blue(`[${message.guild.name}]`),
            chalk.green(`[${message.author.username}#${message.author.discriminator}]`),
            message.content
        )
    }
}