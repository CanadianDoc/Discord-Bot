const {
  SlashCommandBuilder,
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("participate")
    .setDescription("Lets server members participate in an event")
    .addStringOption((option) =>
      option
        .setName("title")
        .setDescription("Name of the event")
        .setRequired(true)
    )
    .addIntegerOption((option) =>
      option
        .setName("expire")
        .setDescription("How long until the buttons expire (minutes)")
        .setRequired(true)
    ),
  async execute(interaction, bot) {
    const title = interaction.options.getString("title");
    const buttons_expire = interaction.options.getInteger("expire");
    const expirationTimestamp = Date.now() + buttons_expire * 60000;

    const endTime = new Date(expirationTimestamp);
    const formattedEndTime = endTime.toLocaleString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });

    const embed = new EmbedBuilder()
      .setColor("#000000")
      .setTitle(title)
      .addFields(
        { name: "Yes", value: "0", inline: true },
        { name: "Maybe", value: "0", inline: true },
        { name: "No", value: "0", inline: true }
      )
      .setFooter({
        text: `This event ends at ${formattedEndTime}.`,
      });

    const row = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setCustomId("yesbutton")
        .setLabel("Yes")
        .setStyle(ButtonStyle.Success),
      new ButtonBuilder()
        .setCustomId("nobutton")
        .setLabel("No")
        .setStyle(ButtonStyle.Danger),
      new ButtonBuilder()
        .setCustomId("maybebutton")
        .setLabel("Maybe")
        .setStyle(ButtonStyle.Primary)
    );

    await interaction.deferReply();

    const message = await interaction.editReply({
      embeds: [embed],
      components: [row],
    });

    bot.participation = bot.participation || {};
    bot.participation[message.id] = {
      embed,
      title,
      expirationTimestamp,
      yes: [],
      no: [],
      maybe: [],
      messageId: message.id,
    };

    const checkExpiration = setInterval(async () => {
      const currentTimestamp = Date.now();

      if (currentTimestamp >= expirationTimestamp) {
        clearInterval(checkExpiration);

        const endDate = new Date();
        const formattedEndDate = endDate.toLocaleString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        });

        embed.setFooter({
          text: `This event ended at ${formattedEndDate}.`,
        });

        row.components.forEach((button) => button.setDisabled(true));
        await message.edit({
          embeds: [embed],
          components: [row],
        });
      }
    }, 1000);
  },
};
