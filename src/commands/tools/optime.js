const { SlashCommandBuilder } = require("discord.js");
const fs = require("fs");
const path = require("path");

const settingsPath = path.join(__dirname, "../../serverData.json");

const timeZones = {
  PST: -8, // Pacific Standard Time
  MST: -7, // Mountain Standard Time
  CST: -6, // Central Standard Time
  EST: -5, // Eastern Standard Time
  GMT: 0, // Greenwich Mean Time
  CET: 1, // Central European Time
  CEST: 2, // Central European Summer Time
};

module.exports = {
  data: new SlashCommandBuilder()
    .setName("optime")
    .setDescription("Shows the globally set OP time in your local time.")
    .addStringOption((option) =>
      option
        .setName("timezone")
        .setDescription("Choose your local time zone (Required)")
        .setRequired(true)
        .addChoices(
          { name: "Pacific Time (PST)", value: "PST" },
          { name: "Mountain Time (MST)", value: "MST" },
          { name: "Central Time (CST)", value: "CST" },
          { name: "Eastern Time (EST)", value: "EST" },
          { name: "Greenwich Mean Time (GMT)", value: "GMT" },
          { name: "Central European Time (CET)", value: "CET" },
          { name: "Central European Summer Time (CEST)", value: "CEST" }
        )
    ),

  async execute(interaction) {
    const guildId = interaction.guildId;
    let settings = {};

    if (fs.existsSync(settingsPath)) {
      settings = JSON.parse(fs.readFileSync(settingsPath, "utf8"));
    }

    const utcHour = settings[guildId]?.utcHour ?? 18;

    const selectedTimeZone = interaction.options.getString("timezone");

    if (!selectedTimeZone || timeZones[selectedTimeZone] === undefined) {
      return interaction.reply(
        "❌ You must select a valid time zone from the list."
      );
    }

    const userOffsetHours = timeZones[selectedTimeZone];

    let localHour = (utcHour + userOffsetHours) % 24;
    if (localHour < 0) localHour += 24; // Ensure hour stays positive

    const localHour12 = localHour % 12 === 0 ? 12 : localHour % 12;
    const localPeriod = localHour < 12 ? "AM" : "PM";

    const utcHour12 = utcHour % 12 === 0 ? 12 : utcHour % 12;
    const utcPeriod = utcHour < 12 ? "AM" : "PM";

    await interaction.reply(
      `🕒 **OP Time** (${utcHour12} ${utcPeriod} UTC) in your time zone (${selectedTimeZone}) is: **${localHour12} ${localPeriod} ${selectedTimeZone}**`
    );
  },
};
