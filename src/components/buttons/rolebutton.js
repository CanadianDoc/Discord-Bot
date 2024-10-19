module.exports = {
  data: {
    name: "assign-role-",
  },

  async execute(interaction, bot) {
    //console.log("roleButton.js executed");
    const roleId = interaction.customId.split("-")[2];
    const role = interaction.guild.roles.cache.get(roleId);
    if (!role) {
      await interaction.reply({
        content: "Role does not exist.",
        ephemeral: true,
      });
      return;
    }

    const member = interaction.member;
    if (member.roles.cache.has(roleId)) {
      await member.roles.remove(role);
      await interaction.reply({
        content: `Removed your ${role.name} role! `,
        ephemeral: true,
      });
    } else {
      await member.roles.add(role);
      await interaction.reply({
        content: `You have been given the ${role.name} role!`,
        ephemeral: true,
      });
    }
  },
};
