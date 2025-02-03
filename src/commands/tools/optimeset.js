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
      try {
        settings = JSON.parse(fs.readFileSync(settingsPath, "utf8"));
      } catch (error) {
        console.error("❌ Error reading serverData.json:", error);
      }
    }

    // Ensure settings has correct structure
    if (!settings || typeof settings !== "object") {
      settings = {};
    }

    settings[guildId] = { utcHour };

    // ✅ **Fix: Use `fs.writeFileSync` safely**
    try {
      fs.writeFileSync(settingsPath, JSON.stringify(settings, null, 4), "utf8");
      console.log(`✅ Updated settings for ${guildId}:`, settings[guildId]);
    } catch (error) {
      console.error("❌ Error writing to serverData.json:", error);
      return interaction.reply("❌ Failed to save the settings. Try again.");
    }

    const utcHour12 = utcHour % 12 === 0 ? 12 : utcHour % 12;
    const utcPeriod = utcHour < 12 ? "AM" : "PM";

    await interaction.reply({
      content: `✅ The OP time has been set to **${utcHour12} ${utcPeriod} UTC** for this server.`,
      flags: MessageFlags.Ephemeral,
    });
  },
};
