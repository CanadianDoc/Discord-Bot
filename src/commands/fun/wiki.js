const {
  SlashCommandBuilder,
  EmbedBuilder,
  ButtonBuilder,
  ActionRowBuilder,
  ButtonStyle,
} = require("discord.js");
const axios = require("axios");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("wiki")
    .setDescription("Gets a random Wikipedia page or a specific one")
    .addStringOption((option) =>
      option
        .setName("page")
        .setDescription("What would you like to see?")
        .setRequired(false)
    ),

  async execute(interaction, bot) {
    const page = interaction.options.getString("page");
    let url, title, summary;

    try {
      if (!page) {
        const response = await axios.get(
          "https://en.wikipedia.org/api/rest_v1/page/random/summary"
        );
        url = response.data.content_urls.desktop.page;
        title = response.data.title;
        summary = response.data.extract;
      } else {
        const encodedPage = encodeURIComponent(page);
        const response = await axios.get(
          `https://en.wikipedia.org/api/rest_v1/page/summary/${encodedPage}`
        );
        url = response.data.content_urls.desktop.page;
        title = response.data.title;
        summary = response.data.extract;
      }

      const embed = new EmbedBuilder()
        .setTitle(`${title}`)
        .setThumbnail(
          "https://en.wikipedia.org/static/images/icons/wikipedia.png"
        )
        .setDescription(`${summary.substring(0, 200)}...`)
        .setTimestamp(Date.now())
        .setFooter({
          text: `Asked by ${interaction.user.tag} in ${interaction.guild.name}`,
        })
        .setColor("Random");

      await interaction.reply({
        embeds: [embed],
        components: [
          new ActionRowBuilder().setComponents(
            new ButtonBuilder()
              .setLabel("Read More")
              .setStyle(ButtonStyle.Link)
              .setURL(url)
          ),
        ],
      });
    } catch (error) {
      console.error("Error fetching Wikipedia data:", error);
    }
  },
};
