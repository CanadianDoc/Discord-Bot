const { SlashCommandBuilder } = require("discord.js");
const fs = require("fs");
const path = require("path");
const { DateTime } = require("luxon"); // ✅ Import Luxon

const settingsPath = path.join(__dirname, "../../serverData.json");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("optime")
    .setDescription("Shows the globally set OP time in your local time."),

  async execute(interaction) {
    const guildId = interaction.guildId;
    let settings = {};

    if (fs.existsSync(settingsPath)) {
      settings = JSON.parse(fs.readFileSync(settingsPath, "utf8"));
    }

    //console.log("Loaded settings:", settings);

    const utcHour = settings[guildId]?.utcHour ?? 18; // Default to 18 UTC
    //console.log(`Guild: ${guildId}, UTC Hour: ${utcHour}`);

    let userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    if (!userTimeZone || userTimeZone === "UTC") {
      return interaction.reply(
        "❌ No time zone detected. Please check your system settings."
      );
    }

    /*console.log(
      `User Locale: ${interaction.locale}, Time Zone: ${userTimeZone}`
    );*/

    const localTime = DateTime.utc()
      .set({ hour: utcHour, minute: 0 })
      .setZone(userTimeZone);

    const localTimeString = localTime.toFormat("h a ZZZZ");

    //console.log(`Converted Local Time: ${localTimeString}`);

    const utcHour12 = utcHour % 12 === 0 ? 12 : utcHour % 12;
    const utcPeriod = utcHour < 12 ? "AM" : "PM";

    await interaction.reply(
      `🕒 OP Time (**${utcHour12} ${utcPeriod} UTC**) in your local time: **${localTimeString}**`
    );
  },
};
