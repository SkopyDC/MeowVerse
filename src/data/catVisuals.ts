import type {CatVisualConfig} from "../components/cats/types";import {CAT_PALETTES as p} from "./catPalettes";
export const CAT_VISUALS:Record<string,CatVisualConfig>={
  bublina:{furPrimary:p.blueGrey.primary,furSecondary:p.blueGrey.secondary,eyeColor:p.blueGrey.eyes,ears:"round",tail:"fluffy",hat:"fisher",outfit:"vest",tool:"rod",aura:"water"},
  lojza:{furPrimary:p.orange.primary,furSecondary:p.orange.secondary,eyeColor:p.orange.eyes,pattern:"stripes",hat:"straw",outfit:"vest",tool:"pitchfork",aura:"leaves"},
  mnaousef:{furPrimary:p.cream.primary,furSecondary:p.cream.secondary,eyeColor:p.cream.eyes,ears:"classic",tail:"curled",hat:"chef",outfit:"apron",tool:"spoon",aura:"fire"},
  ciperka:{furPrimary:p.tabby.primary,furSecondary:p.tabby.secondary,eyeColor:p.tabby.eyes,pattern:"stripes",ears:"pointed",tail:"classic",outfit:"scarf",tool:"bag",aura:"leaves"},
  ignac:{furPrimary:p.dark.primary,furSecondary:p.dark.secondary,eyeColor:p.dark.eyes,pattern:"mask",ears:"folded",tail:"short",outfit:"armor",tool:"sword",aura:"fire"},
  vila:{furPrimary:p.lake.primary,furSecondary:p.lake.secondary,eyeColor:p.lake.eyes,pattern:"spots",ears:"long",tail:"double",hat:"cap",aura:"water"},
  mnaoslav:{furPrimary:p.royal.primary,furSecondary:p.royal.secondary,eyeColor:p.royal.eyes,ears:"classic",tail:"fluffy",hat:"crown",outfit:"cape",aura:"legendary"},
  bublinaShiny:{furPrimary:"#c5e5e8",furSecondary:"#f8dcff",eyeColor:"#6551a8",ears:"round",tail:"fluffy",hat:"fisher",outfit:"vest",tool:"rod",aura:"sparkles",shiny:true},
  jiskra:{furPrimary:p.orange.primary,furSecondary:p.orange.secondary,eyeColor:p.orange.eyes,pattern:"stripes",hat:"chef",outfit:"apron",tool:"spoon",aura:"fire"},
  kapka:{furPrimary:p.blueGrey.primary,furSecondary:p.blueGrey.secondary,eyeColor:p.blueGrey.eyes,ears:"round",tail:"fluffy",hat:"fisher",outfit:"vest",tool:"rod",aura:"water"},
  listka:{furPrimary:"#8fbd72",furSecondary:"#dff0af",eyeColor:"#456f3d",pattern:"spots",tail:"curled",hat:"straw",outfit:"vest",aura:"leaves"},
  uhlik:{furPrimary:p.dark.primary,furSecondary:p.dark.secondary,eyeColor:p.dark.eyes,pattern:"mask",ears:"folded",tail:"short",outfit:"armor",tool:"sword",aura:"fire"},
  priliv:{furPrimary:p.lake.primary,furSecondary:p.lake.secondary,eyeColor:p.lake.eyes,ears:"pointed",tail:"classic",outfit:"scarf",tool:"bag",aura:"water"},
  mechule:{furPrimary:"#75a86b",furSecondary:"#d6e7a2",eyeColor:"#3f6339",pattern:"stripes",ears:"long",tail:"double",hat:"straw",aura:"leaves"}
};
export const visualFor=(id:string)=>CAT_VISUALS[id]||CAT_VISUALS.bublina!;
