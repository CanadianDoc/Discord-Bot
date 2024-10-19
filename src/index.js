require("dotenv").config();
const {
  Client,
  Collection,
  GatewayIntentBits,
  Activity,
  ActivityType,
} = require("discord.js");

const fs = require("fs");

const bot = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers],
});
bot.commands = new Collection();
bot.buttons = new Collection();
bot.commandArray = [];

const functionFolders = fs.readdirSync(`./src/functions`);
for (const folder of functionFolders) {
  const functionFiles = fs
    .readdirSync(`./src/functions/${folder}`)
    .filter((file) => file.endsWith(".js"));
  for (const file of functionFiles) {
    require(`./functions/${folder}/${file}`)(bot);
  }
}

bot.on("guildMemberAdd", (member) => {
  const channel = member.guild.channels.cache.get(process.env.welcomeChannelID);
  if (channel) {
    channel.send(
      `Welcome to the server ${member}!\nPlease ping <@&${process.env.staffRoleID}> to get started!`
    );
  } else {
    console.error("Welcome channel not found");
  }
});

bot.on("guildMemberAdd", (member) => {
  const role = process.env.newbieRole;
  const autorole = member.guild.roles.cache.get(role);
  if (!autorole) return console.log("No role found");
  member.roles.add(autorole);
});

bot.eventHandler();
bot.commandHandler();
bot.componentHandler();
bot.login(process.env.token);
