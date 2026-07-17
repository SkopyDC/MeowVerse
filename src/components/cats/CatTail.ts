import type {CatTail as TailType,CatVisualConfig} from "./types";
const tails:Record<TailType,string>={classic:'<path d="M172 191q54-5 30-47"/>',fluffy:'<path d="M169 193q69 3 42-60" class="fluffy"/>',short:'<path d="M173 193q29 0 25-22"/>',curled:'<path d="M171 194q62 13 45-38q-10-24-28-5q-9 11 5 19"/>',double:'<path d="M170 190q56 4 35-49m-34 58q55 18 51-35"/>'};
export function CatTail(config:CatVisualConfig){return `<g class="cat-tail" style="--fur:${config.furPrimary}">${tails[config.tail||"classic"]}</g>`;}
