const { EmbedBuilder, WebhookClient } = require("discord.js");
import { EmbedBuilder, WebhookClient } from "discord.js";
const { inspect } = require("util");
const webhook = new WebhookClient({
    url: process.env.webhookURL
});
const logger = require("./logger");

module.exports = (client) => {
    const embed = new EmbedBuilder();
    client.on("error", (err) => {
        logger('error', err);

        embed
            .setTitle("Discord API Error")
            .setURL("https://discordjs.guide/popular-topics/errors.html#api-errors")
            .setColor("#2F3136")
            .setDescription(`\`\`\`${inspect(err, { depth: 0 }).slice(0, 1000)}\`\`\``)
            .setTimestamp();

        return webhook.send({ embeds: [embed] });
    });
};