import type {OwnedCat,Progress} from "../types";

export const STORAGE_KEY="meowverse-progress-v5";
export const SCHEMA_VERSION=6;
export const defaultOwned=(assignment:OwnedCat["assignment"]=null,count=1):OwnedCat=>({count,assignment,hunger:"full",fedAt:Date.now()});
export const STARTER_CAT_IDS=["jiskra","uhlik","kapka","priliv","listka","mechule"];
export const STARTER_DECK=[...Array(4).fill("jiskra"),...Array(3).fill("uhlik"),...Array(4).fill("kapka"),...Array(3).fill("priliv"),...Array(3).fill("listka"),...Array(3).fill("mechule")];
const starterCounts:Record<string,number>={jiskra:4,uhlik:3,kapka:4,priliv:3,listka:3,mechule:3};
export const freshProgress=():Progress=>({schemaVersion:SCHEMA_VERSION,fish:20,diamonds:0,medals:0,pondLevel:1,pondAt:Date.now()-300000,collection:Object.fromEntries(STARTER_CAT_IDS.map(id=>[id,defaultOwned(id==="kapka"?"pond":"pvp",starterCounts[id])])),pvpTeam:[...STARTER_CAT_IDS],battleDeck:[...STARTER_DECK],deployedCatId:"jiskra",milk:0,dairyLevel:1,dairyAt:Date.now()-120000,cheese:0,sandwiches:0,snacks:1,crafting:null,orderIndex:0,orderVanReturnAt:0,playerLevel:1,playerXp:0,tutorialStep:0,pendingCatId:null,wins:0,losses:0,soundEnabled:true,belt:"white",defeatedSenseiTrials:[],senseiAttempts:{},profileFrame:"frame-white"});
function storage(){try{return window.localStorage}catch{return null}}
export function loadProgress(raw?:string|null):Progress{
  const source=raw===undefined?(()=>{try{return storage()?.getItem(STORAGE_KEY)||null}catch{return null}})():raw;
  if(!source)return freshProgress();
  try{const parsed=JSON.parse(source) as Partial<Progress>;const base=freshProgress();const ids=new Set([...Object.keys(base.collection),...Object.keys(parsed.collection||{})]);const collection=Object.fromEntries([...ids].map(id=>[id,{...(base.collection[id]||defaultOwned()),...(parsed.collection?.[id]||{})}]));const pvpTeam=(parsed.pvpTeam||base.pvpTeam).filter(id=>collection[id]).slice(0,12);const battleDeck=(parsed.battleDeck||base.battleDeck).filter(id=>collection[id]);return {...base,...parsed,schemaVersion:SCHEMA_VERSION,collection,pvpTeam:pvpTeam.length>=6?pvpTeam:base.pvpTeam,battleDeck:battleDeck.length===20?battleDeck:base.battleDeck}}catch{return freshProgress()}
}
export function saveProgress(progress:Progress){try{storage()?.setItem(STORAGE_KEY,JSON.stringify({...progress,schemaVersion:SCHEMA_VERSION}))}catch{/* Soukromý režim nesmí zablokovat hru. */}}
export async function clearGameCache(){try{storage()?.removeItem(STORAGE_KEY)}catch{}try{for(const key of await caches.keys())if(key.startsWith("meowverse-"))await caches.delete(key)}catch{}}
