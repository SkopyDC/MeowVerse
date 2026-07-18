export interface WorldPosition { x:number; y:number }
export interface BuildingInteractionState { origin:WorldPosition; world:WorldPosition; locked:boolean; taps:number }

export const createBuildingInteraction=(x:number,y:number):BuildingInteractionState=>({origin:{x,y},world:{x,y},locked:false,taps:0});

export function recordBuildingTap(state:BuildingInteractionState):BuildingInteractionState{
  if(state.locked)return state;
  return {...state,world:{...state.world},taps:state.taps+1};
}

export function assertStableWorldPosition(state:BuildingInteractionState){
  if(state.world.x!==state.origin.x||state.world.y!==state.origin.y)throw new Error("Building interaction changed world position");
}

export function assertVisualTweenOnly(target:object,properties:Record<string,unknown>){
  if("x" in properties||"y" in properties)throw new Error("Building visual tween must not target world x/y");
  if(!target)throw new Error("Missing visual tween target");
}
