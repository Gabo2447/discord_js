# Bienvenido a Cat Orange! :owlbert:

Este proyecto es para ayudar a las personas que quieren tener un bot de discord con el codigo ya hecho con funciones en casi todas las areas!

# 🚦 Que tiene el bot?

<Cards columns={4}>
  <Card title="CommandHandler" href="https://github.com/Gabo2447/discord_js/tree/main/handlers/commandHandler.js" icon="fa-home" target="_blank">
    CommandHandler organizado y con su propia seccion.
  </Card>

  <Card title="PrefixHandler" href="https://github.com/Gabo2447/discord_js/tree/main/handlers/prefixHandler.js" icon="fa-user">
    PrefixHandler organizado y separado del CommandHandler.
  </Card>

  <Card title="Registrador de comandos" href="https://github.com/Gabo2447/discord_js/tree/main/index.js" icon="fa-star">
    Index organizado, facil de leer y solamente con cosas necesarias.
  </Card>

  <Card title="Proximamente mas funciones" icon="fa-home">
    Trabajando en **optimizar, mejorar** el bot
  </Card>
</Cards>

# 📝 **Customizar el bot**

Si quieres agregar mas comandos o funcionalidades basate de las siguientes plantillas para **comandos prefijos** y **comandos slash**:

> > 📘 IMPORTANTE
> >
> > Cuidado con los comandos slash y los comandos prefijos, no utilizan la misma manera para enviar mensajes.

```javascript Slash Command
// Comandos slash
const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('test') // Nombre del comando
    .setDescription('El bot responde con "Prueba"!'), // Descripción del comando

  async execute(interaction) {
    await interaction.reply('¡Prueba!');
  }
};
```

```javascript Prefix Command
// Comandos Prefix
module.exports = {
    name: 'test', // Nombre del comando
    description: 'El bot responde con "Prueba"!', // Descripcion del comando
    async execute(message, args, client) {
        message.channel.send('¡Prueba!');
    }
} 
```