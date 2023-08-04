const {
	SlashCommandBuilder,
	PermissionFlagsBits,
	EmbedBuilder,
	ActionRowBuilder,
	ButtonBuilder,
	ButtonStyle,
} = require("discord.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("reactionroles")
		.setDescription("Sets up reaction roles...")
		.addChannelOption((option) =>
			option
				.setName("channel")
				.setDescription("Select the channel you want this in")
				.setRequired(true)
		)
		.setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
	async execute(interaction, bot) {
		const channel = interaction.options.getChannel("channel");
		const embed = new EmbedBuilder()
			.setTitle("Reaction Roles")
			.setDescription("React to get a role!")
			.setColor(0x0824f4);

		let sendChannel = channel.send({
			embeds: [embed],
			components: [
				new ActionRowBuilder()
					.addComponents(
						new ButtonBuilder()
							.setCustomId("mcrole")
							.setLabel("MineCraft")
							.setStyle(ButtonStyle.Primary)
					)
					.addComponents(
						new ButtonBuilder()
							.setCustomId("csgorole")
							.setLabel("CS:GO")
							.setStyle(ButtonStyle.Primary)
					)
					.addComponents(
						new ButtonBuilder()
							.setCustomId("tarkovrole")
							.setLabel("Tarkov")
							.setStyle(ButtonStyle.Primary)
					)
					.addComponents(
						new ButtonBuilder()
							.setCustomId("pgrole")
							.setLabel("Paradox Games")
							.setStyle(ButtonStyle.Primary)
					),
				new ActionRowBuilder()
					.addComponents(
						new ButtonBuilder()
							.setCustomId("sixrole")
							.setLabel("Rainbow: Six Siege")
							.setStyle(ButtonStyle.Primary)
					)
					.addComponents(
						new ButtonBuilder()
							.setCustomId("wtrole")
							.setLabel("War Thunder")
							.setStyle(ButtonStyle.Primary)
					)
					.addComponents(
						new ButtonBuilder()
							.setCustomId("dcsrole")
							.setLabel("DCS")
							.setStyle(ButtonStyle.Primary)
					),
			],
		});
		if (!sendChannel) {
			return interaction.reply({
				content: "Error! Insufficient Permission: [Send Message]",
				ephemeral: true,
			});
		} else {
			return interaction.reply({
				content: "Reaction Role Channel succesfully set up!",
				ephemeral: true,
			});
		}
	},
};
