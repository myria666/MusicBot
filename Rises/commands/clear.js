module.exports ={
    name: "clear",
    description: "Clears messages. Keep in mind the .clear message you send counts as a message.",
    execute(message, args){
        if(!args[1]) return message.channel.send('Invalid arguments. Please define a valid number of messages to remove.');
        if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send('You do not have permissions to use this command.');
        message.channel.bulkDelete(args[1]);
    }
}