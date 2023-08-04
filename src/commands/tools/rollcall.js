const {
  SlashCommandBuilder,
  EmbedBuilder,
  PermissionFlagsBits,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("rollcall")
    .setDescription("Calls for attendance check. . .")
    .addRoleOption((option) =>
      option
        .setName("role")
        .setDescription("The role to ping")
        .setRequired(false)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages),
  async execute(interaction, bot) {
    let role = interaction.options.getRole("role");
    let content = "Hey, who's coming?";

    if (role) {
      content = `Hey, who's coming? ${role}`;
    }

    const embed = new MessageEmbed()
      .setDescription(content)
      .setTitle("Roll Call")
      .setColor("Random")
      .setTimestamp(Date.now())
      .setFooter({
        iconURL: `${interaction.user.displayAvatarURL()}`,
        text: `Requested by ${interaction.user.tag}`,
      });

    const message = await interaction.reply({
      embeds: [embed],
      fetchReply: true,
    });
    await message.react("👍"); // Yes
    await message.react("👎"); // No
    await message.react("🤷"); // Maybe
  },
};
