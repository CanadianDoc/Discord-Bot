module.exports = {
  data: {
    name: "maybebutton",
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
      case "yes":
        participationEvent.yes = participationEvent.yes.filter(
          (tag) => tag !== userTag
        );
        participationEvent.maybe.push(userTag);
        interaction.followUp({
          content: "You have swapped your vote from yes to maybe!",
          ephemeral: true,
        });
        break;

      case "no":
        participationEvent.no = participationEvent.no.filter(
          (tag) => tag !== userTag
        );
        participationEvent.maybe.push(userTag);
        interaction.followUp({
          content: "You have swapped your vote from no to maybe!",
          ephemeral: true,
        });
        break;

      case "maybe":
        participationEvent.maybe.pop(userTag);
        interaction.followUp({
          content: "You are no longer voting for maybe!",
          ephemeral: true,
        });
        break;

      default:
        participationEvent.maybe.push(userTag);
        interaction.followUp({
          content: "You have voted maybe!",
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
