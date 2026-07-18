import {describe,expect,it} from "vitest";
import {fulfillOrder,vanSecondsRemaining} from "../src/core/base";
import {freshProgress} from "../src/core/storage";

describe("objednávkové auto",()=>{
  it("po naložení odjede na 60 sekund a stav přežije serializaci",()=>{const now=1000;const ready={...freshProgress(),milk:3,fish:2,cheese:1};const next=fulfillOrder(ready,()=>1,now)!;expect(next.orderVanReturnAt).toBe(61000);expect(vanSecondsRemaining(next,now)).toBe(60);expect(JSON.parse(JSON.stringify(next)).orderVanReturnAt).toBe(61000)});
  it("během nepřítomnosti nepřijme další objednávku",()=>{const away={...freshProgress(),milk:9,fish:9,cheese:9,orderVanReturnAt:70000};expect(fulfillOrder(away,()=>1,1000)).toBeNull()});
  it("po uplynutí času je auto ihned dostupné",()=>{const returned={...freshProgress(),milk:3,fish:2,cheese:1,orderVanReturnAt:999};expect(vanSecondsRemaining(returned,1000)).toBe(0);expect(fulfillOrder(returned,()=>1,1000)).not.toBeNull()});
});
