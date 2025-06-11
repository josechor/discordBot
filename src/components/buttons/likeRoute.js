const {
  ActionRowBuilder,
} = require("discord.js");
const Route = require("../../models/route");
const RouteLike = require("../../models/routeLike");
const { routeLikeButton } = require("../../shared/components/RouteLikeButton");
const {
  createRouteEmbed,
} = require("../../shared/components/createRouteEmbed");

module.exports = {
  data: {
    name: `likeRoute`,
  },
  async execute(interaction, client) {
    const routeId = interaction.customId.split("_")[1];
    const userId = interaction.user.id;
    const route = await Route.findByPk(routeId);
    if (!route) {
      return interaction.reply({
        content: "Ruta no encontrada.",
        ephemeral: true,
      });
    }
    const existingLike = await RouteLike.findOne({
      where: { userId, routeId },
    });
    if (existingLike === null) {
      await RouteLike.create({ userId, routeId });
      route.likes++;
    } else {
      await existingLike.destroy();
      route.likes--;
    }
    await route.save();

    const embed = createRouteEmbed(route);
    const likeButton = routeLikeButton(route.id, route.likes);

    await interaction.update({ embeds: [embed], components: [likeButton] });
  },
};
