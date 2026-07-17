import {describe,expect,it} from "vitest";
import {GAME_CONFIG} from "../src/config";
import {CATS} from "../src/data/cats";
import {drawToLimit,shuffle,starterDeck,toBattleCards,validateDeck} from "../src/core/deck";
import {calculatePower,createCombatant,playRound,resolveTie,startDuel} from "../src/core/duel";
import {defaultOwned,freshProgress,loadProgress} from "../src/core/storage";
import type {DeckCard,Progress} from "../src/types";

const richCollection=():Progress["collection"]=>Object.fromEntries(CATS.map(c=>[c.id,{...defaultOwned(c.id),normal:3,shiny:1}]));
const validDeck=():DeckCard[]=>CATS.flatMap(c=>Array.from({length:GAME_CONFIG.copyLimits[c.rarity]},()=>({catId:c.id,shiny:false}))).slice(0,20);

describe("balíček a ruka",()=>{
  it("přijme přesně 20 vlastněných karet",()=>expect(validateDeck(validDeck(),richCollection()).valid).toBe(true));
  it("odmítne 19 karet",()=>expect(validateDeck(validDeck().slice(1),richCollection()).valid).toBe(false));
  it("hlídá rarity limit kopií",()=>expect(validateDeck(Array.from({length:20},()=>({catId:"jiskra",shiny:false})),richCollection()).errors.some(e=>e.includes("limit"))).toBe(true));
  it("zamíchá deterministicky",()=>expect(shuffle([1,2,3,4],()=>0)).toEqual([2,3,4,1]));
  it("lízne úvodních pět",()=>expect(createCombatant(starterDeck(),{catId:"jiskra",shiny:false},richCollection(),()=>.5).hand).toHaveLength(5));
  it("shiny Rozšířená ruka lízne šest",()=>{const c=richCollection();c.listka!.shinyPassive="Rozšířená ruka";expect(createCombatant(starterDeck(),{catId:"listka",shiny:true},c,()=>.5).hand).toHaveLength(6)});
  it("doplní ruku po kole",()=>{const cards=toBattleCards(starterDeck());const result=drawToLimit(cards.slice(0,4),cards.slice(4),5);expect(result.hand).toHaveLength(5);expect(result.drawPile).toHaveLength(15)});
});

describe("síla a remízy",()=>{
  it("element přidá 25 % základu a level +2",()=>{const fire=CATS[0]!,nature=CATS[2]!;const p=calculatePower(fire,nature,{round:2,lostPrevious:false,level:2});expect(p.elementBonus).toBe(fire.power*.25);expect(p.levelBonus).toBe(2)});
  it("bez Pána remíz zůstane remíza",()=>expect(resolveTie(50,50,false,false,1,1)).toBe("draw"));
  it("jediný Pán remíz vyhraje",()=>expect(resolveTie(50,50,true,false,1,10)).toBe("player"));
  it("dva Páni remíz rozhodnou vyšším levelem",()=>expect(resolveTie(50,50,true,true,3,2)).toBe("player"));
  it("dva Páni remíz se stejným levelem remizují",()=>expect(resolveTie(50,50,true,true,3,3)).toBe("draw"));
});

describe("nasazená kočka",()=>{
  it("jde použít jednou a podruhé vyvolá chybu",()=>{const collection=richCollection(),deck=starterDeck();let duel=startDuel(deck,{catId:"jiskra",shiny:false},collection,deck,{catId:"kapka",shiny:false},collection,()=>.2);duel=playRound(duel,duel.player.deployed.uid,duel.opponent.hand[0]!.uid,collection,collection);expect(duel.player.deployedUsed).toBe(true);expect(()=>playRound(duel,duel.player.deployed.uid,duel.opponent.hand[0]!.uid,collection,collection)).toThrow()});
});

describe("ukládání",()=>{
  it("uchová měny, balíček a sbírku",()=>{const p={...freshProgress(),fish:0,diamonds:0,deck:validDeck(),starterDeckActive:false};const loaded=loadProgress(JSON.stringify(p));expect(loaded.fish).toBe(0);expect(loaded.diamonds).toBe(0);expect(loaded.deck).toHaveLength(20);expect(loaded.collection.jiskra?.normal).toBe(1)});
});
