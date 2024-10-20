const {
  SlashCommandBuilder,
  ActionRowBuilder,
  EmbedBuilder,
  PermissionFlagsBits,
  ButtonBuilder,
  ButtonStyle,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ticketbox")
    .setDescription(
      "Create a ticket box button for members to submit tickets. . ."
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

  async execute(interaction, bot) {
    const suggestion = new ButtonBuilder()
      .setCustomId("suggestion")
      .setLabel("Submit a Suggestion")
      .setStyle(ButtonStyle.Success);

    const ticket = new ButtonBuilder()
      .setCustomId("ticket")
      .setLabel("Submit a Ticket")
      .setStyle(ButtonStyle.Danger);

    const row = new ActionRowBuilder().addComponents(suggestion, ticket);

    const embed = new EmbedBuilder()
      .setTitle("Ticket Box")
      .setDescription("Click a button below to submit a Suggestion or Ticket")
      .addFields(
        {
          name: "Suggestion",
          value: "Submit a suggestion for the unit",
          inline: true,
        },
        {
          name: "Ticket",
          value: "Submit a ticket for Doc to look over",
          inline: true,
        }
      )
      .setColor("#a3ffb4");

    await interaction.reply({
      embeds: [embed],
      components: [row],
    });
  },
};
