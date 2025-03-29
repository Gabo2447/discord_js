module.exports = {
    name: 'test',
    description: 'Comando de prueba',
    execute(message, args, client) {
        return message.channel.send('test');
    }
}