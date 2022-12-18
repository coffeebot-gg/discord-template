const {
    SlashCommandBuilder,
    PermissionFlagsBits,
    EmbedBuilder,
    CommandInteraction,
    Client,
    AttachmentBuilder
} = require("discord.js");


module.exports = {
    data: new SlashCommandBuilder()
        .setName("ping")
        .setDescription("Ping the bot!"),
    async execute(interaction, client) {
        interaction.reply("Pong!");
    }
};
