const { SlashCommandBuilder } = require("discord.js");
const Route = require("../../models/route");
const {
  showPaginatedRoutes,
} = require("../../shared/components/showPaginatedRoutes");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("rutas")
    .setDescription("Devuelve las rutas de un usuario")
    .addUserOption((option) =>
      option
        .setName("usuario")
        .setDescription("Usuario del que quieres contar las rutas")
        .setRequired(false)
    ),

  async execute(interaction, client) {
    const user = interaction.options.getUser("usuario") || interaction.user;
    const userId = user.id;

    const routes = await Route.findAll({
      where: { userId },
      order: [["createdAt", "DESC"]],
    });
    if (routes.length === 0) {
      return interaction.reply({
        content: `El usuario <@${userId}> no tiene rutas.`,
        ephemeral: true,
      });
    }

    await showPaginatedRoutes(interaction, routes, userId);
  },
};
