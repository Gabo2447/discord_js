const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('ping') // Nombre del comando
    .setDescription('Responde con Pong!'), // Descripción del comando

  async execute(interaction) {
    await interaction.reply('¡Pong! 🏓');
  }
};
