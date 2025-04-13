const { EmbedBuilder } = require("discord.js");

module.exports = {
  data: {
    customId: "suggestion-modal",
  },
  async execute(interaction, bot) {
    try {
      const suggestionChannelID = process.env.suggestionChannelID;
      const suggestionChannel = await bot.channels.fetch(suggestionChannelID);

      if (!suggestionChannel) {
        return interaction.reply({
          content: `Suggestion channel not found. Please contact the admin\n🧩 <@351211709492363264>`,
          ephemeral: true,
        });
      }

      const suggestion =
        interaction.fields.getTextInputValue("suggestion-input");
      const anonymousInput = interaction.fields
        .getTextInputValue("anonymous-input")
        .toLowerCase();

      const isAnonymous = anonymousInput === "y";
      const footerText = isAnonymous
        ? "Suggested by [Redacted]"
        : `Suggested by ${interaction.user.tag}`;
      const footerIcon = isAnonymous
        ? bot.user.displayAvatarURL()
        : interaction.user.displayAvatarURL();

      const embed = new EmbedBuilder()
        .setTitle(suggestion)
        .setColor("Random")
        .setFooter({ text: footerText, iconURL: footerIcon })
        .setTimestamp();

      const suggestionMessage = await suggestionChannel.send({
        embeds: [embed],
      });

      await suggestionMessage.react("✅");
      await suggestionMessage.react("🛑");

      await interaction.reply({
        content: "Thank you for your suggestion! It has been submitted.",
        ephemeral: true,
      });
    } catch (err) {
      console.error(err);
      await interaction.reply({
        content: `Something went wrong while submitting your suggestion, please inform the dev\n🧩 <@351211709492363264>`,
        ephemeral: true,
      });
    }
  },
};
