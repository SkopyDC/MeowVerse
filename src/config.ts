import type { Rarity } from "./types";

export const GAME_CONFIG = Object.freeze({
  deckSize: 20,
  handSize: 5,
  expandedHandSize: 6,
  maxRounds: 7,
  winsToFinish: 3,
  levelPower: 2,
  maxCatLevel: 10,
  elementalBonus: 0.25,
  shinyChance: 0.01,
  diamondShinyChance: 0.04,
  packFishCost: 50,
  packDiamondCost: 25,
  copyLimits: { "Běžná": 3, "Vzácná": 3, "Epická": 2, "Legendární": 1, "Mýtická": 1 } satisfies Record<Rarity, number>,
});
