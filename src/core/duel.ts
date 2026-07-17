import type {BattleResult,Cat,ElementType} from "../types";

const beats:Record<ElementType,ElementType>={Oheň:"Příroda",Příroda:"Voda",Voda:"Oheň"};
export const hasAdvantage=(a:ElementType,b:ElementType)=>beats[a]===b;
export function resolveBattle(player:Cat,opponent:Cat):BattleResult{
  if(player.element!==opponent.element){
    const win=hasAdvantage(player.element,opponent.element);
    return {winner:win?"player":"opponent",reason:`${win?player.element:opponent.element} poráží ${win?opponent.element:player.element}.`};
  }
  if(player.power===opponent.power)return {winner:"draw",reason:`Stejný element i síla ${player.power}.`};
  const win=player.power>opponent.power;
  return {winner:win?"player":"opponent",reason:`Stejný element: ${win?player.name:opponent.name} má vyšší sílu.`};
}
