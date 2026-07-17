import {describe,expect,it} from "vitest";
import {buyDiamondPack,buyPack,pondProduced,rollRarity,rollShiny} from "../src/core/economy";
import {hasAdvantage,roundPower} from "../src/core/duel";
import {freshProgress,loadProgress} from "../src/core/storage";
import {CATS} from "../src/data/cats";

describe("elementy",()=>{
  it("tvoří uzavřený vztah výhod",()=>{expect(hasAdvantage("Oheň","Příroda")).toBe(true);expect(hasAdvantage("Příroda","Voda")).toBe(true);expect(hasAdvantage("Voda","Oheň")).toBe(true)});
  it("přidají 25 % síly",()=>{const fire=CATS.find(c=>c.id==="jiskra")!,nature=CATS.find(c=>c.id==="listka")!;expect(roundPower(fire,nature,2).value).toBe(Math.round(fire.power*1.25))});
});
describe("ekonomika",()=>{
  it("nikdy nepovolí záporný zůstatek",()=>{const p={...freshProgress(),fish:49};expect(buyPack(p)).toBeNull();expect(p.fish).toBe(49)});
  it("odečte přesně cenu balíčku",()=>{const result=buyPack(freshProgress())!;expect(result.fish).toBe(100)});
  it("odmítne diamantový balíček bez diamantů",()=>expect(buyDiamondPack({...freshProgress(),diamonds:0})).toBeNull());
  it("rybník má kapacitu 100",()=>expect(pondProduced(0,1_000_000)).toBe(100));
});
describe("rarity a ukládání",()=>{
  it("má testovatelné hranice rarit",()=>{expect(rollRarity(.59)).toBe("Běžná");expect(rollRarity(.6)).toBe("Vzácná");expect(rollRarity(.99)).toBe("Mýtická")});
  it("shiny šance má přesnou hranici",()=>{expect(rollShiny(.009)).toBe(true);expect(rollShiny(.01)).toBe(false)});
  it("obnoví bezpečný stav z poškozených dat",()=>expect(loadProgress("neplatné").fish).toBe(150));
  it("načte uložený postup",()=>expect(loadProgress(JSON.stringify({...freshProgress(),fish:321})).fish).toBe(321));
});
