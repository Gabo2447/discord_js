const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const {
  formatearBytes,
  obtenerTamañoCarpeta,
} = require("../functions/size_bot");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("admin")
    .setDescription("Informacion de los datos del bot"),

  async execute(interaction) {
    // ID del user
    const { owner } = require("../config.json");

    // Verificar si el usuario es el owner
    if (interaction.user.id !== owner) {
      return interaction.reply({
        content: "No tienes permisos para usar este comando",
        ephemeral: true,
      });
    }

    // Obtener la informacion del bot
    const botInfo = interaction.client;

    const embed = new EmbedBuilder()
      .setColor("#E29A47")
      .setTitle("|-------| BOT CAT ORANGE |-------|")
      .setAuthor({
        name: "Gabo2447",
        iconURL:
          "https://cdn.discordapp.com/avatars/930530005686034503/4c2c36432cfbaa5fc4756c1a321a5cf4.webp?size=2048",
      })
      .setDescription('Este proyecto es para ayudar a las personas que quieren tener un bot de discord con el codigo ya hecho con funciones en casi todas las areas!')
      .setTimestamp()
      .setImage("https://avatarfiles.alphacoders.com/375/thumb-1920-375207.png")      .addFields(
        { name: "🤖 **Nombre del bot**", value: botInfo.user.username },
        { name: "📄 **ID del bot**", value: botInfo.user.id },
        {
          name: "📅 **Fecha de creacion**",
          value: botInfo.user.createdAt.toLocaleDateString(),
        },
        {
          name: "⚠️ **Tamano del bot**",
          value: formatearBytes(obtenerTamañoCarpeta("././")),
        }
      );

    await interaction.reply({ embeds: [embed] });
  },
};
