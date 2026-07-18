import {GAME_CONFIG} from "../config";
import type {HungerState,Progress} from "../types";

export const RECIPES={
  cheese:{name:"Sýr",milk:3,fish:0,seconds:30},
  sandwich:{name:"Rybí sendvič",milk:0,fish:2,seconds:45},
  snack:{name:"Kočičí svačina",milk:1,fish:1,seconds:20}
} as const;
export type RecipeId=keyof typeof RECIPES;

const hungerMultiplier:Record<HungerState,number>={full:1,hungry:.7,starving:0};
export function currentHunger(fedAt:number,now=Date.now()):HungerState{const elapsed=now-fedAt;return elapsed>=45*60000?"starving":elapsed>=15*60000?"hungry":"full"}
export function dairyProduced(progress:Progress,now=Date.now()){const worker=Object.values(progress.collection).find(cat=>cat.assignment==="dairy"),state=worker?currentHunger(worker.fedAt,now):"full",multiplier=hungerMultiplier[state];const tick=progress.dairyLevel>1?15000:GAME_CONFIG.dairyTickMs;return Math.min(progress.dairyLevel>1?30:GAME_CONFIG.dairyCapacity,Math.floor((now-progress.dairyAt)/tick*multiplier))}
export function collectDairy(progress:Progress,now=Date.now()):Progress{return {...progress,milk:progress.milk+dairyProduced(progress,now),dairyAt:now}}
export function startCraft(progress:Progress,id:RecipeId,now=Date.now()):Progress|null{const recipe=RECIPES[id];if(progress.crafting||progress.milk<recipe.milk||progress.fish<recipe.fish)return null;return {...progress,milk:progress.milk-recipe.milk,fish:progress.fish-recipe.fish,crafting:{recipe:id,readyAt:now+recipe.seconds*1000}}}
export function collectCraft(progress:Progress,now=Date.now()):Progress|null{if(!progress.crafting||progress.crafting.readyAt>now)return null;const key=progress.crafting.recipe==="cheese"?"cheese":progress.crafting.recipe==="sandwich"?"sandwiches":"snacks";return {...progress,[key]:progress[key]+1,crafting:null,playerXp:progress.playerXp+2}}
export function canFulfillOrder(progress:Progress){return progress.orderVanReturnAt<=Date.now()&&progress.milk>=GAME_CONFIG.orderMilk&&progress.fish>=GAME_CONFIG.orderFish&&progress.cheese>=GAME_CONFIG.orderCheese}
export function fulfillOrder(progress:Progress,random=Math.random,now=Date.now()){if(progress.orderVanReturnAt>now||progress.milk<GAME_CONFIG.orderMilk||progress.fish<GAME_CONFIG.orderFish||progress.cheese<GAME_CONFIG.orderCheese)return null;return {...progress,fish:progress.fish-GAME_CONFIG.orderFish+GAME_CONFIG.orderFishReward,milk:progress.milk-GAME_CONFIG.orderMilk,cheese:progress.cheese-GAME_CONFIG.orderCheese,medals:progress.medals+GAME_CONFIG.orderMedalReward,diamonds:progress.diamonds+(random()<GAME_CONFIG.orderDiamondChance?1:0),playerXp:progress.playerXp+GAME_CONFIG.orderXpReward,orderIndex:progress.orderIndex+1,orderVanReturnAt:now+GAME_CONFIG.orderVanAwayMs}}
export function vanSecondsRemaining(progress:Progress,now=Date.now()){return Math.max(0,Math.ceil((progress.orderVanReturnAt-now)/1000))}
export function feedCat(progress:Progress,id:string,now=Date.now()){if(progress.snacks<1||!progress.collection[id])return null;return {...progress,snacks:progress.snacks-1,collection:{...progress.collection,[id]:{...progress.collection[id]!,hunger:"full" as const,fedAt:now}}}}
