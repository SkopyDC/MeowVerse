import {describe,expect,it} from "vitest";
import {freshProgress} from "../src/core/storage";
import {awardSenseiVictory,BELTS,currentTrial,evaluateSenseiReadiness,recordSenseiAttempt,SENSEI_TRIALS,SenseiAI} from "../src/core/sensei";
import {CATS} from "../src/data/cats";
import {resolveBattle} from "../src/core/duel";

describe("pásky a odměny",()=>{
  it("mají správné pořadí",()=>expect(BELTS.map(belt=>belt.id)).toEqual(["white","yellow","orange","green","blue","purple","brown","black"]));
  it("nový účet začíná bílým páskem a může vstoupit do první zkoušky",()=>{const progress=freshProgress();expect(progress.belt).toBe("white");expect(currentTrial(progress)?.id).toBe("white-yellow");expect(evaluateSenseiReadiness(progress,CATS.slice(0,2))).not.toBe("Nepřipraven")});
  it("nelze přeskočit pásek cizí zkouškou",()=>{const progress=freshProgress();expect(awardSenseiVictory(progress,SENSEI_TRIALS[2]!).belt).toBe("white")});
  it("první vítězství odemkne další pásek",()=>expect(awardSenseiVictory(freshProgress(),SENSEI_TRIALS[0]!).belt).toBe("yellow"));
  it("jednorázová odměna nejde získat dvakrát",()=>{const trial=SENSEI_TRIALS[0]!,once=awardSenseiVictory(freshProgress(),trial),twice=awardSenseiVictory(once,trial);expect(twice.diamonds).toBe(once.diamonds);expect(twice.medals).toBe(once.medals)});
  it("prohra pouze zapíše pokus a neodebere pásek",()=>{const progress={...freshProgress(),belt:"green" as const};expect(recordSenseiAttempt(progress,SENSEI_TRIALS[3]!).belt).toBe("green")});
});

describe("férová Senseiova AI",()=>{
  const state={round:1,senseiScore:0,playerScore:0,playerUsed:[] as never[],senseiUsed:[],playerDeployed:CATS[0]!};
  it("stejný seed dává stejnou kartu",()=>expect(new SenseiAI(SENSEI_TRIALS[0]!,9).commit(state).id).toBe(new SenseiAI(SENSEI_TRIALS[0]!,9).commit(state).id));
  it("po potvrzení nemůže kartu změnit",()=>{const ai=new SenseiAI(SENSEI_TRIALS[0]!,2),first=ai.commit(state),second=ai.commit({...state,playerUsed:["Voda"]});expect(second).toBe(first)});
  it("API nepřijímá aktuální skrytou volbu hráče",()=>{const keys=Object.keys(state);expect(keys).not.toContain("playerCurrentCard");expect(keys).not.toContain("hiddenChoice")});
  it("readiness nemění pravidla souboje",()=>{const before=resolveBattle(CATS[0]!,CATS[2]!);evaluateSenseiReadiness({...freshProgress(),wins:99},CATS);expect(resolveBattle(CATS[0]!,CATS[2]!)).toEqual(before)});
});
