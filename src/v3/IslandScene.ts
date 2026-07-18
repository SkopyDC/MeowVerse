import Phaser from "phaser";
import {assertVisualTweenOnly} from "./buildingInteraction";

export type BuildingId="arena"|"pack"|"pond"|"dairy"|"orders";
interface BuildingSpec {id:BuildingId;texture:string;x:number;y:number;width:number;hit:{x:number;y:number;width:number;height:number};depth:number}

const BUILDINGS:BuildingSpec[]=[
  {id:"arena",texture:"arena",x:270,y:280,width:230,hit:{x:-92,y:-82,width:184,height:145},depth:280},
  {id:"pack",texture:"pack",x:92,y:315,width:132,hit:{x:-52,y:-62,width:104,height:106},depth:315},
  {id:"orders",texture:"orders",x:350,y:430,width:108,hit:{x:-43,y:-34,width:86,height:64},depth:430},
  {id:"pond",texture:"pond",x:108,y:615,width:190,hit:{x:-75,y:-58,width:150,height:116},depth:615},
  {id:"dairy",texture:"dairy",x:322,y:610,width:158,hit:{x:-62,y:-56,width:124,height:112},depth:610}
];

export class IslandScene extends Phaser.Scene{
  private buildingContainers=new Map<BuildingId,Phaser.GameObjects.Container>();
  private activeTweens=new Map<BuildingId,Phaser.Tweens.Tween>();
  private inputLocks=new Set<BuildingId>();
  private pondIndicator?:Phaser.GameObjects.Container;
  private pondRipples?:Phaser.GameObjects.Graphics;

