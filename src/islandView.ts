import {ISLAND_OBJECTS,objectStyle,placeIslandIndicators,type IndicatorRequest} from "./data/islandScene";

interface IslandViewOptions {
  selectedBuilding:string|null; fishReady:boolean; milkReady:boolean; craftReady:boolean;
  vanRemaining:number; vanDeparting:boolean; vanTime:string; playerLevel:number;
  walkersHtml:string; rewardFlight:boolean; sheetHtml:string;
}

const debugMode=()=>new URLSearchParams(location.search).get("debugHitAreas")==="1";
const instagramBrowser=()=>/Instagram/i.test(navigator.userAgent);
const discoveryLaunch=(()=>{try{const key="meowverse-island-discovery",seen=Number(localStorage.getItem(key)||0);localStorage.setItem(key,String(Math.min(seen+1,3)));return seen<2}catch{return false}})();

export function islandView(options:IslandViewOptions):string{
  const requests:IndicatorRequest[]=[
    {id:"arena",symbol:"⚔️",priority:80},{id:"pack",symbol:"🎁",priority:70},
    ...(options.fishReady?[{id:"pond" as const,symbol:"🐟",priority:100}]:[]),
    ...(options.milkReady?[{id:"dairy" as const,symbol:"🥛",priority:95}]:[]),
    {id:"craft",symbol:options.craftReady?"✨":"🔨",priority:options.craftReady?90:20},
    ...(!options.vanRemaining?[{id:"orders" as const,symbol:"📦",priority:85}]:[])
  ];
  const indicators=placeIslandIndicators(requests);
  const objects=ISLAND_OBJECTS.map(object=>{
    if(object.id==="orders"&&options.vanRemaining)return `<div class="island-object van-stage ${options.vanDeparting?"loading departing":"away"}" style="${objectStyle(object)}" aria-label="Objednávkové auto je pryč"><div class="loading-crates"><i>📦</i><i>📦</i><i>📦</i></div><div class="parking-sign">🪧<b data-van-timer>${options.vanTime}</b></div></div>`;
    const hit=object.hitArea;
    return `<button class="island-object island-object-${object.type} ${options.selectedBuilding===object.id?"selected":""}" style="${objectStyle(object)}" data-building="${object.id}" aria-label="${object.label}"><img class="island-object-asset" src="${object.asset}" alt=""><span class="object-hit-target" data-building="${object.id}" data-hit-area="${object.id}" style="--hit-x:${hit.x};--hit-y:${hit.y};--hit-w:${hit.width};--hit-h:${hit.height};--hit-radius:${hit.borderRadius||32}"></span><span class="debug-hit" style="--hit-x:${hit.x};--hit-y:${hit.y};--hit-w:${hit.width};--hit-h:${hit.height};--hit-radius:${hit.borderRadius||32}"></span><span class="debug-anchor">${object.id}</span></button>`;
  }).join("");
  const indicatorHtml=indicators.map(item=>`<span class="world-indicator ${item.priority<30?"subtle":""}" style="--indicator-x:${item.x};--indicator-y:${item.y}" data-indicator="${item.id}">${item.symbol}</span>`).join("");
  return `<main class="island-screen island-layered ${discoveryLaunch&&!options.selectedBuilding?"discovery":""}"><button class="quest-chip" aria-label="Aktivní úkol">⭐ <span>LV ${options.playerLevel}</span></button><section class="island-scene ${options.selectedBuilding?"focused":""} ${debugMode()?"debug-hit-areas":""}"><div class="village-map layered-world"><img class="island-ground" src="/assets/island/island-ground-v2.png" alt="Kočičí ostrov"><div class="island-object-layer">${objects}</div><div class="island-cat-layer">${options.walkersHtml}</div><div class="island-indicator-layer">${indicatorHtml}</div><div class="island-foreground" aria-hidden="true"><i></i><i></i><i></i></div></div></section>${instagramBrowser()?'<aside class="instagram-browser-tip">Pro nejlepší zážitek otevři hru v Safari nebo Chrome.</aside>':""}${options.rewardFlight?'<div class="world-reward-flight"><i>🐟</i><i>⭐</i><i>🏅</i></div>':""}${options.sheetHtml}</main>`;
}
