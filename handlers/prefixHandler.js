const { Collection } = require("discord.js");
const { glob } = require("glob");
const fs = require('node:fs');
const path = require("node:path");

module.exports = async (client) => {
  // Crear coleccion de comandos prefix
  client.prefixCommands = new Collection();
  console.log(
    "\n[Prefix Command Handler] Iniciando detección de comandos prefix..."
  );

  // Usar glob para encontrar todos los archivos .js en prefixCommands y sus subcarpetas
  const prefixFiles = await glob("prefixCommands/*.js");

  for (const file of prefixFiles) {
    const command = require(path.join(process.cwd(), file));

    // Verificar propiedades necesarias del comando
    if ("name" in command && "execute" in command) {
      client.prefixCommands.set(command.name, command);
      console.log(`[Prefix Handler] ✅ Comando cargado: ${command.name}`);
      console.log(`[Prefix Handler] 📂 Ruta: ${file}`);
    } else {
      console.log(`[Prefix Handler] ❌ Error en ${file}:`);
      console.log(`   - name: ${"name" in command ? "✅" : "❌"}`);
      console.log(`   - execute: ${"execute" in command ? "✅" : "❌"}`);
    }
  }

  console.log("\n[Prefix Handler] ====== Resumen de Comandos ======");
  console.log(
    `[Prefix Handler] Total de comandos cargados: ${client.prefixCommands.size}`
  );
  console.log("[Prefix Handler] ================================\n");
};
