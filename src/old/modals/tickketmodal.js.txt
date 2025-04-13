const { EmbedBuilder } = require("discord.js");

module.exports = {
  data: {
    customId: "ticket-modal",
  },
  async execute(interaction, bot) {
    try {
      const ticketChannelID = process.env.ticketChannelID;
      const ticketChannel = await bot.channels.fetch(ticketChannelID);

      if (!ticketChannel) {
        return interaction.reply({
          content: `Ticket channel not found. Please contact the admin\n🧩 <@351211709492363264>`,
          ephemeral: true,
        });
      }

      const ticket = interaction.fields.getTextInputValue("ticket-input");

      const embed = new EmbedBuilder()
        .setTitle(ticket)
        .setColor("Random")
        .setFooter({
          text: `Ticket by ${interaction.user.tag}`,
          iconURL: interaction.user.displayAvatarURL(),
        })
        .setTimestamp();

      await ticketChannel.send({
        embeds: [embed],
      });

      await interaction.reply({
        content: "Thank you for your ticket! It has been submitted.",
        ephemeral: true,
      });
    } catch (err) {
      console.error(err);
      await interaction.reply({
        content: `Something went wrong while submitting your ticket, please inform the dev\n🧩 <@351211709492363264>`,
        ephemeral: true,
      });
    }
  },
};
