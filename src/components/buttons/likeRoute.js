const {
  EmbedBuilder,
  ButtonStyle,
  ActionRowBuilder,
  ButtonBuilder,
} = require("discord.js");
const Route = require("../../models/route");
const RouteLike = require("../../models/routeLike");

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
    console.log(route.likes);
    console.log();

    const dificultadColores = {
      Facil: 0x2ecc71,
      Media: 0xf1c40f,
      Dificil: 0xe74c3c,
      Mortal: 0x000000,
    };

    const embed = new EmbedBuilder()
      .setTitle(`🌄 ${route.nombre}`)
      .setDescription(
        `📍 [Ver ruta](${route.link})\n\n` +
          `🏔️ **Dificultad:** ${route.dificultad}\n` +
          `📏 **Distancia:** ${
            route.km ? `${route.km} km` : "No especificada"
          }\n` +
          `📈 **Altitud:** ${
            route.altitud ? `${route.altitud} m` : "No especificada"
          }\n\n` +
          `⭐ **Likes:** ${route.likes}`
      )
      .setColor(dificultadColores[route.dificultad])
      .setTimestamp();

    const likeButton = new ButtonBuilder()
      .setCustomId(`likeRoute_${route.id}`)
      .setLabel("⭐ Like")
      .setStyle(ButtonStyle.Primary);

    const row = new ActionRowBuilder().addComponents(likeButton);

    await interaction.update({ embeds: [embed], components: [row] });
  },
};
