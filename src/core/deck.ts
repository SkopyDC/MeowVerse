import type {Progress} from "../types";
export function pvpCatIds(progress:Progress){return Object.entries(progress.collection).filter(([,owned])=>owned.assignment==="pvp").map(([id])=>id);}
