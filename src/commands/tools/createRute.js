const {
  SlashCommandBuilder,
  EmbedBuilder,
  ButtonBuilder,
  ButtonStyle,
  ActionRowBuilder,
} = require("discord.js");
const Route = require("../../models/route.js");

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

    const dificultadColores = {
      Facil: 0x2ecc71,
      Media: 0xf1c40f,
      Dificil: 0xe74c3c,
      Mortal: 0x000000,
    };

    const embed = new EmbedBuilder()
      .setTitle(`🌄 ${nombre.toUpperCase()}`)
      .setDescription(
        `📍 [Ver ruta](${link})\n\n` +
          `🏔️ **Dificultad:** ${dificultad}\n` +
          `📏 **Distancia:** ${km ? `${km} km` : "No especificada"}\n` +
          `📈 **Desnivel:** ${altitud ? `${altitud} m` : "No especificada"}`
      )
      .setColor(dificultadColores[dificultad])
      .setTimestamp();

    const likeButton = new ButtonBuilder()
      .setCustomId(`likeRoute_${route.id}`)
      .setLabel("⭐ Like")
      .setStyle(ButtonStyle.Primary);

    const row = new ActionRowBuilder().addComponents(likeButton);
    await interaction.reply({ embeds: [embed], components: [row] });
  },
};
