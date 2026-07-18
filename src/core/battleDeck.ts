import {GAME_CONFIG} from "../config";
export interface DeckCard {instanceId:string;catId:string}
export interface BattleDeckState {hand:DeckCard[];drawPile:DeckCard[];discard:DeckCard[]}
export function seededRandom(seed:number){let value=seed>>>0;return()=>((value=(value*1664525+1013904223)>>>0)/4294967296)}
export function createCardInstances(ids:string[]):DeckCard[]{const seen:Record<string,number>={};return ids.map(catId=>({catId,instanceId:`${catId}#${seen[catId]=(seen[catId]||0)+1}`}))}
export function shuffleDeck<T>(items:T[],seed:number):T[]{const out=[...items],random=seededRandom(seed);for(let i=out.length-1;i>0;i--){const j=Math.floor(random()*(i+1));[out[i],out[j]]=[out[j]!,out[i]!]}return out}
export function startBattleDeck(ids:string[],seed:number):BattleDeckState{const shuffled=shuffleDeck(createCardInstances(ids),seed);return {hand:shuffled.slice(0,GAME_CONFIG.openingHandSize),drawPile:shuffled.slice(GAME_CONFIG.openingHandSize),discard:[]}}
export function playCard(state:BattleDeckState,instanceId:string):BattleDeckState|null{const played=state.hand.find(card=>card.instanceId===instanceId);if(!played)return null;const hand=state.hand.filter(card=>card.instanceId!==instanceId),drawPile=[...state.drawPile];const drawn=drawPile.shift();return {hand:drawn?[...hand,drawn]:hand,drawPile,discard:[...state.discard,played]}}
export function validateDeck(ids:string[],owned:Record<string,{count:number}>){if(ids.length!==GAME_CONFIG.deckSize)return false;const counts:Record<string,number>={};for(const id of ids){counts[id]=(counts[id]||0)+1;if(!owned[id]||counts[id]>owned[id]!.count)return false}return true}
