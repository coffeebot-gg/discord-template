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

const DISCORD_IDS = () => {
    const ids = {
        client_id: "",
        client_secret: "",
    }
    if (process.env.NODE_ENV === 'prod') {
        ids.client_id = process.env.DISCORD_CLIENT_ID_PROD
        ids.client_secret = process.env.DISCORD_CLIENT_SECRET_PROD
    } else if (process.env.NODE_ENV === 'test') {
        ids.client_id = process.env.DISCORD_CLIENT_ID_TEST
        ids.client_secret = process.env.DISCORD_CLIENT_SECRET_TEST
    } else {
        ids.client_id = process.env.DISCORD_CLIENT_ID_DEV
        ids.client_secret = process.env.DISCORD_CLIENT_SECRET_DEV
    }

    return ids;
}

const COLORS = {
    green: '0x00AE86',
}


module.exports = {
    MONGO_URI,
    DISCORD_TOKEN,
    COLORS,
    DISCORD_IDS
}