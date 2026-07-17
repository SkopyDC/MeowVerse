import {CatBody} from "./CatBody";import {CatEars} from "./CatEars";import {CatEffects} from "./CatEffects";import {CatFace} from "./CatFace";import {CatHat} from "./CatHat";import {CatOutfit} from "./CatOutfit";import {CatTail} from "./CatTail";import {CatTool} from "./CatTool";import type {CatSize,CatVisualConfig} from "./types";
export function CatAvatar(config:CatVisualConfig,size:CatSize="card",label="Kočka"){
  return `<span class="cat-avatar cat-avatar--${size}" role="img" aria-label="${label}"><svg viewBox="0 0 256 256" overflow="hidden" aria-hidden="true"><g class="cat-idle">${CatEffects(config.aura,config.shiny)}${CatTail(config)}${CatEars(config)}${CatBody(config)}${CatOutfit(config.outfit)}${CatFace(config)}${CatHat(config.hat)}${CatTool(config.tool)}</g></svg></span>`;
}
