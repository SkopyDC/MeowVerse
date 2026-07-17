export type ElementType = "Oheň" | "Voda" | "Příroda";
export type Rarity = "Běžná" | "Vzácná" | "Epická" | "Legendární" | "Mýtická";
export type ShinyPassive = "Rozšířená ruka" | "Pán remíz" | "První tah";
export interface Cat { id:string; name:string; description:string; element:ElementType; rarity:Rarity; power:number; passive:string; colors:[string,string]; }
export interface OwnedCat { normal:number; shiny:number; level:number; xp:number; shinyPassive:ShinyPassive; }
export interface DeckCard { catId:string; shiny:boolean; }
export interface Progress { fish:number; diamonds:number; collection:Record<string,OwnedCat>; deck:DeckCard[]; deployed:DeckCard|null; starterDeckActive:boolean; wins:number; losses:number; draws:number; firstWinRewarded:boolean; dailyTasks:number; dailyDiamondRewarded:boolean; xp:number; level:number; pondAt:number; tutorialDone:boolean; freePack:boolean; }
export interface BattleCard extends DeckCard { uid:string; }
export interface CombatantState { drawPile:BattleCard[]; hand:BattleCard[]; discard:BattleCard[]; deployed:BattleCard; deployedUsed:boolean; wins:number; handLimit:number; }
export interface DuelState { player:CombatantState; opponent:CombatantState; round:number; finished:boolean; winner:"player"|"opponent"|"draw"|null; history:RoundResult[]; }
export interface PowerBreakdown { base:number; levelBonus:number; elementBonus:number; passiveBonus:number; shinyBonus:number; temporaryBonus:number; final:number; reasons:string[]; }
export interface RoundResult { playerCard:BattleCard; opponentCard:BattleCard; playerPower:PowerBreakdown; opponentPower:PowerBreakdown; winner:"player"|"opponent"|"draw"; }
