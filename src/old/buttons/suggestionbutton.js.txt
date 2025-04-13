const {
  ModalBuilder,
  ActionRowBuilder,
  TextInputBuilder,
  TextInputStyle,
} = require("discord.js");

module.exports = {
  data: {
    name: "suggestion",
  },
  async execute(interaction) {
    try {
      await interaction.showModal(
        new ModalBuilder()
          .setCustomId("suggestion-modal")
          .setTitle("Submit Your Suggestion")
          .addComponents(
            new ActionRowBuilder().addComponents(
              new TextInputBuilder()
                .setCustomId("suggestion-input")
                .setLabel("What is your suggestion?")
                .setStyle(TextInputStyle.Paragraph)
                .setRequired(true)
            ),
            new ActionRowBuilder().addComponents(
              new TextInputBuilder()
                .setCustomId("anonymous-input")
                .setLabel('Stay Anonymous? (Enter "y" or "n")')
                .setStyle(TextInputStyle.Short)
                .setRequired(true)
                .setMaxLength(1)
            )
          )
      );
    } catch (err) {
      console.error(err);
      await interaction.reply({
        content: `Something went wrong while opening the suggestion modal. Please inform the dev\n🧩 <@351211709492363264>`,
        ephemeral: true,
      });
    }
  },
};
