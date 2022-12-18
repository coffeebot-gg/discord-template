require("dotenv").config();
const { promisify } = require("util");
const { glob } = require("glob");
const PG = promisify(glob);
const logger = require("../util/logger");

async function loadCommands(client, chalk) {
    const { readdirSync } = require("fs");

    let commandsArray = [];
    let developerArray = [];

    const commandsFolder = readdirSync("./commands");
    let commands = 0;
    let devCommands = 0;

    (await PG(`./commands/**/*.js`)).map(async (file) => {
        const commandFile = require(`.${file}`);

        // split into folders
        const split = file.split("/");
        const folder = split[2];
        
        client.commands.set(commandFile.data.name, commandFile);

        if (folder === 'Development' && (process.env.NODE_ENV === 'dev' || process.env.NODE_ENV === 'test')) {
            developerArray.push(commandFile.data.toJSON());
            devCommands++;
        } else {
            commandsArray.push(commandFile.data.toJSON());
            commands++;
        }
    });

    if(process.env.NODE_ENV === 'prod') {
        client.application.commands
        .set(commandsArray)
        .then(logger("client", chalk.italic.greenBright(`${commands} Global Command(s) Loaded`)));
    } else {
        const developerGuild = client.guilds.cache.get(process.env.DEV_GUILD);
        developerGuild.commands
            .set(developerArray)
            .then(logger("client", chalk.italic.magentaBright(`${devCommands} Developer Command(s) Loaded`)));
    }
}

function unloadCommands(client) {
    client.application.commands.set([]);
    const developerGuild = client.guilds.cache.get(process.env.DEV_GUILD);
    developerGuild.commands.set([]);
    return logger("client", "Unloaded Commands");
}

module.exports = { loadCommands, unloadCommands };