  constructor(){super("IslandScene")}
  preload(){
    this.load.image("terrain","/assets/v3/island-terrain.png");
    this.load.image("arena","/assets/v3/arena.png");this.load.image("pack","/assets/v3/pack-house.png");
    this.load.image("pond","/assets/v3/pond.png");this.load.image("dairy","/assets/v3/dairy.png");this.load.image("orders","/assets/v3/order-van.png");
    this.load.image("cat-kapka","/assets/v3/cat-kapka.png");this.load.image("cat-jiskra","/assets/v3/cat-jiskra.png");this.load.image("cat-listka","/assets/v3/cat-listka.png");
  }
  create(){
    const terrain=this.add.image(215,466,"terrain").setDisplaySize(430,932).setDepth(0);
    terrain.setName("terrain");
    BUILDINGS.forEach(spec=>this.createBuilding(spec));
    this.createCats();
    this.events.on("pond-ready",(ready:boolean)=>this.pondIndicator?.setVisible(ready));
    this.scale.on("resize",()=>this.cameras.main.setViewport(0,0,430,932));
  }
  private createBuilding(spec:BuildingSpec){
    const shadow=this.add.ellipse(0,8,spec.width*.62,spec.width*.2,0x294b43,.23);
    const visual=this.add.container(0,0);
    const image=this.add.image(0,0,spec.texture).setDisplaySize(spec.width,spec.width);
    visual.add(image);
    const root=this.add.container(spec.x,spec.y,[shadow,visual]).setDepth(spec.depth).setName(spec.id);
    root.setSize(spec.hit.width,spec.hit.height).setInteractive(new Phaser.Geom.Rectangle(spec.hit.x,spec.hit.y,spec.hit.width,spec.hit.height),Phaser.Geom.Rectangle.Contains);
    root.setData({originX:spec.x,originY:spec.y,visual,shadow,id:spec.id});
    root.on("pointerdown",()=>this.pressBuilding(spec.id,root,visual,shadow));
    root.on("pointerup",()=>this.releaseBuilding(spec.id,root,visual,shadow));
    root.on("pointerout",()=>this.restoreBuilding(spec.id,visual,shadow));
    this.buildingContainers.set(spec.id,root);
    if(spec.id==="pond"){
      this.pondRipples=this.add.graphics().setDepth(spec.depth+1).setVisible(false);
      this.pondIndicator=this.createIndicator(spec.x-28,spec.y-83,"!").setDepth(spec.depth+3);
    }
  }
  private tweenVisual(id:BuildingId,target:Phaser.GameObjects.Container,config:Omit<Phaser.Types.Tweens.TweenBuilderConfig,"targets">){
    assertVisualTweenOnly(target,config as Record<string,unknown>);
    this.activeTweens.get(id)?.stop();
    this.activeTweens.set(id,this.tweens.add({...config,targets:target}));
  }
  private pressBuilding(id:BuildingId,_root:Phaser.GameObjects.Container,visual:Phaser.GameObjects.Container,shadow:Phaser.GameObjects.Ellipse){
    if(this.inputLocks.has(id))return;
    this.tweenVisual(id,visual,{scale:.96,duration:70,ease:"Quad.Out"});
    this.tweens.killTweensOf(shadow);this.tweens.add({targets:shadow,scaleX:.9,scaleY:.86,alpha:.16,duration:70});
  }
  private releaseBuilding(id:BuildingId,root:Phaser.GameObjects.Container,visual:Phaser.GameObjects.Container,shadow:Phaser.GameObjects.Ellipse){
    if(this.inputLocks.has(id))return;
    this.inputLocks.add(id);this.assertWorldPosition(root);
    if(id==="pond")this.ripplePond(root.x,root.y);
    this.tweenVisual(id,visual,{scale:1.08,duration:110,yoyo:true,hold:25,ease:"Back.Out",onComplete:()=>{
      visual.setScale(1);this.assertWorldPosition(root);this.inputLocks.delete(id);this.game.events.emit("building-selected",id);
    }});
    this.tweens.killTweensOf(shadow);this.tweens.add({targets:shadow,scaleX:.78,scaleY:.75,alpha:.13,duration:110,yoyo:true});
  }
  private restoreBuilding(id:BuildingId,visual:Phaser.GameObjects.Container,shadow:Phaser.GameObjects.Ellipse){
    if(this.inputLocks.has(id))return;
    this.tweenVisual(id,visual,{scale:1,duration:100,ease:"Quad.Out"});
    this.tweens.killTweensOf(shadow);this.tweens.add({targets:shadow,scale:1,alpha:.23,duration:100});
  }
  private assertWorldPosition(root:Phaser.GameObjects.Container){
    if(root.x!==root.getData("originX")||root.y!==root.getData("originY"))throw new Error(`${root.name} changed world position`);
  }
  private ripplePond(x:number,y:number){
    const graphics=this.pondRipples!;graphics.clear().setVisible(true);
    const ring={radius:8,alpha:.8};this.tweens.add({targets:ring,radius:62,alpha:0,duration:650,onUpdate:()=>{graphics.clear().lineStyle(3,0xffffff,ring.alpha).strokeCircle(x-5,y-5,ring.radius)},onComplete:()=>graphics.setVisible(false)});
  }
  private createIndicator(x:number,y:number,label:string){
    const disc=this.add.circle(0,0,18,0xe95f75).setStrokeStyle(3,0xffffff);
    const text=this.add.text(0,-1,label,{fontFamily:"Arial",fontSize:"22px",fontStyle:"bold",color:"#fff"}).setOrigin(.5);
    const indicator=this.add.container(x,y,[disc,text]);this.tweens.add({targets:indicator,y:y-5,duration:1100,yoyo:true,repeat:-1,ease:"Sine.InOut"});return indicator;
  }
  private createCats(){
    const routes=[{texture:"cat-jiskra",x:205,y:430,toX:225,toY:500,duration:6200},{texture:"cat-kapka",x:190,y:690,toX:145,toY:650,duration:5100},{texture:"cat-listka",x:270,y:730,toX:310,toY:665,duration:7000}];
    routes.forEach((route,index)=>{const shadow=this.add.ellipse(0,18,34,10,0x243d39,.24);const cat=this.add.image(0,0,route.texture).setDisplaySize(56,64);const root=this.add.container(route.x,route.y,[shadow,cat]).setDepth(route.y+10).setName(`cat-${index}`);this.tweens.add({targets:root,x:route.toX,y:route.toY,duration:route.duration,yoyo:true,repeat:-1,hold:900+index*300,ease:"Sine.InOut",onUpdate:()=>root.setDepth(root.y+10)});this.time.addEvent({delay:2800+index*650,loop:true,callback:()=>this.tweens.add({targets:cat,scaleY:.9,duration:90,yoyo:true})})});
  }
  focusPond(focused:boolean){this.tweens.add({targets:this.cameras.main,scrollY:focused?135:0,duration:320,ease:"Sine.InOut"})}
  emitFishReward(){const pond=this.buildingContainers.get("pond")!;const basket=this.add.circle(pond.x,pond.y-20,12,0xf0b24d).setStrokeStyle(3,0xffffff).setDepth(1000);this.tweens.add({targets:basket,x:330,y:38,duration:700,ease:"Cubic.In",onComplete:()=>{basket.destroy();this.game.events.emit("fish-arrived")}})}
}
