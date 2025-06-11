import { EmbedBuilder } from "discord.js";

const dificultadColores = {
  Facil: 0x00ff00,
  Media: 0xffff00,
  Dificil: 0xff0000,
  Mortal: 0x8b0000,
};

export function createRouteEmbed(route) {
  return new EmbedBuilder()
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
    .setColor(dificultadColores[route.dificultad] || 0x3498db)
    .setTimestamp();
}
