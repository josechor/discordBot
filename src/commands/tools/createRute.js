const { SlashCommandBuilder } = require("discord.js");
const Route = require("../../models/route.js");
const {
  createRouteEmbed,
} = require("../../shared/components/createRouteEmbed.js");
const {
  routeLikeButton,
} = require("../../shared/components/RouteLikeButton.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("rutita")
    .setDescription("Añade una ruta")
    .addStringOption((option) =>
      option
        .setName("nombre")
        .setDescription("Nombre de la ruta")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option.setName("link").setDescription("Link a la ruta").setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("dificultad")
        .setDescription("Nivel de dificultad")
        .setRequired(true)
        .addChoices(
          { name: "Facil", value: "Facil" },
          { name: "Media", value: "Media" },
          { name: "Dificil", value: "Dificil" },
          { name: "Mortal", value: "Mortal" }
        )
    )
    .addNumberOption((option) =>
      option
        .setName("km")
        .setDescription("Distancia en kilómetros")
        .setRequired(false)
    )
    .addNumberOption((option) =>
      option
        .setName("desnivel")
        .setDescription("Desnivel (m)")
        .setRequired(false)
    ),

  async execute(interaction, client) {
    const nombre = interaction.options.getString("nombre");
    const link = interaction.options.getString("link");
    const km = interaction.options.getNumber("km");
    const altitud = interaction.options.getNumber("desnivel");
    const dificultad = interaction.options.getString("dificultad");

    const route = await Route.create({
      nombre,
      link,
      km,
      altitud,
      dificultad,
    });

    const embed = createRouteEmbed(route);

    const likeButton = routeLikeButton(route.id, route.likes);
    await interaction.reply({ embeds: [embed], components: [likeButton] });
  },
};
