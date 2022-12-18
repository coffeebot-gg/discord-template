require("dotenv").config();
const logger = require("../../util/logger.js");
const chalk = require("chalk");

const Cluster = require('discord-hybrid-sharding');


const { MONGO_URI, DISCORD_TOKEN } = require('../../config')
const token = DISCORD_TOKEN();

const envVariables = [
    "NODE_ENV",
    "DISCORD_TOKEN_PROD",
    "DISCORD_TOKEN_DEV",
    "MONGO_URI_PROD",
    "MONGO_URI_DEV"
]

// checks if all the env variables are set
const missingVariables = [];
envVariables.forEach(varName => {
    logger(`Checking ENV VARIABLE: ${varName}`);
    logger(`VARIABLE is : ${process.env[varName]}`);
    if (process.env[varName] === undefined) {
        missingVariables.push(varName);
    }
});
if (missingVariables.length !== 0) {
    const msg = `Missing ENV VARIABLES: ${missingVariables.join(", ")}`;
    if (process.env.NODE_ENV === "prod") {
        throw msg;
    } else {
        logger(msg);
    }
}



const server = async () => {
    require('../web')
    const manager = new Cluster.Manager(`${__dirname}/discord.js`, {
        totalShards: 'auto',
        shardsPerClusters: 2,
        mode: 'process',
        token,
    });

    manager.on('clusterCreate', cluster => logger('cluster', `Launched Cluster ${cluster.id}`));
    manager.spawn({ timeout: -1 });
}

const mongoose = require("../mongoose");

const startServer = async () => {
    // return MONGO_URI(); as a string
    const URI = MONGO_URI();
    

    await mongoose
        .connect(URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        .then(async () => {logger(chalk.green(`mongoose connected to [${URI}]`))})
        .catch(() => {console.warn(chalk.red(`mongoose failed to connected to [${URI}]`))});

    const mongo = mongoose.connection;

    if (mongo.states[mongo.readyState] === "disconnected") {
        logger(`State: ${mongo.states[mongo.readyState]} URI: ${URI}`)
        throw new Error("Something is wrong, DB connection not previously established and now is disconnected.");
    }

    server()
};


module.exports = {
    startServer,
    server
};