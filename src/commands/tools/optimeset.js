const {
  SlashCommandBuilder,
  PermissionFlagsBits,
  MessageFlags,
} = require("discord.js");
const fs = require("fs");
const path = require("path");

const settingsPath = path.join(__dirname, "../../serverData.json");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("optimeset")
    .setDescription("Sets the UTC hour globally for /optime in this server")
    .addIntegerOption((option) =>
      option
        .setName("utctime")
        .setDescription("The new UTC hour (0-23)")
        .setRequired(true)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

  async execute(interaction) {
    const utcHour = interaction.options.getInteger("utctime");
    const guildId = interaction.guildId;

    if (utcHour < 0 || utcHour > 23) {
      return interaction.reply({
        content: "❌ Please enter a valid UTC hour (0-23).",
        flags: MessageFlags.Ephemeral,
      });
    }

    let settings = {};
    if (fs.existsSync(settingsPath)) {
      settings = JSON.parse(fs.readFileSync(settingsPath, "utf8"));
    }

    settings[guildId] = { utcHour };

    fs.writeFileSync(settingsPath, JSON.stringify(settings, null, 4), "utf8");

    const utcHour12 = utcHour % 12 === 0 ? 12 : utcHour % 12;
    const utcPeriod = utcHour < 12 ? "AM" : "PM";

    await interaction.reply({
      content: `✅ The OP time has been set to **${utcHour12} ${utcPeriod} UTC** for this server.`,
      flags: MessageFlags.Ephemeral,
    });
  },
};
