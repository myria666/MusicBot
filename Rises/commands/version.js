const Discord = require("discord.js");
module.exports ={
    name: "version",
    description: "Call up information on the bot.",
    execute(message, args){
            const embed = new Discord.RichEmbed()
            .setTitle('VERSION NUMBER')
            .setDescription('Version 1.1.2')
            .addField('Number of past versions:', '4', true)
            .setColor('#FF010C')
            .setThumbnail('https://cdn.discordapp.com/attachments/646769469120839703/667510684082241566/81541034_591012158411243_8500219932129746034_n.jpg')
            message.channel.send(embed);
        }
    }