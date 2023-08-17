const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");
const fs = require("fs");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("datawipe")
    .setDescription("Wipes all data from the database")
    .addStringOption((option) =>
      option
        .setName("database")
        .setDescription("The name of the database to wipe")
        .setRequired(true)
        .addChoices(
          { name: "Polls", value: "polls" },
          { name: "Attendance", value: "attendance" },
          { name: "Roles", value: "roles" }
        )
    )
    .setDMPermission(false)
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

  async execute(interaction, bot) {
    const database = interaction.options.getString("database");
    let filePath;

    if (database === "polls") {
      filePath = "src/data/votes.json";
    } else if (database === "attendance") {
      filePath = "src/data/attendance.json";
    } else if (database === "roles") {
      filePath = "src/data/roles.json";
    }

    // Overwrite the file with an empty array to wipe the data
    const emptyDataString = JSON.stringify([]);
    fs.writeFileSync(filePath, emptyDataString, "utf8");

    interaction.reply({
      content: "Data has been wiped",
      ephemeral: true,
    });
  },
};
