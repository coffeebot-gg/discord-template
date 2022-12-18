require('dotenv').config()
const { ActivityType } = require("discord.js");
const chalk = require("chalk");
const { loadCommands } = require("../../handlers/command.handler");
const logger = require("../../util/logger");

module.exports = {
    name: "ready",
    once: true,
    async execute(client) {
        logger('client', chalk.italic.bold.yellowBright(`Client logged in as ${client.user.tag}.`));

        presence({
            type: ActivityType.Streaming, 
            message: 'Some awesome stream title.',
            url: 'https://twitch.tv/CoffeeBottv',
            presence: 'online'
        }, client);


        // load all events and commands
        // loadEvents(client, chalk);
        loadCommands(client, chalk);
    },
};



const activePresence = new Map();
const presence = (status, client) => {
    /**
     * ActivityType.PLAYING
     * ActivityType.WATCHING
     * ActivityType.LISTENING
     * ActivityType.STREAMING
     * ActivityType.Competing
     */

    // set interval to update presence every 1hour 40 minutes
    client.user.setPresence({
        activities: [{
            name: status?.message || '/help',
            type: status?.type || ActivityType.Playing,
            url: status?.url || 'https://twitch.tv/CoffeeBottv'
        }],
        status: status?.presence || 'idle',
    });


    // check if activePresence is empty
    if (activePresence.size === 0) {
        // add new presence to activePresence with timeout to reestablish presence
        activePresence.set('1', setTimeout(() => {
        presence(status, client);
        } , 1000*60*60*1.5));
    } else {
        // delete old presence from activePresence
        activePresence.delete('1');
        presence(status, client)
    }

}