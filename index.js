import {Client, GatewayIntentBits} from 'discord.js';
import {config} from 'dotenv';
config();

const bot = new Client({ 
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ],
});

bot.login(process.env.token);

bot.on('ready', () => {
    console.log(`${bot.user.tag} is online`);
});