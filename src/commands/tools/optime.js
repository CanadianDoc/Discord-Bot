const { SlashCommandBuilder } = require("discord.js");
const fs = require("fs");
const path = require("path");

const settingsPath = path.join(__dirname, "../../serverData.json");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("optime")
    .setDescription("Shows the globally set OP time in your local time."),

  async execute(interaction) {
    const guildId = interaction.guildId;
    let settings = {};

    // Check if settings file exists
    if (fs.existsSync(settingsPath)) {
      settings = JSON.parse(fs.readFileSync(settingsPath, "utf8"));
    }

    console.log("Loaded settings:", settings); // ✅ Debug: Log settings

    // Ensure `utcHour` is retrieved correctly
    const utcHour = settings[guildId]?.utcHour ?? 18; // Default 18 UTC
    console.log(`Guild: ${guildId}, UTC Hour: ${utcHour}`); // ✅ Debug log

    // Create UTC Date
    const utcDate = new Date();
    utcDate.setUTCHours(utcHour, 0, 0, 0);

    // Check if time zone is detected
    const userLocale = interaction.locale || "en-US";
    const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    console.log(`User Locale: ${userLocale}, Time Zone: ${userTimeZone}`); // ✅ Debug log

    if (!userTimeZone) {
      return interaction.reply("⚠️ Time zone could not be detected.");
    }

    // Convert to local time
    const formatter = new Intl.DateTimeFormat(userLocale, {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
      timeZone: userTimeZone,
    });

    const localTimeString = formatter.format(utcDate);
    console.log("Converted Local Time:", localTimeString); // ✅ Debug log

    // Convert UTC time to 12-hour format
    const utcHour12 = utcHour % 12 === 0 ? 12 : utcHour % 12;
    const utcPeriod = utcHour < 12 ? "AM" : "PM";

    await interaction.reply(
      `🕒 OP Time (**${utcHour12} ${utcPeriod} UTC**) in your local time: **${localTimeString}**`
    );
  },
};
