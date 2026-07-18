import {describe,expect,it} from "vitest";
import {assertStableWorldPosition,assertVisualTweenOnly,createBuildingInteraction,recordBuildingTap} from "../src/v3/buildingInteraction";

describe("rebuild-v3 building interaction",()=>{
  it("keeps world position identical after twenty taps",()=>{let state=createBuildingInteraction(108,615);for(let tap=0;tap<20;tap++){state=recordBuildingTap(state);assertStableWorldPosition(state)}expect(state.world).toEqual({x:108,y:615});expect(state.taps).toBe(20)});
  it("rejects position properties in visual tween",()=>{expect(()=>assertVisualTweenOnly({}, {scale:.96})).not.toThrow();expect(()=>assertVisualTweenOnly({}, {x:12,scale:1})).toThrow(/world x\/y/) });
});
