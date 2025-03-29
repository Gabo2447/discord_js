const { Client, Events, GatewayIntentBits, Collection } = require("discord.js");
const { token, clientId, prefix } = require('./config.json');
const fs = require('node:fs');
const path = require('node:path');
const { REST, Routes } = require('discord.js');

// Creando el cliente con los intents necesarios
const client = new Client({ 
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers
    ] 
});

// Cargar el command handler
require('./handlers/commandHandler')(client);
require('./handlers/prefixHandler')(client);

// Evento para mensajes
client.on('messageCreate', (message) => {
    console.log(`Mensaje recibido: ${message.content}`); // Debug

    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    const command = client.prefixCommands.get(commandName);
    if (!command) return;

    try {
        command.execute(message, args, client);
    } catch (error) {
        console.error(error);
        message.channel.send('¡Hubo un error!');
    }
});

// Cargar comandos slash
const commands = [];
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    if ('data' in command) {
        commands.push(command.data.toJSON());
    }
}

// Crear instancia REST
const rest = new REST().setToken(token);

// Registrar comandos slash
(async () => {
    try {
        console.log(`[Slash Commands] Iniciando registro de ${commands.length} comandos...`);

        const data = await rest.put(
            Routes.applicationCommands(clientId),
            { body: commands },
        );

        console.log(`[Slash Commands] ${data.length} comandos registrados exitosamente.`);
    } catch (error) {
        console.error('[Slash Commands] Error al registrar comandos:', error);
    }
})();

// Verificar si el cliente funciona
client.once(Events.ClientReady, async readyClient => {
    console.log(`[Client] ¡Listo! Conectado como ${readyClient.user.tag}`);
});

// Manejar errores del cliente
client.on('error', error => {
    console.error('[Client] Error en el cliente:', error);
});

// Iniciar sesión
client.login(token);