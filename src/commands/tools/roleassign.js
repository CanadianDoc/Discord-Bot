const {
  ButtonBuilder,
  ButtonStyle,
  EmbedBuilder,
  ActionRowBuilder,
  SlashCommandBuilder,
} = require("discord.js");

function createRoleButton(roleId) {
  //console.log("createRoleButton called with " + roleId);
  return new ButtonBuilder()
    .setCustomId(`assign-role-${roleId}`)
    .setLabel("Toggle Role")
    .setStyle(ButtonStyle.Primary);
}

module.exports = {
  data: new SlashCommandBuilder()
    .setName("rolebutton")
    .setDescription("Makes a button that gives or removes a role")
    .addRoleOption((option) =>
      option
        .setName("role")
        .setDescription("The role to give to the user.")
        .setRequired(true)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

  async execute(interaction, bot) {
    const role = interaction.options.getRole("role");
    const row = new ActionRowBuilder().addComponents(createRoleButton(role.id));

    const embed = new EmbedBuilder()
      .setColor(role.color || "Random")
      .setTitle(`**${role.name}**`);

    await interaction.reply({
      content: "",
      embeds: [embed],
      components: [row],
    });
  },
};
