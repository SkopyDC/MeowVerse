import type {OwnedCat,Progress} from "../types";

export const STORAGE_KEY="meowverse-progress-v3";
export const SCHEMA_VERSION=3;
export const defaultOwned=(assignment:OwnedCat["assignment"]=null):OwnedCat=>({count:1,assignment});
export const freshProgress=():Progress=>({schemaVersion:SCHEMA_VERSION,fish:20,diamonds:0,medals:0,pondLevel:1,pondAt:Date.now()-300000,collection:{jiskra:defaultOwned("pvp"),kapka:defaultOwned("pond")},tutorialStep:0,pendingCatId:null,wins:0,losses:0,soundEnabled:true,belt:"white",defeatedSenseiTrials:[],senseiAttempts:{},profileFrame:"frame-white"});
function storage(){try{return window.localStorage}catch{return null}}
export function loadProgress(raw?:string|null):Progress{
  const source=raw===undefined?(()=>{try{return storage()?.getItem(STORAGE_KEY)||null}catch{return null}})():raw;
  if(!source)return freshProgress();
  try{const parsed=JSON.parse(source) as Partial<Progress>;const base=freshProgress();return {...base,...parsed,schemaVersion:SCHEMA_VERSION,collection:{...base.collection,...parsed.collection}}}catch{return freshProgress()}
}
export function saveProgress(progress:Progress){try{storage()?.setItem(STORAGE_KEY,JSON.stringify({...progress,schemaVersion:SCHEMA_VERSION}))}catch{/* Soukromý režim nesmí zablokovat hru. */}}
export async function clearGameCache(){try{storage()?.removeItem(STORAGE_KEY)}catch{}try{for(const key of await caches.keys())if(key.startsWith("meowverse-"))await caches.delete(key)}catch{}}
