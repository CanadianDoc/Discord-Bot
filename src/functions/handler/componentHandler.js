const fs = require("fs");
const ascii = require("ascii-table");
const tableB = new ascii().setHeading("Button", "Status");
const tableM = new ascii().setHeading("Modal", "Status");

module.exports = (bot) => {
  bot.componentHandler = async () => {
    const componentFolder = fs.readdirSync(`./src/components`);
    for (const folder of componentFolder) {
      const componentFiles = fs
        .readdirSync(`./src/components/${folder}`)
        .filter((file) => file.endsWith(".js"));

      const { buttons } = bot;
      const { modals } = bot;

      switch (folder) {
        case "buttons":
          for (const file of componentFiles) {
            const button = require(`../../components/${folder}/${file}`);
            buttons.set(button.data.name, button);
            tableB.addRow(button.data.name, "Loaded");
          }
          console.log(tableB.toString());
          break;

        case "modals":
          for (const file of componentFiles) {
            const modal = require(`../../components/${folder}/${file}`);
            modals.set(modal.data.customId, modal);
            tableM.addRow(modal.data.customId, "Loaded");
          }
          console.log(tableM.toString());
          break;

        default:
          break;
      }
    }
  };
};
