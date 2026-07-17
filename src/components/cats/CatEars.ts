import type {CatEars as EarType,CatVisualConfig} from "./types";
const ears:Record<EarType,string>={classic:'<path d="M72 72L78 28l38 26m68 18l-6-44-38 26"/>',pointed:'<path d="M70 72L84 20l32 35m70 17l-14-52-32 35"/>',round:'<path d="M68 69q-3-42 38-34l12 25m70 9q3-42-38-34l-12 25"/>',folded:'<path d="M72 71q2-37 42-23L91 70m93 1q-2-37-42-23l23 22"/>',long:'<path d="M75 72L72 25q11-20 24 1l21 35m64 11l3-47q-11-20-24 1l-21 35"/>'};
export function CatEars(config:CatVisualConfig){return `<g class="cat-ears" style="--fur:${config.furPrimary}">${ears[config.ears||"classic"]}</g>`;}
