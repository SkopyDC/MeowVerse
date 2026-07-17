import {GAME_CONFIG} from "../config";
import type { Progress,Rarity } from "../types";
export const PACK_COST=GAME_CONFIG.packFishCost;
export function pondProduced(since:number,now=Date.now()){return Math.min(100,Math.max(0,Math.floor((now-since)/5000)));}
export function collectPond(p:Progress,now=Date.now()):Progress { const amount=pondProduced(p.pondAt,now); return {...p,fish:p.fish+amount,pondAt:p.pondAt+amount*5000}; }
export function buyPack(p:Progress,free=false):Progress|null { const cost=free?0:PACK_COST; if(p.fish<cost)return null; return {...p,fish:p.fish-cost,freePack:false}; }
export function buyDiamondPack(p:Progress):Progress|null {if(p.diamonds<GAME_CONFIG.packDiamondCost)return null;return {...p,diamonds:p.diamonds-GAME_CONFIG.packDiamondCost};}
export function awardDuel(p:Progress,result:"win"|"loss"|"draw"):Progress{const win=result==="win";const xp=win?20:result==="loss"?5:10;const oldLevel=p.level;const nextXp=p.xp+xp;const level=Math.min(10,1+Math.floor(nextXp/100));const levelDiamonds=Math.max(0,level-oldLevel)*2;const firstWin=win&&!p.firstWinRewarded;return {...p,fish:p.fish+(win?25:result==="loss"?5:10),diamonds:p.diamonds+levelDiamonds+(firstWin?5:0),xp:nextXp,level,wins:p.wins+(win?1:0),losses:p.losses+(result==="loss"?1:0),draws:p.draws+(result==="draw"?1:0),firstWinRewarded:p.firstWinRewarded||win};}
export function completeDailyTask(p:Progress):Progress{const dailyTasks=Math.min(3,p.dailyTasks+1);const reward=dailyTasks===3&&!p.dailyDiamondRewarded;return {...p,dailyTasks,diamonds:p.diamonds+(reward?1:0),dailyDiamondRewarded:p.dailyDiamondRewarded||reward};}
export function rollRarity(n:number):Rarity { if(n<.6)return "Běžná";if(n<.85)return "Vzácná";if(n<.95)return "Epická";if(n<.99)return "Legendární";return "Mýtická"; }
export function rollDiamondRarity(n:number):Rarity {if(n<.65)return "Vzácná";if(n<.88)return "Epická";if(n<.98)return "Legendární";return "Mýtická";}
export const rollShiny=(n:number,chance:number=GAME_CONFIG.shinyChance)=>n<chance;
