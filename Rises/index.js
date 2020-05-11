const Discord = require('discord.js');
const bot = new Discord.Client();
const ytdl = require('ytdl-core');
const token = 'enter your token here';
const PREFIX = '.';

const fs = require('fs');
bot.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for(const file of commandFiles){
    const command = require(`./commands/${file}`);
    bot.commands.set(command.name, command);
}

const servers = {};

bot.on('ready', () =>{
    console.log('BOT IS ONLINE.')
})

    let args = message.content.substring(PREFIX.length).split(" ");

    switch (args[0]) {
        case 'ping':
            bot.commands.get('ping').execute(message, args);
        break;

        case 'help':
            bot.commands.get('help').execute(message, args);
        break;

        case 'version':
            bot.commands.get('version').execute(message, args);
        break;

        

        case 'clear':
            bot.commands.get('clear').execute(message, args);
        break;

        
       
        // GIANT ABOMINATION OF A PLAY COMMAND HERE. MUSIC RELATED COMMANDS FROM HERE ON DOWN
        case 'play':
            try{
            function play(connection, message){
                var server = servers[message.guild.id];

                server.dispatcher = connection.playStream(ytdl(server.queue[0], {filter: "audioonly"}));
                
                server.queue.shift();

                server.dispatcher.on("end", function(){
                    if(server.queue[0]){
                        play(connection, message);
                        console.log(server.queue, "server queue = 0, playing(connection, message).");
                    }else {
                        message.channel.send('Queue has concluded. Disconnecting...');
                        connection.disconnect();
                    }
                });
            }

            if(!args[1]){
                message.channel.send('Invalid arguments. Please provide a valid YouTube URL.');
                return;
            }

            if(!message.member.voiceChannel){
                message.channel.send('You must be in a voice channel to use this command. ');
                return;
            }

            if(!servers[message.guild.id]) servers[message.guild.id] = {
                queue: []
            }

            var server = servers[message.guild.id];

            server.queue.push(args[1]);
            message.channel.send('Adding song to queue...');
            
            if(!message.guild.voiceConnection) message.member.voiceChannel.join().then(function(connection){
                play(connection, message);
                console.log('Playing requested audio...');
            })
        } catch (error){
            console.error(error);
            message.channel.send('There was an error performing that command. ' + error);
        }
        break;

        case 'skip':
            try{
            var server = servers[message.guild.id];
            if(server.dispatcher) server.dispatcher.end();
            message.channel.send('Skipping current song...');
            } catch (error){
                console.error(error);
                message.channel.send('There was an error performing that command. ' + error);
            }
        break;

        case 'stop':
            try {
                var server = servers[message.guild.id];
            
                if(!message.guild.voiceConnection){
                    message.channel.send('I am not currently connected to any voice channel.');
             }

                if (message.guild.voiceConnection){
                 for(var i = server.queue.length -1; i >= 0; i--){
                     server.queue.splice(i, 1);
                    }

                 server.dispatcher.end();
                 console.log('Stopping queue...')
             }
            
                if(message.guild.connection) message.guild.voiceConnection.disconnect();
            } catch (error){
                console.error(error);
                message.channel.send('There was an error performing that command. ' + error);
            }
        break;
    }
});

bot.login(token);
