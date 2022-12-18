const {
    SlashCommandBuilder,
    PermissionFlagsBits,
    ChatInputCommandInteraction,
    Client,
    EmbedBuilder,
} = require("discord.js");
const Cluster = require('discord-hybrid-sharding');


module.exports = {
    data: new SlashCommandBuilder()
        .setName("clusters")
        .setDescription("View cluster data."),

    /**
     *
     * @param {ChatInputCommandInteraction} interaction
     * @param {Client} client
     */
    async execute(interaction, client) {
        const total_shards = Cluster.data.TOTAL_SHARDS;
        const current_shard = client.cluster.id;

        // create embed with total amount of clusters
        const embed = new EmbedBuilder()
            .setTitle("Cluster Data")
            .setDescription(`Cluster Data: `)
            .addFields(
                {
                    name: "Total Clusters",
                    value: `${total_shards}`,
                    inline: true,
                },
                {
                    name: "Current Shard",
                    value: `${current_shard}`,
                    inline: true,
                }
            )
        await interaction.reply({ embeds: [embed] });
    },
};
