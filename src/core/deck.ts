import {GAME_CONFIG} from "../config";
import {catById} from "../data/cats";
import type {BattleCard,DeckCard,OwnedCat,Progress} from "../types";

export interface DeckValidation { valid:boolean; errors:string[]; }
export function ownedCount(owned:OwnedCat|undefined,shiny:boolean){return owned?(shiny?owned.shiny:owned.normal):0;}
export function validateDeck(deck:DeckCard[],collection:Progress["collection"]):DeckValidation{
  const errors:string[]=[];
  if(deck.length!==GAME_CONFIG.deckSize)errors.push(`Balíček musí obsahovat přesně ${GAME_CONFIG.deckSize} karet.`);
  const used=new Map<string,number>();
  for(const card of deck){
    const cat=catById(card.catId); if(!cat){errors.push(`Neznámá kočka ${card.catId}.`);continue;}
    const variant=`${card.catId}:${card.shiny}`;used.set(variant,(used.get(variant)||0)+1);
    const totalForCat=deck.filter(c=>c.catId===card.catId).length;
    if(totalForCat>GAME_CONFIG.copyLimits[cat.rarity]&&!errors.includes(`Překročen limit kočky ${cat.name}.`))errors.push(`Překročen limit kočky ${cat.name}.`);
  }
  for(const [key,count] of used){const [id,flag]=key.split(":");if(count>ownedCount(collection[id!],flag==="true"))errors.push(`Nevlastníš dost kopií ${catById(id!)?.name||id}.`);}
  return {valid:errors.length===0,errors};
}
export function shuffle<T>(items:T[],random:()=>number=Math.random):T[]{const out=[...items];for(let i=out.length-1;i>0;i--){const j=Math.floor(random()*(i+1));[out[i],out[j]]=[out[j]!,out[i]!];}return out;}
export function toBattleCards(deck:DeckCard[]):BattleCard[]{return deck.map((c,i)=>({...c,uid:`${c.catId}-${c.shiny?"s":"n"}-${i}`}));}
export function drawToLimit(hand:BattleCard[],drawPile:BattleCard[],limit:number){const nextHand=[...hand],nextPile=[...drawPile];while(nextHand.length<limit&&nextPile.length)nextHand.push(nextPile.shift()!);return {hand:nextHand,drawPile:nextPile};}
export function starterDeck():DeckCard[]{const ids=["jiskra","kapka","listka"];return Array.from({length:20},(_,i)=>({catId:ids[i%3]!,shiny:false}));}
