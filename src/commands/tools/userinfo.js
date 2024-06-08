const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("userinfo")
    .setDescription("Displays information about a user. . .")
    .addUserOption((option) =>
      option.setName("name").setDescription("Lookup who?").setRequired(true)
    ),

  async execute(interaction, bot) {
    const serverName = interaction.guild.name;
    const user = interaction.options.getUser("name");
    const member = await interaction.guild.members.fetch(user.id);
    const Usericon = user.avatarURL();

    const roles = member.roles.cache
      .filter((r) => r.id !== interaction.guild.id)
      .map((r) => r.toString())
      .join(", ");

    const embed = new EmbedBuilder()
      .setTitle(`**__User__**`)
      .setThumbnail(Usericon)
      .addFields(
        { name: "Account Name:", value: `${user.tag}` },
        { name: "User ID:", value: `${user.id}` },
        {
          name: "Account Created:",
          value: `<t:${parseInt(user.createdTimestamp / 1000)}:R>`,
        },
        { name: "Roles:", value: roles || "No Roles" }
      )
      .setTimestamp(Date.now())
      .setFooter({
        text: `Asked by ${interaction.user.tag} in ${serverName}`,
      })
      .setColor(member.displayColor || "Random");

    await interaction.reply({
      embeds: [embed],
    });
  },
};
