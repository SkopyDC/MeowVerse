import type {BeltId,Cat,ElementType,Progress} from "../types";

export const BELTS:{id:BeltId;name:string;color:string}[]=[
  {id:"white",name:"Bílý pásek",color:"#f7f3e8"},{id:"yellow",name:"Žlutý pásek",color:"#f2cf45"},{id:"orange",name:"Oranžový pásek",color:"#ed8b3a"},{id:"green",name:"Zelený pásek",color:"#55a765"},{id:"blue",name:"Modrý pásek",color:"#4c83cf"},{id:"purple",name:"Fialový pásek",color:"#8258ae"},{id:"brown",name:"Hnědý pásek",color:"#81563d"},{id:"black",name:"Černý pásek",color:"#24232b"}
];

export const SENSEI_CARDS:Cat[]=[
  {id:"student-paw",name:"Učedník Tlapka",element:"Příroda",power:40,profession:"Kurýr",passive:"Klidný začátek"},
  {id:"bamboo-guard",name:"Bambusový Strážce",element:"Příroda",power:58,profession:"Farmář",passive:"Pevný postoj"},
  {id:"calm-drop",name:"Kapka Klidu",element:"Voda",power:52,profession:"Rybář",passive:"Klid v remíze"},
  {id:"flame-claw",name:"Plamenný Dráp",element:"Oheň",power:56,profession:"Kuchař",passive:"Návrat po prohře"},
  {id:"three-elements",name:"Mistr Tří živlů",element:"Voda",power:64,profession:"Kurýr",passive:"Čte historii"},
  {id:"shadow-sensei",name:"Stínový Sensei",element:"Oheň",power:70,profession:"Horník",passive:"Omezuje opakování"}
];
export interface SenseiTrial{id:string;from:BeltId;to:BeltId;name:string;minWins:number;recommendedPower:number;requiredElements:number;ai:number;reward:{medals:number;diamonds:number;frame:string};deck:string[];quote:string}
export const SENSEI_TRIALS:SenseiTrial[]=[
  {id:"white-yellow",from:"white",to:"yellow",name:"Sensei Tlapka",minWins:0,recommendedPower:40,requiredElements:1,ai:1,reward:{medals:5,diamonds:2,frame:"frame-yellow"},deck:["student-paw","calm-drop","student-paw"],quote:"Ukaž, co ses naučil."},
  {id:"yellow-orange",from:"yellow",to:"orange",name:"Sensei Bambus",minWins:3,recommendedPower:46,requiredElements:2,ai:2,reward:{medals:8,diamonds:3,frame:"frame-orange"},deck:["bamboo-guard","calm-drop","flame-claw"],quote:"Síla bez rozvahy nestačí."},
  {id:"orange-green",from:"orange",to:"green",name:"Sensei Klid",minWins:7,recommendedPower:50,requiredElements:2,ai:3,reward:{medals:10,diamonds:3,frame:"frame-green"},deck:["calm-drop","bamboo-guard","flame-claw"],quote:"Poznej rytmus souboje."},
  {id:"green-blue",from:"green",to:"blue",name:"Sensei Živlů",minWins:12,recommendedPower:55,requiredElements:3,ai:4,reward:{medals:12,diamonds:4,frame:"frame-blue"},deck:["three-elements","bamboo-guard","flame-claw"],quote:"Tři živly. Jedno rozhodnutí."},
  {id:"blue-purple",from:"blue",to:"purple",name:"Sensei Rovnováhy",minWins:20,recommendedPower:60,requiredElements:3,ai:5,reward:{medals:15,diamonds:5,frame:"frame-purple"},deck:["three-elements","calm-drop","flame-claw"],quote:"Šetři sílu na pravý okamžik."},
  {id:"purple-brown",from:"purple",to:"brown",name:"Sensei Stínu",minWins:30,recommendedPower:65,requiredElements:3,ai:6,reward:{medals:18,diamonds:6,frame:"frame-brown"},deck:["shadow-sensei","three-elements","bamboo-guard"],quote:"Vidím jen to, co jsi odhalil."},
  {id:"brown-black",from:"brown",to:"black",name:"Velmistr Mňau",minWins:45,recommendedPower:70,requiredElements:3,ai:7,reward:{medals:25,diamonds:10,frame:"frame-black"},deck:["shadow-sensei","three-elements","flame-claw"],quote:"Černý pásek se získává."}
];
export type Readiness="Nepřipraven"|"Slabá šance"|"Připraven"|"Výborně připraven";
export function currentTrial(progress:Progress){return SENSEI_TRIALS.find(trial=>trial.from===progress.belt)||null}
export function evaluateSenseiReadiness(progress:Progress,deck:Cat[],trial=currentTrial(progress)):Readiness{
  if(!trial||!deck.length)return"Nepřipraven";const average=deck.reduce((sum,cat)=>sum+cat.power,0)/deck.length;const elements=new Set(deck.map(cat=>cat.element)).size;let score=0;if(average>=trial.recommendedPower)score+=2;else if(average>=trial.recommendedPower-8)score++;if(elements>=trial.requiredElements)score++;if(progress.wins>=trial.minWins)score++;if(deck.some(cat=>cat.passive))score++;return score<=1?"Nepřipraven":score===2?"Slabá šance":score<=4?"Připraven":"Výborně připraven";
}
function random(seed:number){let value=seed>>>0;return()=>((value=(value*1664525+1013904223)>>>0)/4294967296)}
export interface SenseiPublicState{round:number;senseiScore:number;playerScore:number;playerUsed:ElementType[];senseiUsed:string[];playerDeployed:Cat}
export class SenseiAI{
  private committed=new Map<number,Cat>();private rng:()=>number;
  constructor(private trial:SenseiTrial,seed=741){this.rng=random(seed)}
  commit(state:SenseiPublicState){const existing=this.committed.get(state.round);if(existing)return existing;const available=this.trial.deck.map(id=>SENSEI_CARDS.find(cat=>cat.id===id)!).filter(cat=>cat&&!state.senseiUsed.includes(cat.id));const pool=available.length?available:this.trial.deck.map(id=>SENSEI_CARDS.find(cat=>cat.id===id)!);let choice=pool[Math.floor(this.rng()*pool.length)]!;if(this.trial.ai>=4&&state.playerUsed.length){const frequent=state.playerUsed.at(-1)!;const beats:Record<ElementType,ElementType>={Oheň:"Voda",Voda:"Příroda",Příroda:"Oheň"};choice=pool.find(cat=>cat.element===beats[frequent])||choice}this.committed.set(state.round,choice);return choice}
}
export function awardSenseiVictory(progress:Progress,trial:SenseiTrial){if(progress.belt!==trial.from)return progress;const first=!progress.defeatedSenseiTrials.includes(trial.id);return {...progress,belt:trial.to,profileFrame:first?trial.reward.frame:progress.profileFrame,medals:progress.medals+(first?trial.reward.medals:1),diamonds:progress.diamonds+(first?trial.reward.diamonds:0),defeatedSenseiTrials:first?[...progress.defeatedSenseiTrials,trial.id]:progress.defeatedSenseiTrials}}
export function recordSenseiAttempt(progress:Progress,trial:SenseiTrial){return {...progress,senseiAttempts:{...progress.senseiAttempts,[trial.id]:(progress.senseiAttempts[trial.id]||0)+1}}}
export function senseiAdvice(playerUsed:Cat[]){const counts={Oheň:0,Voda:0,Příroda:0};for(const cat of playerUsed)counts[cat.element]++;const missing=(Object.keys(counts) as ElementType[]).find(key=>counts[key]===0);return missing?`Tvé sestavě chybí ${missing}.`:"Neodhaluj nejsilnější kartu příliš brzy."}
