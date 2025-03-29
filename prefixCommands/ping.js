module.exports = {
    name: 'ping',
    description: 'Comando de ping',
    async execute(message, args, client) {
        message.channel.send('¡Pong! 🏓');
    }
} 