require('dotenv').config();


const MONGO_URI = () => {
    if (process.env.NODE_ENV === 'prod') {
        return process.env.MONGO_URI_PROD
    } else if (process.env.NODE_ENV === 'test') {
        return process.env.MONGO_URI_TEST
    } else {
        return process.env.MONGO_URI_DEV
    }
}

const DISCORD_TOKEN = () => {
    if (process.env.NODE_ENV === 'prod') {
        return process.env.DISCORD_TOKEN_PROD
    } else if (process.env.NODE_ENV === 'test') {
        return process.env.DISCORD_TOKEN_TEST
    } else {
        return process.env.DISCORD_TOKEN_DEV
    }
}


module.exports = {
    MONGO_URI,
    DISCORD_TOKEN
}