const chalk = require('chalk')
const logger = require("../../util/logger.js");

module.exports = {
    name: 'messageCreate',
    async execute(message, client) {
        const string = `${chalk.blue(`[${message.guild.name}]`)} ${chalk.green(`[${message.author.username}#${message.author.discriminator}]`)} ${message.content}`
        logger('message', string)
    }
}