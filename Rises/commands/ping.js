module.exports = {
    name: 'ping',
    description: 'Pings the bot. Simple enough.',
    execute(message, args){
        message.channel.send('Bot is online!');
    }
}