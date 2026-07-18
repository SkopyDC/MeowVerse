import {describe,expect,it} from "vitest";
import {ISLAND_OBJECTS,ISLAND_SCENE_SIZE,placeIslandIndicators} from "../src/data/islandScene";

describe("island scene graph",()=>{
  it("keeps every object inside the canonical scene",()=>{
    expect(ISLAND_SCENE_SIZE).toEqual({width:1000,height:1600});
    expect(ISLAND_OBJECTS).toHaveLength(6);
    for(const object of ISLAND_OBJECTS){
      expect(object.x).toBeGreaterThan(0);
      expect(object.x).toBeLessThan(ISLAND_SCENE_SIZE.width);
      expect(object.y).toBeGreaterThan(0);
      expect(object.y).toBeLessThan(ISLAND_SCENE_SIZE.height);
      expect(object.asset).toMatch(/^\/assets\/island\/.+\.png$/);
    }
  });

  it("places priority indicators outside the HUD without collisions",()=>{
    const placed=placeIslandIndicators(ISLAND_OBJECTS.map((object,index)=>({id:object.id,symbol:"!",priority:100-index})));
    expect(placed.length).toBe(6);
    for(const indicator of placed)expect(indicator.y).toBeGreaterThan(135);
    for(let left=0;left<placed.length;left++)for(let right=left+1;right<placed.length;right++){
      expect(Math.abs(placed[left]!.x-placed[right]!.x)>=105||Math.abs(placed[left]!.y-placed[right]!.y)>=105).toBe(true);
    }
  });
});
