const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('test')
        .setDescription('Comando de prueba para el command handler')
        .addStringOption(option =>
            option.setName('mensaje')
                .setDescription('Un mensaje para probar')
                .setRequired(true)),

    async execute(interaction) {
        const mensaje = interaction.options.getString('mensaje');
        await interaction.reply(`¡Comando de prueba! Tu mensaje: ${mensaje}`);
    }
}; 