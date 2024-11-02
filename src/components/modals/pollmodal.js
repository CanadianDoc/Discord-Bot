const { EmbedBuilder } = require("discord.js");

module.exports = {
  data: {
    customId: "poll-modal",
  },
  async execute(interaction, bot) {
    try {
      const pollChannelID = process.env.pollChannelID;
      const pollChannel = await bot.channels.fetch(pollChannelID);

      if (!pollChannel) {
        return interaction.reply({
          content: `Poll channel not found. Please contact the admin\n🧩 <@351211709492363264>`,
          ephemeral: true,
        });
      }

      const poll = interaction.fields.getTextInputValue("poll-input");
      const neutralvoteInput = interaction.fields
        .getTextInputValue("neutralvote-input")
        .toLowerCase();

      const hasNeutralvote = neutralvoteInput === "y";

      const embed = new EmbedBuilder()
        .setTitle(poll)
        .setColor("Random")
        .setFooter({
          text: `Poll by ${interaction.user.tag}`,
          iconURL: interaction.user.displayAvatarURL(),
        })
        .setTimestamp();

      const pollMessage = await pollChannel.send({
        embeds: [embed],
      });

      await pollMessage.react("✅");
      await pollMessage.react("🛑");

      if (hasNeutralvote) {
        await pollMessage.react("🔄");
      }

      await interaction.reply({
        content: "Your poll has been posted",
        ephemeral: true,
      });
    } catch (err) {
      console.error(err);
      await interaction.reply({
        content: `Something went wrong while submitting your poll, please inform the dev\n🧩 <@351211709492363264>`,
        ephemeral: true,
      });
    }
  },
};
