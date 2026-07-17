import {describe,expect,it} from "vitest";
import {buyPack,collectPond,pondProduced,upgradePond} from "../src/core/economy";
import {hasAdvantage,resolveBattle} from "../src/core/duel";
import {freshProgress,loadProgress} from "../src/core/storage";
import {catById} from "../src/data/cats";

describe("jednoduché PvP",()=>{
  it("dodržuje uzavřený vztah elementů",()=>{expect(hasAdvantage("Oheň","Příroda")).toBe(true);expect(hasAdvantage("Příroda","Voda")).toBe(true);expect(hasAdvantage("Voda","Oheň")).toBe(true)});
  it("element vždy předčí sílu",()=>expect(resolveBattle(catById("jiskra")!,catById("mechule")!).winner).toBe("player"));
  it("u stejného elementu rozhodne síla",()=>expect(resolveBattle(catById("jiskra")!,catById("uhlik")!).winner).toBe("opponent"));
});
describe("prvních pět minut",()=>{
  it("rybník má kapacitu a pracovní bonus",()=>{const p=freshProgress();expect(pondProduced({...p,pondAt:0},1_000_000)).toBe(100)});
  it("sběr, upgrade a balíček nikdy nevytvoří záporný zůstatek",()=>{let p=collectPond({...freshProgress(),pondAt:0},1_000_000);p=upgradePond(p)!;const packed=buyPack(p);expect(packed?.fish).toBeGreaterThanOrEqual(0)});
  it("odmítne drahou akci",()=>expect(buyPack({...freshProgress(),fish:0})).toBeNull());
  it("obnoví poškozená data",()=>expect(loadProgress("neplatné").pondLevel).toBe(1));
});
