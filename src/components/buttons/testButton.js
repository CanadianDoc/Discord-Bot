module.exports = {
    data: {
        name: 'testbutton'
    },
    async execute(interaction, bot) {
        await interaction.reply({
            content: 'hello'
        });
    }
}