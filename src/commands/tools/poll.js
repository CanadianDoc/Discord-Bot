const {
  ModalBuilder,
  ActionRowBuilder,
  TextInputBuilder,
  TextInputStyle,
  SlashCommandBuilder,
  PermissionFlagsBits,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("poll")
    .setDescription("Make a poll. . .")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
  async execute(interaction) {
    try {
      await interaction.showModal(
        new ModalBuilder()
          .setCustomId("poll-modal")
          .setTitle("What is the poll about?")
          .addComponents(
            new ActionRowBuilder().addComponents(
              new TextInputBuilder()
                .setCustomId("poll-input")
                .setLabel("What is the poll about?")
                .setStyle(TextInputStyle.Paragraph)
                .setRequired(true)
            ),
            new ActionRowBuilder().addComponents(
              new TextInputBuilder()
                .setCustomId("neutralvote-input")
                .setLabel('Do you need a maybe vote? (Enter "y" or "n")')
                .setStyle(TextInputStyle.Short)
                .setRequired(true)
                .setMaxLength(1)
            )
          )
      );
    } catch (err) {
      console.error(err);
      await interaction.reply({
        content: `Something went wrong while opening the poll modal. Please inform the dev\n🧩 <@351211709492363264>`,
        ephemeral: true,
      });
    }
  },
};
