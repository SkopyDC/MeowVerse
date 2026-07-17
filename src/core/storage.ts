import type { OwnedCat, Progress, ShinyPassive } from "../types";
import {starterDeck} from "./deck";
export const STORAGE_KEY="meowverse-progress-v1";
const passives:Record<string,ShinyPassive>={jiskra:"První tah",kapka:"Pán remíz",listka:"Rozšířená ruka"};
export const defaultOwned=(id:string,count=0):OwnedCat=>({normal:count,shiny:0,level:1,xp:0,shinyPassive:passives[id]||"První tah"});
export const freshProgress=():Progress=>({fish:150,diamonds:10,collection:{jiskra:defaultOwned("jiskra",1),kapka:defaultOwned("kapka",1),listka:defaultOwned("listka",1)},deck:starterDeck(),deployed:{catId:"listka",shiny:false},starterDeckActive:true,wins:0,losses:0,draws:0,firstWinRewarded:false,dailyTasks:0,dailyDiamondRewarded:false,xp:0,level:1,pondAt:Date.now(),tutorialDone:false,freePack:true});
export function loadProgress(raw:string|null):Progress { if(!raw)return freshProgress(); try { const old=JSON.parse(raw) as Partial<Progress>&{cats?:Record<string,number>;team?:string[]};const base=freshProgress();const migrated={...base,...old,collection:{...base.collection,...old.collection}};if(old.cats&&!old.collection)for(const[id,count]of Object.entries(old.cats))migrated.collection[id]=defaultOwned(id,count);return migrated; } catch{return freshProgress();} }
export const saveProgress=(p:Progress)=>localStorage.setItem(STORAGE_KEY,JSON.stringify(p));
