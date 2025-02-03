const { SlashCommandBuilder } = require("discord.js");
const fs = require("fs");
const path = require("path");

const settingsPath = path.join(__dirname, "../../serverData.json");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("optime")
    .setDescription("Shows when the OP Time is in your local time. . ."),

  async execute(interaction) {
    const guildId = interaction.guildId;

    let settings = {};
    if (fs.existsSync(settingsPath)) {
      settings = JSON.parse(fs.readFileSync(settingsPath, "utf8"));
    }
    const utcHour = settings[guildId]?.utcHour || 18;

    const utcDate = new Date();
    utcDate.setUTCHours(utcHour, 0, 0, 0);

    const userLocale = interaction.locale || "en-US";
    const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    const formatter = new Intl.DateTimeFormat(userLocale, {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
      timeZone: userTimeZone,
    });

    const localTimeString = formatter.format(utcDate);

    const utcHour12 = utcHour % 12 === 0 ? 12 : utcHour % 12;
    const utcPeriod = utcHour < 12 ? "AM" : "PM";

    await interaction.reply(
      `🕒 **OP Time** (${utcHour12} ${utcPeriod} UTC) in your local time is: **${localTimeString}**`
    );
  },
};
