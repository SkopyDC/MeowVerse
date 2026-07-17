import {CATS} from "../data/cats";
import type {Cat,ElementType,RoundWin} from "../types";
import {ELEMENTS,victoryProgress} from "./victory";

export type MatchmakingState="searching"|"matchFound"|"waitingForOpponent"|"opponentCommitted"|"reveal"|"roundResult"|"matchResult";
export interface MatchOpponent{id:string;name:string;league:string;deployed:Cat;system:boolean}
export interface PublicMatchState{ownWins:RoundWin[];opponentWins:RoundWin[];usedIds:string[]}
export interface MatchmakingProvider{search():Promise<MatchOpponent>;commit(round:number,available:Cat[],state?:PublicMatchState):Promise<Cat>}
const counters:Record<ElementType,ElementType>={Oheň:"Voda",Voda:"Příroda",Příroda:"Oheň"};
export function chooseStrategicCat(available:Cat[],state:PublicMatchState,randomValue=0):Cat{
  const unused=available.filter(cat=>!state.usedIds.includes(cat.id));const pool=unused.length?unused:available;
  const own=victoryProgress(state.ownWins),opponent=victoryProgress(state.opponentWins);
  const threatened=ELEMENTS.find(element=>opponent.uniqueCats[element].size===2)||ELEMENTS.find(element=>!opponent.wonElements.has(element));
  const block=threatened&&pool.find(cat=>cat.element===counters[threatened]);if(block)return block;
  const missing=ELEMENTS.find(element=>!own.wonElements.has(element));const pursue=missing&&pool.find(cat=>cat.element===missing);return pursue||pool[Math.floor(randomValue*pool.length)]||CATS[0]!;
}
function seeded(seed:number){let value=seed>>>0;return()=>((value=(value*1664525+1013904223)>>>0)/4294967296)}
export class LocalMatchmakingProvider implements MatchmakingProvider{
  private random=seeded(20260717);
  async search(){await new Promise(resolve=>setTimeout(resolve,1800));return{id:"system-mist",name:"Strážce Mlžných tlapek",league:"Měsíční liga",deployed:CATS[2]!,system:true}}
  async commit(round:number,available:Cat[],state?:PublicMatchState){await new Promise(resolve=>setTimeout(resolve,350+round*40));const value=this.random();return state?chooseStrategicCat(available,state,value):available[Math.floor(value*available.length)]||CATS[0]!}
}
export class RemoteMatchmakingProvider implements MatchmakingProvider{
  async search():Promise<MatchOpponent>{throw new Error("Vzdálený matchmaking zatím není připojen.")}
  async commit():Promise<Cat>{throw new Error("Vzdálený matchmaking zatím není připojen.")}
}
