const { GatewayIntentBits } = require("discord.js");

module.exports = {
  name: "interactionCreate",
  async execute(interaction, bot) {
    if (interaction.isChatInputCommand()) {
      const { commands } = bot;
      const { commandName } = interaction;
      const command = commands.get(commandName);

      if (!command) return;

      try {
        await command.execute(interaction, bot);
      } catch (err) {
        console.error(err);
        await interaction.reply({
          content: `Something went wrong while executing this command, please inform the dev\n🧩 <@351211709492363264>`,
          ephemeral: true,
        });
      }
    } else if (interaction.isButton()) {
      const { buttons } = bot;
      const { customId } = interaction;

      if (customId.startsWith("assign-role-")) {
        const roleButton = buttons.get("assign-role-");
        if (roleButton) {
          try {
            await roleButton.execute(interaction, bot);
          } catch (err) {
            console.error(err);
            await interaction.reply({
              content: `Something went wrong while executing this button, please inform the dev\n🧩 <@351211709492363264>`,
              ephemeral: true,
            });
          }
        }
      } else {
        const button = buttons.get(customId);
        if (!button) return new Error("No custom ID for this button");

        try {
          await button.execute(interaction, bot);
        } catch (err) {
          console.error(err);
          await interaction.reply({
            content: `Something went wrong while executing this button, please inform the dev\n🧩 <@351211709492363264>`,
            ephemeral: true,
          });
        }
      }
    } else if (interaction.isModalSubmit()) {
      const modal = bot.modals.get(interaction.customId);
      if (!modal) return new Error("No custom ID for this modal");

      try {
        await modal.execute(interaction, bot);
      } catch (err) {
        console.error(err);
        await interaction.reply({
          content: `Something went wrong while executing this modal, please inform the dev\n🧩 <@351211709492363264>`,
          ephemeral: true,
        });
      }
    }
  },
};
