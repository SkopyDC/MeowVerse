export const ISLAND_SCENE_SIZE = { width: 1000, height: 1600 } as const;

export type IslandObjectType = "primary" | "production" | "orders";

export interface ScenePoint { x: number; y: number }
export interface IslandHitArea extends ScenePoint { width: number; height: number; borderRadius?: number }
export interface IslandObject {
  id: "pack" | "arena" | "dairy" | "pond" | "craft" | "orders";
  type: IslandObjectType;
  asset: string;
  label: string;
  x: number;
  y: number;
  width: number;
  anchor: ScenePoint;
  z: number;
  hitArea: IslandHitArea;
  indicatorAnchor: ScenePoint;
}

export const ISLAND_OBJECTS: readonly IslandObject[] = [
  { id:"pack", type:"primary", asset:"/assets/island/pack-house.png", label:"Balíčkový dům", x:245, y:410, width:300, anchor:{x:.5,y:1}, z:30, hitArea:{x:70,y:100,width:160,height:170,borderRadius:42}, indicatorAnchor:{x:245,y:145} },
  { id:"arena", type:"primary", asset:"/assets/island/arena.png", label:"Aréna", x:710, y:395, width:350, anchor:{x:.5,y:1}, z:31, hitArea:{x:65,y:85,width:220,height:220,borderRadius:48}, indicatorAnchor:{x:710,y:105} },
  { id:"dairy", type:"production", asset:"/assets/island/dairy.png", label:"Mlékárna", x:235, y:750, width:280, anchor:{x:.5,y:1}, z:40, hitArea:{x:55,y:80,width:170,height:175,borderRadius:44}, indicatorAnchor:{x:235,y:505} },
  { id:"orders", type:"orders", asset:"/assets/island/order-van.png", label:"Objednávkové auto", x:745, y:735, width:270, anchor:{x:.5,y:1}, z:41, hitArea:{x:45,y:90,width:185,height:145,borderRadius:38}, indicatorAnchor:{x:745,y:505} },
  { id:"pond", type:"production", asset:"/assets/island/pond.png", label:"Rybník a molo", x:270, y:1120, width:390, anchor:{x:.5,y:1}, z:50, hitArea:{x:35,y:95,width:320,height:230,borderRadius:50}, indicatorAnchor:{x:270,y:785} },
  { id:"craft", type:"production", asset:"/assets/island/workshop.png", label:"Craftingová dílna", x:730, y:1115, width:290, anchor:{x:.5,y:1}, z:51, hitArea:{x:55,y:75,width:180,height:190,borderRadius:44}, indicatorAnchor:{x:730,y:855} }
] as const;

export interface IndicatorRequest { id: IslandObject["id"]; symbol: string; priority: number }
export interface IndicatorPlacement extends IndicatorRequest, ScenePoint {}

const overlaps = (a: ScenePoint, b: ScenePoint) => Math.abs(a.x-b.x)<105 && Math.abs(a.y-b.y)<105;

export function placeIslandIndicators(requests: readonly IndicatorRequest[]): IndicatorPlacement[] {
  const placed: IndicatorPlacement[]=[];
  for(const request of [...requests].sort((a,b)=>b.priority-a.priority)){
    const object=ISLAND_OBJECTS.find(item=>item.id===request.id);
    if(!object) continue;
    const origin=object.indicatorAnchor;
    const candidates=[origin,{x:origin.x,y:origin.y+120},{x:origin.x-115,y:origin.y+70},{x:origin.x+115,y:origin.y+70}];
    const point=candidates.find(candidate=>candidate.y>135&&candidate.x>55&&candidate.x<945&&!placed.some(item=>overlaps(item,candidate)));
    if(point) placed.push({...request,...point});
  }
  return placed;
}

export function objectStyle(object:IslandObject): string {
  return `--scene-x:${object.x};--scene-y:${object.y};--scene-w:${object.width};--anchor-x:${object.anchor.x};--anchor-y:${object.anchor.y};--scene-z:${object.z}`;
}
