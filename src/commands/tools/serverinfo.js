const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("serverinfo")
    .setDescription("Displays all the information about this server"),

  async execute(interaction, bot) {
    const members = interaction.guild.memberCount;
    const DateCreated = interaction.guild.createdAt.toDateString();
    const serverName = interaction.guild.name;
    const owner = await interaction.guild.fetchOwner();
    const Servericon = interaction.guild.iconURL();
    const guildID = interaction.guild.id;

    const embed = new EmbedBuilder().setTitle(`__${serverName} Information__`);

    if (Servericon) {
      embed.setThumbnail(Servericon);
      console.log(`Server Icon: ${Servericon}`);
    }

    embed
      .addFields(
        { name: "Server Owner", value: `${owner}` },
        {
          name: "Server Name",
          value: `${serverName}`,
          inline: true,
        },
        {
          name: "Members",
          value: `${members}`,
          inline: true,
        },
        {
          name: "Date Created",
          value: `${DateCreated}`,
          inline: true,
        },
        {
          name: "Server ID",
          value: `${guildID}`,
          inline: true,
        }
      )
      .setTimestamp(Date.now())
      .setFooter({
        text: `Asked by ${interaction.user.tag} in ${serverName}`,
      })
      .setColor(0xe3c05f);

    await interaction.reply({
      embeds: [embed],
    });
  },
};
