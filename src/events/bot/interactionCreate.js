const { GatewayIntentBits } = require("discord.js");

module.exports = {
	name: "interactionCreate",
	async execute(interaction, bot) {
		if (interaction.isChatInputCommand()) {
			const { commands } = bot;
			const { commandName } = interaction;
			const command = commands.get(commandName);
			if (!command) return;

			try {
				await command.execute(interaction, bot);
			} catch (err) {
				console.error(err);
				await interaction.reply({
					content: `Something went wrong while executing this command, please inform Doc about it thank you!`,
					ephemeral: true,
				});
			}
		} else if (interaction.isButton()) {
			const { buttons } = bot;
			const { customId } = interaction;
			const button = buttons.get(customId);
			if (!button) {
				console.log("No customId associated with this button");
				return new Error("No customId associated with this button");
			}

			try {
				await button.execute(interaction, bot);
			} catch (err) {
				console.log(err);
			}
		}
	},
};
