require("dotenv").config();
require( 'console-stamp' )( console );
const chalk = require("chalk");




const {MONGO_URI} = require('../../config')


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
    console.log(`Checking ENV VARIABLE: ${varName}`);
    console.log(`VARIABLE is : ${process.env[varName]}`);
    if (process.env[varName] === undefined) {
        missingVariables.push(varName);
    }
});
if (missingVariables.length !== 0) {
    const msg = `Missing ENV VARIABLES: ${missingVariables.join(", ")}`;
    if (process.env.NODE_ENV === "prod") {
        throw msg;
    } else {
        console.log(msg);
    }
}



const server = async () => {
    require("./discord");
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
        .then(async () => {console.log(chalk.green(`mongoose connected to [${URI}]`))})
        .catch(() => {console.warn(chalk.red(`mongoose failed to connected to [${URI}]`))});

    const mongo = mongoose.connection;

    if (mongo.states[mongo.readyState] === "disconnected") {
        console.log(`State: ${mongo.states[mongo.readyState]} URI: ${URI}`)
        throw new Error("Something is wrong, DB connection not previously established and now is disconnected.");
    }

    server()
};


module.exports = {
    startServer,
    server
};