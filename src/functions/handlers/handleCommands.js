const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const fs = require('fs');

module.exports = (client) => {
    client.handleCommands = async () => {
        const commandsFolders =  fs.readdirSync('./src/commands');
        for (const folder of commandsFolders) {
            const commandFiles = fs.readdirSync(`./src/commands/${folder}`)
            .filter(file => file.endsWith('.js'));


            // access scope variable 
            const {commands, commandArray } = client;
            // get all file in folder module
            for (const file of commandFiles) {
                const command = require(`../../commands/${folder}/${file}`)
                commands.set(command.data.name, command);
                var fullJsonCommands = command.data.toJSON();
                fullJsonCommands['folder_name'] = folder;
                commandArray.push(fullJsonCommands);
                console.log('Module da duoc thong qua....');   
            }
        
        }
        const clientId = '1078715383202201671';
        const guildId = '1074671128385159240';
        const rest = new REST({
            version: '10'
        }).setToken(process.env.DISCORDJS_BOT_TOKEN);
        try {
            console.log('bat dau lam moi application (/)')
            await rest.put(Routes.applicationCommands(clientId), {
                body: client.commandArray
            });
            console.log('thanh cong lam moi application (/)')
        } catch (err) {
            console.error(err);
        }
    };
}