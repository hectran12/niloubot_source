const { SlashCommandBuilder } = require('discord.js');
module.exports = {
    data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Trả về trạng thái PING'),
    async execute(interaction, client) {
        const message = await interaction.deferReply({
            fetchReply: true,
        });

        const newMessage = `API Latency: ${client.ws.ping}\nClient Ping: ${message.createdTimestamp - interaction.createdTimestamp}\nRate: ${client.ws.ping > 200 ? "Not good": "Good"}`
        await interaction.editReply({
            content: newMessage
        })
    }
}
