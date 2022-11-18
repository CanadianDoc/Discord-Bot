const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("8ball")
		.setDescription("What does the 8ball say?...")
		.addStringOption((option) =>
			option
				.setName("question")
				.setDescription("What would you like to ask the magic 8ball?")
				.setRequired(true)
		),
	async execute(interaction, bot) {
		const options = [
			"My answer would be a no",
			"Mayhaps",
			"It is certain",
			"It is decidely so",
			"Without a doubt",
			"Definately",
			"Most likely",
			"Signs point to yes",
			"It would be better for me to not say it",
			"Ask again later",
			"No",
			"Depends on the mood of the gods",
			"Hang in there bud",
			"This is just the beginning, its going to get a whole lot worse",
			"This is just the beginning, its going to get a whole lot better",
			"Good luck",
			"Oh... um, good luck?",
			"If you want your life to be a little more adventurous you absolutely should, because remember the 8ball turned two strangers into famous entrepreneurs",
			"Listen I am just going to say this in a affirmative but in a non-committal way. ...yeah, sure...",
			"Listen I am just going to say this in a negative but in a non-committal way. ...no, probably not...",
			"Listen asking random questions to a digital magic 8ball doesn't count as a personality trait",
			"My sources say no, but they also said that the queen was immortal",
			"My sources say yes, but they also said that the queen was immortal",
			"You wish",
			"All I am going to say is that you will probably die, and don't take this as a threat",
			"All I am going to say is that you will probably die, and do take this as a threat",
			"Honestly are those the questions that you should be asking a digital 8ball?",
			"I am not saying no... but all I am saying is that I probably wouldn't",
			"I am not saying yes... but all I am saying is that I probably would",
			"I am not saying no... but all I am saying is that I probably would",
			"I am not saying yes... but all I am saying is that I probably wouldn't",
			"Trust me, you don't want to know",
			"Trust me, you REALLY don't want to know",
			"Don't know, Don't care",
			"Listen I am a digital 8ball, you think I'd know?",
			"Yes this is a simulation, wake up",
			"You really just gonna collect these L's huh",
			"Damn bro, here just take this L and leave",
		];

		const question = interaction.options.getString("question");
		const answer = Math.floor(Math.random() * options.length);
		//${options[answer]}
		const embed = new EmbedBuilder()
			.setTitle("Magic 8ball says:")
			.setDescription(`You asked ${question}`)
			.addFields([
				{
					name: `Magic 8ball says:`,
					value: `${options[answer]}`,
					inline: true,
				},
			])
			.setColor("Random")
			.setTimestamp(Date.now())
			.setFooter({
				iconURL: `${interaction.user.displayAvatarURL()}`,
				text: `Asked by ${interaction.user.tag}`,
			});

		await interaction.reply({
			embeds: [embed],
		});
	},
};
