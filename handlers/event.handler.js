const { Events } = require("../validations/events.validation.cjs");
const { readdirSync } = require("fs");
const logger = require("../util/logger");

function loadEvents(client, chalk) {
    client.removeAllListeners();
    const folders = readdirSync("./Events");
    let count = 0;
    for (const folder of folders) {
        const files =
            readdirSync(`./events/${folder}`)
                .filter((file) => file.endsWith(".js"));

        for (const file of files) {
            const event = require(`../events/${folder}/${file}`);
            count++;

            if(!Events.includes(event.name) || !event.name) {
                logger('client', `event ${file} dont have a valid name`);
                return;
            }

            if (event.rest) {
                if (event.once)
                    client.rest.once(event.name, (...args) =>
                        event.execute(...args, client, chalk)
                    );
                else
                    client.rest.on(event.name, (...args) =>
                        event.execute(...args, client, chalk)
                    );
            } else {
                if (event.once)
                    client.once(event.name, (...args) => event.execute(...args, client, chalk))
                else client.on(event.name, (...args) => event.execute(...args, client, chalk))
            }

            continue;
        }
    }
    return logger('client', chalk.italic.blue(count + " Events Loaded"));
}

function unloadEvents(client) {
    return logger(`Unloaded Events`);
}
module.exports = { loadEvents, unloadEvents };
