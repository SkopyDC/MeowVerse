import type {ElementType,MatchVictory,RoundWin} from "../types";

export const MAX_MATCH_ROUNDS=9;
export const ELEMENTS:ElementType[]=["Oheň","Voda","Příroda"];

export interface VictoryProgress {
  wonElements:Set<ElementType>;
  uniqueCats:Record<ElementType,Set<string>>;
}

export function victoryProgress(wins:RoundWin[]):VictoryProgress {
  const uniqueCats:VictoryProgress["uniqueCats"]={Oheň:new Set(),Voda:new Set(),Příroda:new Set()};
  const wonElements=new Set<ElementType>();
  for(const win of wins){wonElements.add(win.element);uniqueCats[win.element].add(win.catId)}
  return {wonElements,uniqueCats};
}

export function evaluateMatchVictory(wins:RoundWin[]):Omit<MatchVictory,"winner">|null {
  const progress=victoryProgress(wins);
  if(ELEMENTS.every(element=>progress.wonElements.has(element)))return {path:"elemental"};
  const specialist=ELEMENTS.find(element=>progress.uniqueCats[element].size>=3);
  return specialist?{path:"specialist",specialistElement:specialist}:null;
}

function tiebreakScore(wins:RoundWin[]){
  const progress=victoryProgress(wins);
  return [progress.wonElements.size,Math.max(...ELEMENTS.map(element=>progress.uniqueCats[element].size)),wins.length] as const;
}

export function evaluateMatch(playerWins:RoundWin[],opponentWins:RoundWin[],round:number):MatchVictory|null {
  const player=evaluateMatchVictory(playerWins);if(player)return {winner:"player",...player};
  const opponent=evaluateMatchVictory(opponentWins);if(opponent)return {winner:"opponent",...opponent};
  if(round<MAX_MATCH_ROUNDS)return null;
  const a=tiebreakScore(playerWins),b=tiebreakScore(opponentWins);
  for(let i=0;i<a.length;i++){if(a[i]!==b[i])return {winner:a[i]!>b[i]!?"player":"opponent",path:"tiebreak"}}
  return {winner:"draw",path:"draw"};
}
