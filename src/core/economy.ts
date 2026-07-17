import {GAME_CONFIG} from "../config";
import type {Progress} from "../types";

export function pondMultiplier(progress:Progress){
  return Object.entries(progress.collection).some(([id,owned])=>id==="kapka"&&owned.assignment==="pond")?1.4:1;
}
export function pondProduced(progress:Progress,now=Date.now()){
  const base=Math.floor((now-progress.pondAt)/GAME_CONFIG.pondTickMs);
  return Math.min(GAME_CONFIG.pondCapacity*progress.pondLevel,Math.max(0,Math.floor(base*progress.pondLevel*pondMultiplier(progress))));
}
export function collectPond(progress:Progress,now=Date.now()):Progress{
  const amount=pondProduced(progress,now);
  return {...progress,fish:progress.fish+amount,pondAt:now,tutorialStep:Math.max(progress.tutorialStep,1)};
}
export function upgradePond(progress:Progress):Progress|null{
  if(progress.fish<GAME_CONFIG.pondUpgradeCost||progress.pondLevel>=2)return null;
  return {...progress,fish:progress.fish-GAME_CONFIG.pondUpgradeCost,pondLevel:2,tutorialStep:Math.max(progress.tutorialStep,2)};
}
export function buyPack(progress:Progress):Progress|null{
  if(progress.fish<GAME_CONFIG.packCost)return null;
  return {...progress,fish:progress.fish-GAME_CONFIG.packCost,tutorialStep:Math.max(progress.tutorialStep,3)};
}
export function awardBattle(progress:Progress,win:boolean,bonusFish=0,bonusMedals=0):Progress{
  const diamond=win&&progress.wins>0&&progress.wins%10===0?1:0;
  return {...progress,fish:progress.fish+(win?GAME_CONFIG.winFish+bonusFish:2),medals:progress.medals+(win?GAME_CONFIG.winMedals+bonusMedals:0),diamonds:progress.diamonds+diamond,wins:progress.wins+(win?1:0),losses:progress.losses+(win?0:1)};
}
