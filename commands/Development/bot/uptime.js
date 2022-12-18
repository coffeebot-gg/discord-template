const {
    SlashCommandBuilder,
    PermissionFlagsBits,
    ChatInputCommandInteraction,
    Client,
    EmbedBuilder,
} = require("discord.js");
const ms = require("ms");


module.exports = {
    data: new SlashCommandBuilder()
        .setName("uptime")
        .setDescription("View the bot's uptime."),

    /**
     *
     * @param {ChatInputCommandInteraction} interaction
     * @param {Client} client
     */
    async execute(interaction, client) {
        const { guild } = interaction;
        const uptime = ms(client.uptime);
        const embed = new EmbedBuilder()
            .setDescription(`🤖 CoffeeBot have been live for \`${uptime}\`!`)
            .setColor(0x00AE86);
        
        interaction.reply({embeds: [embed]});
    },
};
