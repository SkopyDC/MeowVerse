import type {CatPattern,CatVisualConfig} from "./types";
const patterns:Record<CatPattern,string>={
  none:"",stripes:'<path d="M91 69l12 15m50-15-12 15M105 154l8 12m30-12-8 12" class="cat-mark"/>',
  spots:'<ellipse cx="99" cy="91" rx="13" ry="9" class="cat-mark"/><ellipse cx="151" cy="151" rx="14" ry="10" class="cat-mark"/>',
  mask:'<path d="M85 82q43-28 86 0l-14 35H99z" class="cat-mark"/>'
};
export function CatBody(config:CatVisualConfig){return `<g class="cat-body" style="--fur:${config.furPrimary};--fur2:${config.furSecondary||config.furPrimary}"><ellipse cx="128" cy="187" rx="53" ry="42" class="fur"/><ellipse cx="128" cy="190" rx="25" ry="30" class="fur-secondary"/><ellipse cx="96" cy="216" rx="20" ry="12" class="fur"/><ellipse cx="160" cy="216" rx="20" ry="12" class="fur"/><circle cx="128" cy="106" r="66" class="fur"/>${patterns[config.pattern||"none"]}</g>`;}
