const { SlashCommandBuilder } = require("discord.js");
const Route = require("../../models/route");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("rutascontador")
    .setDescription("Cuenta las rutas por usuario")
    .addUserOption((option) =>
      option
        .setName("usuario")
        .setDescription("Usuario del que quieres contar las rutas")
        .setRequired(false)
    ),

  async execute(interaction, client) {
    const user = interaction.options.getUser("usuario") || interaction.user;
    const userId = user.id;

    const routeCount = await Route.count({ where: { userId } });

    await interaction.reply({
      content: `El usuario <@${userId}> tiene un total de ${routeCount} rutas.`,
      ephemeral: true,
    });
  },
};