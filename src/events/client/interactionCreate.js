module.exports = {
  name: "interactionCreate",
  async execute(interaction, client) {
    if (interaction.isChatInputCommand()) {
      const { commands } = client;
      const { commandName } = interaction;
      const command = commands.get(commandName);
      if (!command) return;

      try {
        command.execute(interaction, client);
      } catch (error) {
        console.log(error);
        await interaction.reply({
          content: `Algún error acaba de ocurrir`,
          ephemeral: true,
        });
      }
    } else if (interaction.isButton()) {
      const { buttons } = client;
      const { customId } = interaction;
      const button = buttons.get(customId.split("_")[0]);
      if (!button) return new Error("No hay ningún código para este botón");
      try {
        await button.execute(interaction, client);
      } catch (error) {
        console.log(error);
      }
    } else if (interaction.isStringSelectMenu()) {
      const { selectMenus } = client;
      const { customId } = interaction;
      const menu = selectMenus.get(customId);
      if (!menu) throw new Error("No hay ningún código apra este selectMenu");
      try {
        await menu.execute(interaction, client);
      } catch (error) {
        console.log(error);
      }
    }
  },
};
