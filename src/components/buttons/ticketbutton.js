const {
  ModalBuilder,
  ActionRowBuilder,
  TextInputBuilder,
  TextInputStyle,
} = require("discord.js");

module.exports = {
  data: {
    name: "ticket",
  },
  async execute(interaction) {
    try {
      await interaction.showModal(
        new ModalBuilder()
          .setCustomId("ticket-modal")
          .setTitle("Submit Your Ticket")
          .addComponents(
            new ActionRowBuilder().addComponents(
              new TextInputBuilder()
                .setCustomId("ticket-input")
                .setLabel("What is the Ticket Regarding?")
                .setStyle(TextInputStyle.Paragraph)
                .setRequired(true)
            )
          )
      );
    } catch (err) {
      console.error(err);
      await interaction.reply({
        content: `Something went wrong while opening the ticket modal. Please inform the dev\n🧩 <@351211709492363264>`,
        ephemeral: true,
      });
    }
  },
};
