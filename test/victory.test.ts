import {describe,expect,it} from "vitest";
import {evaluateMatch,evaluateMatchVictory} from "../src/core/victory";
import type {RoundWin} from "../src/types";

const win=(round:number,catId:string,element:RoundWin["element"]):RoundWin=>({round,catId,element});

describe("nové podmínky vítězství",()=>{
  it("vyhraje Oheň + Voda + Příroda v libovolném pořadí",()=>{
    expect(evaluateMatchVictory([win(1,"a","Voda"),win(2,"b","Příroda"),win(3,"c","Oheň")])?.path).toBe("elemental");
  });
  it("vyhrají tři unikátní kočky stejného elementu",()=>{
    expect(evaluateMatchVictory([win(1,"a","Oheň"),win(2,"b","Oheň"),win(3,"c","Oheň")])).toEqual({path:"specialist",specialistElement:"Oheň"});
  });
  it("stejná identita ani její kopie se nezapočítá vícekrát",()=>{
    expect(evaluateMatchVictory([win(1,"a","Oheň"),win(2,"a","Oheň"),win(3,"a","Oheň")])).toBeNull();
    expect(evaluateMatchVictory([win(1,"a","Oheň"),win(2,"b","Oheň")])).toBeNull();
  });
  it("remíza nepřidává postup a po devíti kolech funguje tiebreak",()=>{
    const player=[win(1,"a","Oheň"),win(4,"b","Oheň")];
    const enemy=[win(2,"x","Voda")];
    expect(evaluateMatch(player,enemy,8)).toBeNull();
    expect(evaluateMatch(player,enemy,9)).toEqual({winner:"player",path:"tiebreak"});
    expect(evaluateMatch([],[],9)).toEqual({winner:"draw",path:"draw"});
  });
  it("zápas končí okamžitě po splnění cesty",()=>expect(evaluateMatch([win(1,"a","Oheň"),win(2,"b","Voda"),win(3,"c","Příroda")],[],3)?.winner).toBe("player"));
});
