import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  EmbedBuilder,
} from "discord.js";

export async function showPaginatedRoutes(interaction, routes, userId) {
  const pageSize = 3;
  let currentPage = 0;

  const totalPages = Math.ceil(routes.length / pageSize);

  const getEmbed = (page) => {
    const start = page * pageSize;
    const end = start + pageSize;
    const currentRoutes = routes.slice(start, end);

    const description = currentRoutes
      .map((route, index) => {
        return (
          `📌**${start + index + 1}. ${route.nombre}**\n📍 [Ver ruta](${
            route.link
          })\n` +
          `🏔️ **Dificultad:** ${route.dificultad}\n` +
          `📏 **Distancia:** ${
            route.km ? `${route.km} km` : "No especificada"
          }\n` +
          `📈 **Altitud:** ${
            route.altitud ? `${route.altitud} m` : "No especificada"
          }\n` +
          `⭐ **Likes:** ${route.likes}`
        );
      })
      .join("\n\n");

    return new EmbedBuilder()
      .setDescription(description)
      .setColor(0x00bfff)
      .setTimestamp();
  };

  const getButtons = (page) => {
    return new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setCustomId("prev")
        .setLabel("⏮ Anterior")
        .setStyle(ButtonStyle.Secondary)
        .setDisabled(page === 0),
      new ButtonBuilder()
        .setCustomId("Number")
        .setLabel(`${currentPage + 1}/${totalPages.toString()}`)
        .setStyle(ButtonStyle.Secondary)
        .setDisabled(true),
      new ButtonBuilder()
        .setCustomId("next")
        .setLabel("Siguiente ⏭")
        .setStyle(ButtonStyle.Secondary)
        .setDisabled(page === totalPages - 1)
    );
  };

  const reply = await interaction.reply({
    content: `Rutas de <@${userId}>:`,
    embeds: [getEmbed(currentPage)],
    components: [getButtons(currentPage)],
    fetchReply: true,
  });

  const collector = reply.createMessageComponentCollector({
    time: 60_000,
  });

  collector.on("collect", async (btnInt) => {
    if (btnInt.user.id !== interaction.user.id) {
      return btnInt.reply({
        content: "No puedes usar estos botones.",
        ephemeral: true,
      });
    }

    if (btnInt.customId === "prev") currentPage--;
    if (btnInt.customId === "next") currentPage++;

    await btnInt.update({
      embeds: [getEmbed(currentPage)],
      components: [getButtons(currentPage)],
    });
  });

  collector.on("end", async () => {
    // Desactiva los botones cuando termina el tiempo
    await reply.edit({
      components: [
        getButtons(currentPage).setComponents(
          ...getButtons(currentPage).components.map((btn) =>
            btn.setDisabled(true)
          )
        ),
      ],
    });
  });
}
