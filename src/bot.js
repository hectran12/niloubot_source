require('dotenv').config();

// get token on env
const { DISCORDJS_BOT_TOKEN } = process.env;
// create client obj
const { Client, Collection, GatewayIntentBits} = require('discord.js');
// process file
const fs = require('fs');

// client setup
const client = new Client({intents: GatewayIntentBits.Guilds});

// create commands collection
client.commands = new Collection();

// create button collection
client.buttons = new Collection();
// create list commands
client.commandArray = [];

// get dir function folders
const functionFolders = fs.readdirSync('./src/functions');

// require 
for (const folder of functionFolders) {
    // get dir function files to import
    const functionFiles = fs.readdirSync(`./src/functions/${folder}`)
    .filter((file) => file.endsWith('.js'));
    for (const file of functionFiles) require(`./functions/${folder}/${file}`)(client);
}



// on bot
client.handleEvents();
client.handleCommands();
client.handleComponents();
client.login(DISCORDJS_BOT_TOKEN)