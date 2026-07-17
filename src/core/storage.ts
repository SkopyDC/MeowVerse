import type {OwnedCat,Progress} from "../types";

export const STORAGE_KEY="meowverse-progress-v2";
export const defaultOwned=(assignment:OwnedCat["assignment"]=null):OwnedCat=>({count:1,assignment});
export const freshProgress=():Progress=>({
  fish:20,diamonds:0,medals:0,pondLevel:1,pondAt:Date.now()-300000,
  collection:{jiskra:defaultOwned("pvp"),kapka:defaultOwned("pond")},
  tutorialStep:0,pendingCatId:null,wins:0,losses:0
});
export function loadProgress(raw:string|null):Progress{
  if(!raw)return freshProgress();
  try{const parsed=JSON.parse(raw) as Partial<Progress>;const base=freshProgress();return {...base,...parsed,collection:{...base.collection,...parsed.collection}};}catch{return freshProgress();}
}
export const saveProgress=(progress:Progress)=>localStorage.setItem(STORAGE_KEY,JSON.stringify(progress));
