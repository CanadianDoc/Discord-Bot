const axios = require("axios");
const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .setName("chat")
    .setDescription("Chat with DocAI. . .")
    .addStringOption((option) =>
      option
        .setName("message")
        .setDescription("What would you like to say?")
        .setRequired(true)
    ),

  async execute(interaction) {
    const userMessage = interaction.options.getString("message");
    const apiKey = process.env.openAIKEY;

    try {
      const response = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: "gpt-4o-mini",
          messages: [{ role: "user", content: userMessage }],
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`,
          },
        }
      );

      const botReply = response.data.choices[0].message.content;
      await interaction.reply(botReply);
    } catch (error) {
      console.error("Error with OpenAI API:", error);
      await interaction.reply({
        content: `Something went wrong while executing this button, please inform the dev\n🧩 <@351211709492363264>`,
        ephemeral: true,
      });
    }
  },
};
