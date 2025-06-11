import { ButtonBuilder, ButtonStyle, ActionRowBuilder } from "discord.js";

export function routeLikeButton(routeId, likes) {
  const button = new ButtonBuilder()
    .setCustomId(`likeRoute_${routeId}`)
    .setLabel(`⭐ ${likes}`)
    .setStyle(ButtonStyle.Primary);

  return new ActionRowBuilder().addComponents(button);
}
