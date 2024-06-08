const fs = require("fs");

const ascii = require("ascii-table");
const tableB = new ascii().setHeading("Buttons", "Status");

module.exports = (bot) => {
  bot.componentHandler = async () => {
    const componentFolder = fs.readdirSync(`./src/components`);
    for (const folder of componentFolder) {
      const componentFiles = fs
        .readdirSync(`./src/components/${folder}`)
        .filter((file) => file.endsWith(".js"));

      const { buttons } = bot;

      switch (folder) {
        case "buttons":
          for (const file of componentFiles) {
            const button = require(`../../components/${folder}/${file}`);
            buttons.set(button.data.name, button);
            tableB.addRow(`${button.data.name}`, "loaded");
          }
          console.log(tableB.toString());
          break;

        default:
          break;
      }
    }
  };
};
