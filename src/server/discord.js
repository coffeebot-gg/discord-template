require("dotenv").config({ path: "../../" });
const chalk = require("chalk");
const { Client, Collection, Partials, GatewayIntentBits } = require("discord.js");
const { DISCORD_TOKEN } = require("../../config");

const { loadEvents } = require("../../handlers/event.handler.js");

const client = new Client({
    intents: [
        GatewayIntentBits.DirectMessageReactions,
        GatewayIntentBits.DirectMessageTyping,
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.GuildBans,
        GatewayIntentBits.GuildEmojisAndStickers,
        GatewayIntentBits.GuildIntegrations,
        GatewayIntentBits.GuildInvites,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessageReactions,
        GatewayIntentBits.GuildMessageTyping,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildPresences,
        GatewayIntentBits.GuildScheduledEvents,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.GuildWebhooks,
        GatewayIntentBits.Guilds,
        GatewayIntentBits.MessageContent,
    ],
    partials: [
        Partials.Channel,
        Partials.GuildMember,
        Partials.GuildScheduledEvent,
        Partials.Message,
        Partials.Reaction,
        Partials.ThreadMember,
        Partials.User,
    ],
    fetchAllMembers: true
});

client.config = require("../../util/DiscordConfig.json");
client.commands = new Collection();
// components
client.components = new Collection();


// just a method of spitting out error messages to a Discord channel. add webhookURL to your .env file and use the Discord intergration to get the URL
if (process.env.webhookURL) {require("../../util/crashReportToDiscord")(client)}


const token = DISCORD_TOKEN();

client
    .login(token)
    .then(() => {
        loadEvents(client, chalk);
    })
    .catch((err) => console.log(err));

module.exports = client;