import type {OwnedCat,Progress} from "../types";

export const STORAGE_KEY="meowverse-progress-v4";
export const SCHEMA_VERSION=4;
export const defaultOwned=(assignment:OwnedCat["assignment"]=null):OwnedCat=>({count:1,assignment});
export const STARTER_CAT_IDS=["jiskra","uhlik","kapka","priliv","listka","mechule"];
export const freshProgress=():Progress=>({schemaVersion:SCHEMA_VERSION,fish:20,diamonds:0,medals:0,pondLevel:1,pondAt:Date.now()-300000,collection:Object.fromEntries(STARTER_CAT_IDS.map(id=>[id,defaultOwned(id==="kapka"?"pond":"pvp")])),pvpTeam:[...STARTER_CAT_IDS],tutorialStep:0,pendingCatId:null,wins:0,losses:0,soundEnabled:true,belt:"white",defeatedSenseiTrials:[],senseiAttempts:{},profileFrame:"frame-white"});
function storage(){try{return window.localStorage}catch{return null}}
export function loadProgress(raw?:string|null):Progress{
  const source=raw===undefined?(()=>{try{return storage()?.getItem(STORAGE_KEY)||null}catch{return null}})():raw;
  if(!source)return freshProgress();
  try{const parsed=JSON.parse(source) as Partial<Progress>;const base=freshProgress();const collection={...base.collection,...parsed.collection};const pvpTeam=(parsed.pvpTeam||base.pvpTeam).filter(id=>collection[id]).slice(0,12);return {...base,...parsed,schemaVersion:SCHEMA_VERSION,collection,pvpTeam:pvpTeam.length>=6?pvpTeam:base.pvpTeam}}catch{return freshProgress()}
}
export function saveProgress(progress:Progress){try{storage()?.setItem(STORAGE_KEY,JSON.stringify({...progress,schemaVersion:SCHEMA_VERSION}))}catch{/* Soukromý režim nesmí zablokovat hru. */}}
export async function clearGameCache(){try{storage()?.removeItem(STORAGE_KEY)}catch{}try{for(const key of await caches.keys())if(key.startsWith("meowverse-"))await caches.delete(key)}catch{}}
