import {describe,expect,it} from "vitest";
import {CatAvatar} from "../src/components/cats/CatAvatar";
import {CAT_VISUALS} from "../src/data/catVisuals";

describe("modulární kočičí avatar",()=>{
  it("obsahuje všech osm ukázkových konfigurací",()=>expect(["bublina","lojza","mnaousef","ciperka","ignac","vila","mnaoslav","bublinaShiny"].every(id=>CAT_VISUALS[id])).toBe(true));
  it("používá jednotný viewBox a ořez",()=>{const svg=CatAvatar(CAT_VISUALS.mnaoslav!,"mini","Král");expect(svg).toContain('viewBox="0 0 256 256"');expect(svg).toContain('overflow="hidden"');expect(svg).toContain("cat-avatar--mini")});
  it("skládá vrstvy místo odkazu na samostatný obrázek",()=>{const svg=CatAvatar(CAT_VISUALS.bublina!,"card");expect(svg).toContain("cat-body");expect(svg).toContain("cat-face");expect(svg).toContain("cat-tool");expect(svg).not.toContain("<img")});
});
