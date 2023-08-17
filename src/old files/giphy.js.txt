const fetch = (...args) =>
	import("node-fetch").then(({ default: fetch }) =>
		fetch(...args)
	);
const {
	SlashCommandBuilder,
	EmbedBuilder,
} = require("discord.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("giphy")
		.setDescription("Search for a gif!")
		.addStringOption((option) =>
			option
				.setName("search")
				.setDescription(
					"Which gif would you like to search for?"
				)
				.setRequired(false)
		),
	async execute(interaction, bot) {
		const search =
			interaction.options.getString("search") || "random";
		const url = `https://api.giphy.com/v1/gifs/search?q=${search}&api_key=${process.env.giphyAPI}&limit=20&rating-pg`;
		var randomGif = Math.floor(Math.random() * 20);

		await fetch(url).then(async (gif) => {
			let meme = await gif.json();

			let title = meme.data.title;
			let memeurl = meme.data.images.original.url;
			let author = meme.data.user.display_name;

			const embed = new EmbedBuilder()
				.setTitle(title)
				.setImage(memeurl)
				.setColor("Random")
				.setFooter({
					text: `Gif by ${author} | Powered by Giphy | Requested by ${interaction.user.tag}`,
				});
		});
		await interaction.reply({
			embeds: [embed],
		});

		//console.log(url);
		//await interaction.reply({ content: "Searching..." });
	},
};
