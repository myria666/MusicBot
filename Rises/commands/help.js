const Discord = require("discord.js");
module.exports = {
    name: 'help',
    description: 'Help, what else.',
    execute(message, args){
        const embed = new Discord.RichEmbed()
            .setAuthor('Rises', 'https://cdn.discordapp.com/attachments/646769469120839703/667510684082241566/81541034_591012158411243_8500219932129746034_n.jpg')    

            .setTitle('__Rises command list__')
            .setDescription('Includes command usage and permissions.')
            
            .addField('**Clear**', 'Clears messages in bulk. Requires permission to manage messages.')
            .addField('USAGE:', '*.clear [number of messages]*')

            .addField('**Play**', 'Plays requested YouTube URL. WARNING: As of right now, using anything but a URL will cause the bot to crash.')
            .addField('USAGE:', '*.play [YouTube URL]*')

            .addField('**Skip**', 'Skips the current song in the queue.')
            .addField('USAGE:', '*.skip*')

            .addField('**Stop**', 'Disconnects the bot and clears the queue.')
            .addField('USAGE:', '*.stop*')

            .addField('**Version**', 'Simply pulls up the current version and info about it.')
            .addField('USAGE:', '*.version*')

            .setColor('#FF010C')
            .setFooter('Rises, by myria', 'https://cdn.discordapp.com/attachments/646769469120839703/667510684082241566/81541034_591012158411243_8500219932129746034_n.jpg')
            message.author.send(embed);
    }
}