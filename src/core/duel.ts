import {GAME_CONFIG} from "../config";
import {CATS,catById} from "../data/cats";
import type {BattleCard,Cat,CombatantState,DeckCard,DuelState,OwnedCat,PowerBreakdown,Progress,RoundResult,ShinyPassive} from "../types";
import {drawToLimit,shuffle,toBattleCards} from "./deck";

const beats={Oheň:"Příroda",Příroda:"Voda",Voda:"Oheň"} as const;
export const hasAdvantage=(a:Cat["element"],b:Cat["element"])=>beats[a]===b;
export interface PowerContext{round:number;lostPrevious:boolean;level:number;shinyPassive?:ShinyPassive;temporaryBonus?:number;}

export function calculatePower(cat:Cat,enemy:Cat,ctx:PowerContext):PowerBreakdown{
  const levelBonus=Math.max(0,Math.min(GAME_CONFIG.maxCatLevel,ctx.level)-1)*GAME_CONFIG.levelPower;
  const elementBonus=hasAdvantage(cat.element,enemy.element)?cat.power*GAME_CONFIG.elementalBonus:0;
  let passiveBonus=0;const reasons=[`Základ ${cat.power}`];
  if(levelBonus)reasons.push(`Level +${levelBonus}`);if(elementBonus)reasons.push(`Element +${elementBonus}`);
  if(cat.passive.includes("prvním")&&ctx.round===1)passiveBonus=8;
  if(cat.passive.includes("posledním")&&ctx.round>=GAME_CONFIG.maxRounds)passiveBonus=8;
  if(cat.passive.includes("prohraném")&&ctx.lostPrevious)passiveBonus=12;
  if(cat.passive.includes(`proti ${enemy.element}`))passiveBonus=10;
  if(passiveBonus)reasons.push(`Pasivka +${passiveBonus}`);
  const shinyBonus=ctx.shinyPassive==="První tah"&&ctx.round===1?6:0;if(shinyBonus)reasons.push(`Shiny První tah +${shinyBonus}`);
  const temporaryBonus=ctx.temporaryBonus||0;if(temporaryBonus)reasons.push(`Dočasný efekt +${temporaryBonus}`);
  return {base:cat.power,levelBonus,elementBonus,passiveBonus,shinyBonus,temporaryBonus,final:Math.round(cat.power+levelBonus+elementBonus+passiveBonus+shinyBonus+temporaryBonus),reasons};
}
export function resolveTie(playerPower:number,opponentPower:number,playerTieMaster:boolean,opponentTieMaster:boolean,playerLevel:number,opponentLevel:number):"player"|"opponent"|"draw"{
  if(playerPower>opponentPower)return "player";if(opponentPower>playerPower)return "opponent";
  if(playerTieMaster&&!opponentTieMaster)return "player";if(opponentTieMaster&&!playerTieMaster)return "opponent";
  if(playerTieMaster&&opponentTieMaster){if(playerLevel>opponentLevel)return "player";if(opponentLevel>playerLevel)return "opponent";}
  return "draw";
}
export function roundPower(cat:Cat,enemy:Cat,round=1,lostPrevious=false){const p=calculatePower(cat,enemy,{round,lostPrevious,level:1});return {value:p.final,reasons:p.reasons};}
const owned=(collection:Progress["collection"],card:DeckCard):OwnedCat=>collection[card.catId]||{normal:99,shiny:0,level:1,xp:0,shinyPassive:"První tah"};
export function createCombatant(deck:DeckCard[],deployed:DeckCard,collection:Progress["collection"],random:()=>number=Math.random):CombatantState{
  const deployedOwned=owned(collection,deployed);const handLimit=deployed.shiny&&deployedOwned.shinyPassive==="Rozšířená ruka"?GAME_CONFIG.expandedHandSize:GAME_CONFIG.handSize;
  const shuffled=shuffle(toBattleCards(deck),random);const drawn=drawToLimit([],shuffled,handLimit);
  return {drawPile:drawn.drawPile,hand:drawn.hand,discard:[],deployed:{...deployed,uid:`deployed-${deployed.catId}`},deployedUsed:false,wins:0,handLimit};
}
export function startDuel(playerDeck:DeckCard[],playerDeployed:DeckCard,playerCollection:Progress["collection"],opponentDeck:DeckCard[],opponentDeployed:DeckCard,opponentCollection:Progress["collection"],random:()=>number=Math.random):DuelState{return {player:createCombatant(playerDeck,playerDeployed,playerCollection,random),opponent:createCombatant(opponentDeck,opponentDeployed,opponentCollection,random),round:1,finished:false,winner:null,history:[]};}
function finishState(state:DuelState){if(state.player.wins>=GAME_CONFIG.winsToFinish)return "player";if(state.opponent.wins>=GAME_CONFIG.winsToFinish)return "opponent";if(state.round>GAME_CONFIG.maxRounds){if(state.player.wins>state.opponent.wins)return "player";if(state.opponent.wins>state.player.wins)return "opponent";return "draw";}return null;}
export function playRound(state:DuelState,playerUid:string,opponentUid:string,playerCollection:Progress["collection"],opponentCollection:Progress["collection"]):DuelState{
  if(state.finished)throw new Error("Duel už skončil.");
  const pick=(side:CombatantState,uid:string)=>uid===side.deployed.uid&&!side.deployedUsed?side.deployed:side.hand.find(c=>c.uid===uid);
  const pc=pick(state.player,playerUid),oc=pick(state.opponent,opponentUid);if(!pc||!oc)throw new Error("Vybraná karta není dostupná.");
  const pCat=catById(pc.catId)!,oCat=catById(oc.catId)!;const pOwned=owned(playerCollection,pc),oOwned=owned(opponentCollection,oc);
  const pLost=state.history.at(-1)?.winner==="opponent",oLost=state.history.at(-1)?.winner==="player";
  const playerPower=calculatePower(pCat,oCat,{round:state.round,lostPrevious:pLost,level:pOwned.level,shinyPassive:pc.shiny?pOwned.shinyPassive:undefined});
  const opponentPower=calculatePower(oCat,pCat,{round:state.round,lostPrevious:oLost,level:oOwned.level,shinyPassive:oc.shiny?oOwned.shinyPassive:undefined});
  const winner=resolveTie(playerPower.final,opponentPower.final,pc.shiny&&pOwned.shinyPassive==="Pán remíz",oc.shiny&&oOwned.shinyPassive==="Pán remíz",pOwned.level,oOwned.level);
  const use=(side:CombatantState,card:BattleCard,won:boolean):CombatantState=>{const isDeployed=card.uid===side.deployed.uid;const hand=isDeployed?side.hand:side.hand.filter(c=>c.uid!==card.uid);const discard=isDeployed?side.discard:[...side.discard,card];const drawn=drawToLimit(hand,side.drawPile,side.handLimit);return {...side,...drawn,discard,deployedUsed:side.deployedUsed||isDeployed,wins:side.wins+(won?1:0)};};
  const result:RoundResult={playerCard:pc,opponentCard:oc,playerPower,opponentPower,winner};let next:DuelState={...state,player:use(state.player,pc,winner==="player"),opponent:use(state.opponent,oc,winner==="opponent"),round:state.round+1,history:[...state.history,result]};const final=finishState(next);if(final)next={...next,finished:true,winner:final};return next;
}
export function chooseOpponentCard(state:DuelState):string{const options=[...state.opponent.hand,...(!state.opponent.deployedUsed?[state.opponent.deployed]:[])];const publicCat=catById(state.player.deployed.catId)!;const advantageous=options.filter(c=>hasAdvantage(catById(c.catId)!.element,publicCat.element)&&c.uid!==state.opponent.deployed.uid);const pool=advantageous.length?advantageous:options.filter(c=>c.uid!==state.opponent.deployed.uid);return (pool[Math.min(state.round%Math.max(pool.length,1),Math.max(pool.length-1,0))]||options[0])!.uid;}
export function opponentCollection():Progress["collection"]{return Object.fromEntries(CATS.map((c,i)=>[c.id,{normal:3,shiny:i%7===0?1:0,level:1+(i%3),xp:0,shinyPassive:i%3===0?"Rozšířená ruka":i%3===1?"Pán remíz":"První tah"}]))}
