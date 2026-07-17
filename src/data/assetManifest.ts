export const assets = {
  backgrounds: { island: "/assets/backgrounds/island-sky.svg", arena: "/assets/backgrounds/arena.svg" },
  buildings: { pond: "/assets/buildings/pond.svg", home: "/assets/buildings/cat-home.svg", arena: "/assets/buildings/arena-gate.svg" },
  cats: {
    jiskra: "/assets/cats/jiskra.svg", kapka: "/assets/cats/kapka.svg", listka: "/assets/cats/listka.svg",
    koralo: "/assets/cats/koralo.svg", lavous: "/assets/cats/lavous.svg", vesmir: "/assets/cats/vesmir.svg",
    shinyListka: "/assets/cats/listka-shiny.svg", silhouette: "/assets/cats/silhouette.svg"
  },
  packs: { chest: "/assets/packs/cat-chest.svg" },
  icons: { island: "/assets/icons/island.svg", cats: "/assets/icons/cats.svg", packs: "/assets/icons/packs.svg", arena: "/assets/icons/arena.svg", fish: "/assets/icons/fish.svg", diamond: "/assets/icons/diamond.svg", settings: "/assets/icons/settings.svg" },
  effects: { sparkle: "/assets/effects/sparkle.svg" },
  ui: { frame: "/assets/ui/profile-frame.svg", paw: "/assets/ui/paw.svg" },
  audio: {} as Record<string,string>
} as const;

export const detailedCatIds=new Set(["jiskra","kapka","listka","koralo","lavous","vesmir"]);
export function catAsset(id:string,shiny=false){if(shiny&&id==="listka")return assets.cats.shinyListka;return detailedCatIds.has(id)?assets.cats[id as keyof typeof assets.cats]:assets.cats.silhouette;}
export const preloadAssets=[assets.backgrounds.island,assets.backgrounds.arena,...Object.values(assets.buildings),...Object.values(assets.cats),assets.packs.chest,...Object.values(assets.icons)];
