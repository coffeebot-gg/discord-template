const chalk = require("chalk");

const logger = (type, message) => {
    const timestamp = new Date().toLocaleString();

    // if only one argument is passed, assume it is the message
    if (message === undefined) {
        message = type;
        type = "log";
    }

    // make type lowercase and add chalk for "error", "warn", "client" and "guild"
    type = type.toLowerCase();
    switch (type) {
        case "error":
            type = chalk.bgRed.bold(" ERROR ");
            break;
        case "warn":
            type = chalk.bgYellow.bold(" WARN ");
            break;
        case "client":
            type = chalk.bgBlue.bold(" CLIENT ");
            break;
        case "guild":
            type = chalk.bgGreen.bold(" GUILD ");
            break;
        default:
            type = chalk.bgWhite.bold(type ? ` ${type.toUpperCase()} ` : " LOG ");
            break;
    }

    const log = `[${timestamp}] [${type}] ${message}`;
    
    switch (type) {
        case "warn":
            console.warn(log);
            break;
        case "error":
            console.error(log);
            break;
        default:
            console.log(log);
            break;
    }
}

module.exports = logger;