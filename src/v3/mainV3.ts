import Phaser from "phaser";
import {collectPond,pondProduced} from "../core/economy";
import {loadProgress,saveProgress} from "../core/storage";
import {catById} from "../data/cats";
import type {Progress} from "../types";
import {IslandScene,type BuildingId} from "./IslandScene";
import "./v3.css";

const app=document.querySelector<HTMLDivElement>("#app")!;
let progress:Progress=loadProgress();
let selected:BuildingId|null=null;

app.innerHTML=`<div class="v3-shell"><div id="game-canvas" aria-label="Interaktivní kočičí ostrov"></div><header class="v3-hud"><button class="v3-profile" aria-label="Profil"><img src="/assets/ui/paw.svg" alt=""><b>LV <span data-level></span></b></button><div class="v3-wallet"><span><img src="/assets/icons/fish.svg" alt="Rybky"><b data-fish></b></span><span class="medal"><i></i><b data-medals></b></span><span><img src="/assets/icons/diamond.svg" alt="Diamanty"><b data-diamonds></b></span></div></header><aside class="v3-sheet" aria-live="polite" hidden></aside><nav class="v3-nav" aria-label="Hlavní navigace"><button class="active" data-nav="island"><img src="/assets/icons/island.svg" alt=""><b>Ostrov</b></button><button data-nav="cats"><img src="/assets/icons/cats.svg" alt=""><b>Kočky</b></button><button data-nav="arena"><img src="/assets/icons/arena.svg" alt=""><b>Aréna</b></button><button data-nav="shop"><img src="/assets/icons/packs.svg" alt=""><b>Obchod</b></button></nav></div>`;

const sheet=app.querySelector<HTMLElement>(".v3-sheet")!;
const updateHud=(animate=false)=>{const set=(selector:string,value:number)=>{const el=app.querySelector<HTMLElement>(selector)!;el.textContent=String(value);if(animate){el.classList.remove("count-pop");void el.offsetWidth;el.classList.add("count-pop")}};set("[data-level]",progress.playerLevel);set("[data-fish]",progress.fish);set("[data-medals]",progress.medals);set("[data-diamonds]",progress.diamonds)};
updateHud();

const game=new Phaser.Game({type:Phaser.CANVAS,parent:"game-canvas",width:430,height:932,transparent:false,backgroundColor:"#79cad3",scene:IslandScene,scale:{mode:Phaser.Scale.FIT,autoCenter:Phaser.Scale.CENTER_BOTH,width:430,height:932},render:{antialias:true,pixelArt:false}});
(window as Window&{__MEOWVERSE_GAME__?:Phaser.Game}).__MEOWVERSE_GAME__=game;

const closeSheet=()=>{sheet.hidden=true;selected=null;(game.scene.getScene("IslandScene") as IslandScene).focusPond(false)};
const openSheet=(id:BuildingId)=>{selected=id;const scene=game.scene.getScene("IslandScene") as IslandScene;if(id==="pond"){
  scene.focusPond(true);const amount=pondProduced(progress);const workerId=Object.entries(progress.collection).find(([,state])=>state.assignment==="pond")?.[0];const worker=workerId?catById(workerId)?.name||workerId:"Bez kočky";
  sheet.innerHTML=`<button class="sheet-close" aria-label="Zavřít">×</button><h1>Rybník</h1><div class="pond-status"><strong>${amount}</strong><span>rybek připraveno<small>Pracuje: ${worker}</small></span></div><button class="primary-action" data-collect ${amount===0?"disabled":""}>Vyzvednout</button>`;
  sheet.hidden=false;sheet.querySelector(".sheet-close")!.addEventListener("click",closeSheet);sheet.querySelector<HTMLElement>("[data-collect]")!.onclick=()=>{if(pondProduced(progress)<=0)return;progress=collectPond(progress);saveProgress(progress);scene.emitFishReward();scene.events.emit("pond-ready",false);sheet.hidden=true;selected=null;scene.focusPond(false)};
 }else{const labels={arena:["Aréna","PvP bude zpřístupněno po dokončení ostrova."],pack:["Balíčkový dům","Odměny se právě připravují."],dairy:["Mlékárna","Výroba bude dostupná brzy."],orders:["Objednávkové auto","Nová objednávka přijede brzy."]} as const;const [title,status]=labels[id];sheet.innerHTML=`<button class="sheet-close" aria-label="Zavřít">×</button><h1>${title}</h1><p>${status}</p><button class="secondary-action" disabled>Brzy</button>`;sheet.hidden=false;sheet.querySelector(".sheet-close")!.addEventListener("click",closeSheet)}};

game.events.on("building-selected",openSheet);game.events.on("fish-arrived",()=>updateHud(true));
game.events.once("ready",()=>((game.scene.getScene("IslandScene") as IslandScene).events.emit("pond-ready",pondProduced(progress)>0)));
app.querySelectorAll<HTMLElement>("[data-nav]").forEach(button=>button.onclick=()=>{if(button.dataset.nav==="island"){closeSheet();return}sheet.innerHTML=`<button class="sheet-close" aria-label="Zavřít">×</button><h1>${button.textContent?.trim()}</h1><p>Tato část přijde po dokončení ostrova.</p><button class="secondary-action" disabled>Brzy</button>`;sheet.hidden=false;sheet.querySelector(".sheet-close")!.addEventListener("click",closeSheet)});

window.addEventListener("error",event=>{console.error(event.error);if(!app.querySelector("canvas"))app.innerHTML='<main class="v3-fatal"><h1>Ostrov se neprobudil</h1><button onclick="location.reload()">Zkusit znovu</button></main>'});
