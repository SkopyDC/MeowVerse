import {describe,expect,it} from "vitest";
import {createCardInstances,playCard,shuffleDeck,startBattleDeck,validateDeck} from "../src/core/battleDeck";
import {freshProgress} from "../src/core/storage";

describe("bojový balíček",()=>{
  const progress=freshProgress();
  it("zamíchá 20 karet seedovaně",()=>{expect(shuffleDeck(progress.battleDeck,7)).toEqual(shuffleDeck(progress.battleDeck,7));expect(shuffleDeck(progress.battleDeck,7)).toHaveLength(20)});
  it("lízne 5 a žádná konkrétní kopie se neopakuje",()=>{const state=startBattleDeck(progress.battleDeck,12);expect(state.hand).toHaveLength(5);expect(new Set(createCardInstances(progress.battleDeck).map(card=>card.instanceId)).size).toBe(20)});
  it("zahranou kartu odhodí a dolízne jednu",()=>{const state=startBattleDeck(progress.battleDeck,2),next=playCard(state,state.hand[0]!.instanceId)!;expect(next.hand).toHaveLength(5);expect(next.drawPile).toHaveLength(14);expect(next.discard).toHaveLength(1)});
  it("při prázdném balíčku už nedobírá",()=>{const state={hand:createCardInstances(["jiskra"]),drawPile:[],discard:[]};expect(playCard(state,state.hand[0]!.instanceId)?.hand).toHaveLength(0)});
  it("odmítne neplatný počet nebo nevlastněnou kopii",()=>{expect(validateDeck(progress.battleDeck,progress.collection)).toBe(true);expect(validateDeck(progress.battleDeck.slice(1),progress.collection)).toBe(false);expect(validateDeck([...progress.battleDeck.slice(0,19),"jiskra"],progress.collection)).toBe(false)});
});
