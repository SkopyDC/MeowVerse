import {CATS} from "../data/cats";
import type {Cat} from "../types";

export type MatchmakingState="searching"|"matchFound"|"waitingForOpponent"|"opponentCommitted"|"reveal"|"roundResult"|"matchResult";
export interface MatchOpponent{id:string;name:string;league:string;deployed:Cat;system:boolean}
export interface MatchmakingProvider{search():Promise<MatchOpponent>;commit(round:number,available:Cat[]):Promise<Cat>}
function seeded(seed:number){let value=seed>>>0;return()=>((value=(value*1664525+1013904223)>>>0)/4294967296)}
export class LocalMatchmakingProvider implements MatchmakingProvider{
  private random=seeded(20260717);
  async search(){await new Promise(resolve=>setTimeout(resolve,1800));return{id:"system-mist",name:"Strážce Mlžných tlapek",league:"Měsíční liga",deployed:CATS[2]!,system:true}}
  async commit(round:number,available:Cat[]){await new Promise(resolve=>setTimeout(resolve,350+round*40));return available[Math.floor(this.random()*available.length)]||CATS[0]!}
}
export class RemoteMatchmakingProvider implements MatchmakingProvider{
  async search():Promise<MatchOpponent>{throw new Error("Vzdálený matchmaking zatím není připojen.")}
  async commit():Promise<Cat>{throw new Error("Vzdálený matchmaking zatím není připojen.")}
}
