const { SlashCommandBuilder } = require("discord.js");
const fs = require("fs");
const path = require("path");

const settingsPath = path.join(__dirname, "../../serverData.json");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("optime")
    .setDescription(
      "Shows the globally set UTC time in your local time for this server"
    ),

  async execute(interaction) {
    const guildId = interaction.guildId;

    let settings = {};
    if (fs.existsSync(settingsPath)) {
      settings = JSON.parse(fs.readFileSync(settingsPath, "utf8"));
    }
    const utcHour = settings[guildId]?.utcHour || 18; // Default to 6 PM UTC

    // Get UTC time object
    const utcDate = new Date();
    utcDate.setUTCHours(utcHour, 0, 0, 0);

    // Get user's locale and detected time zone
    const userLocale = interaction.locale || "en-US";
    const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    if (!userTimeZone) {
      return interaction.reply("Time zone not detected.");
    }

    // Format local time without timezone name
    const formatter = new Intl.DateTimeFormat(userLocale, {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
      timeZone: userTimeZone,
    });

    const localTimeString = formatter.format(utcDate);

    // Convert UTC time to 12-hour format
    const utcHour12 = utcHour % 12 === 0 ? 12 : utcHour % 12;
    const utcPeriod = utcHour < 12 ? "am" : "pm";

    await interaction.reply(
      `🕒 OP Time (**${utcHour12} ${utcPeriod} UTC**) in your local time is: **${localTimeString}**`
    );
  },
};
