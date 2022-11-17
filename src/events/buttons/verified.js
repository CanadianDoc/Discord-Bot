module.exports = {
	data: {
		name: "verified",
	},
	async execute(interaction, bot) {
		try {
			const role = interaction.guild.roles.cache.find((r) => r.name === "!");
			if (!role) {
				return interaction.reply({
					content: `Something went wrong while executing this command (No Role)`,
					ephemeral: true,
				});
			}

			return interaction.member.roles.add(role).then((member) =>
				interaction.reply({
					content: `${interaction.user.tag} has been verified`,
					ephemeral: true,
				})
			);
		} catch (err) {
			console.log(err);
		}
	},
};
