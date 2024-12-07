module.exports = {
  data: {
    name: "nobutton",
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
        participationEvent.no.push(userTag);
        interaction.followUp({
          content: "You have swapped your vote from yes to no!",
          ephemeral: true,
        });
        break;

      case "maybe":
        participationEvent.maybe = participationEvent.maybe.filter(
          (tag) => tag !== userTag
        );
        participationEvent.no.push(userTag);
        interaction.followUp({
          content: "You have swapped your vote from maybe to no!",
          ephemeral: true,
        });
        break;

      case "no":
        participationEvent.no.pop(userTag);
        interaction.followUp({
          content: "You are no longer voting for no!",
          ephemeral: true,
        });
        break;

      default:
        participationEvent.no.push(userTag);
        interaction.followUp({
          content: "You have voted no!",
          ephemeral: true,
        });
    }

    totalParticipants =
      participationEvent.yes.length +
      participationEvent.maybe.length +
      participationEvent.no.length;
    participationEvent.embed.setFields(
      {
        name: `Yes (${Math.round(
          (participationEvent.yes.length / totalParticipants) * 100,
          2
        )}%)`,
        value: `${
          participationEvent.yes.length
        } votes\n${participationEvent.yes.join("\n")}`,
        inline: true,
      },
      {
        name: `No (${Math.round(
          (participationEvent.no.length / totalParticipants) * 100,
          2
        )}%)`,
        value: `${
          participationEvent.no.length
        } votes\n${participationEvent.no.join("\n")}`,
        inline: true,
      },
      {
        name: `Maybe (${Math.round(
          (participationEvent.maybe.length / totalParticipants) * 100,
          2
        )}%)`,
        value: `${
          participationEvent.maybe.length
        } votes\n${participationEvent.maybe.join("\n")}`,
        inline: true,
      }
    );

    await interaction.editReply({
      embeds: [participationEvent.embed],
      components: interaction.message.components,
    });
  },
};
