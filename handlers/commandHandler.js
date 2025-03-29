const { Collection } = require("discord.js");
const { glob } = require("glob");
const path = require("node:path");

module.exports = async (client) => {
  // Crear coleccion de comandos
  client.commands = new Collection();

  console.log("\n[Command Handler] ====== Iniciando Detección de Comandos ======");

  // Usar glob para encontrar todos los archivos .js en commands y sus subcarpetas
  const commandFiles = await glob("commands/**/*.js");
  
  for (const file of commandFiles) {
    const command = require(path.join(process.cwd(), file));
    
    if ("data" in command && "execute" in command) {
      client.commands.set(command.data.name, command);
      console.log(`[Command Handler] ✅ Comando cargado: ${command.data.name}`);
      console.log(`[Command Handler] 📂 Ruta: ${file}`);
    } else {
      console.log(`[Command Handler] ❌ Error en ${file}:`);
      console.log(`   - data: ${"data" in command ? "✅" : "❌"}`);
      console.log(`   - execute: ${"execute" in command ? "✅" : "❌"}`);
    }
  }

  console.log("\n[Command Handler] ====== Resumen de Comandos ======");
  console.log(`[Command Handler] Total de comandos cargados: ${client.commands.size}`);
  console.log("[Command Handler] ================================\n");

  // Manejar interacciones de comandos slash
  client.on("interactionCreate", async (interaction) => {
    if (!interaction.isChatInputCommand()) return;

    const command = client.commands.get(interaction.commandName);
    if (!command) return;

    try {
      await command.execute(interaction);
    } catch (error) {
      console.error(error);
      const errorMessage = {
        content: "¡Hubo un error al ejecutar este comando!",
        ephemeral: true,
      };

      if (interaction.replied || interaction.deferred) {
        await interaction.followUp(errorMessage);
      } else {
        await interaction.reply(errorMessage);
      }
    }

    // Manejar errores de comandos
    client.on("error", (error) => {
      console.error("[Command Handler] Error en el cliente:", error);
    });

    process.on("unhandledRejection", (error) => {
      console.error("[Command Handler] Promesa rechazada no manejada:", error);
    });
  });
};
