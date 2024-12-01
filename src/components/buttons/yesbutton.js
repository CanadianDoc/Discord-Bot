module.exports = {
  data: {
    name: "yesbutton",
  },

  async execute(interaction, bot) {
    //console.log("button was pressed");
    const participationEvent = bot.participation[interaction.message.id];

    if (Date.now() > participationEvent.expirationTimestamp) {
      return interaction.reply({
        content: "Sorry, this event has expired.",
        ephemeral: true,
      });
    }

    const userTag = interaction.user;
    let currentVote = null;

    if (participationEvent.yes.includes(userTag)) {
      currentVote = "yes";
    } else if (participationEvent.maybe.includes(userTag)) {
      currentVote = "maybe";
    } else if (participationEvent.no.includes(userTag)) {
      currentVote = "no";
    }

    await interaction.deferUpdate();

    switch (currentVote) {
      case "maybe":
        participationEvent.maybe = participationEvent.maybe.filter(
          (tag) => tag !== userTag
        );
        participationEvent.yes.push(userTag);
        interaction.followUp({
          content: "You have swapped your vote from maybe to yes!",
          ephemeral: true,
        });
        break;

      case "no":
        participationEvent.no = participationEvent.no.filter(
          (tag) => tag !== userTag
        );
        participationEvent.yes.push(userTag);
        interaction.followUp({
          content: "You have swapped your vote from no to yes!",
          ephemeral: true,
        });
        break;

      case "yes":
        participationEvent.yes.pop(userTag);
        interaction.followUp({
          content: "You are no longer voting for yes!",
          ephemeral: true,
        });
        break;

      default:
        participationEvent.yes.push(userTag);
        interaction.followUp({
          content: "You have voted yes!",
          ephemeral: true,
        });
    }

    participationEvent.embed.setFields(
      {
        name: "Yes",
        value: `${participationEvent.yes.length} votes\n${participationEvent.yes}`,
        inline: true,
      },
      {
        name: "No",
        value: `${participationEvent.no.length} votes\n${participationEvent.no}`,
        inline: true,
      },
      {
        name: "Maybe",
        value: `${participationEvent.maybe.length} votes\n${participationEvent.maybe}`,
        inline: true,
      }
    );

    await interaction.editReply({
      embeds: [participationEvent.embed],
      components: interaction.message.components,
    });
  },
};
