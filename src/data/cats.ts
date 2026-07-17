import type { Cat } from "../types";
export const CATS: Cat[] = [
  {id:"jiskra",name:"Jiskra",description:"Odvážná strážkyně luceren.",element:"Oheň",rarity:"Běžná",power:42,passive:"+8 síly v prvním kole",colors:["#ff7b55","#ffd166"]},
  {id:"kapka",name:"Kapka",description:"Tichý průzkumník z modrých zátok.",element:"Voda",rarity:"Běžná",power:42,passive:"+10 proti Ohni",colors:["#4dc5ff","#a8efff"]},
  {id:"listka",name:"Lístka",description:"Zahradnice, které naslouchají semínka.",element:"Příroda",rarity:"Běžná",power:42,passive:"+10 proti Vodě",colors:["#56c778","#d5ef8a"]},
  {id:"uhlík",name:"Uhlík",description:"Malý kominík s velkým srdcem.",element:"Oheň",rarity:"Běžná",power:45,passive:"+6 po prohraném kole",colors:["#5e526c","#ff805d"]},
  {id:"priliv",name:"Příliv",description:"Šermířka z perleťových útesů.",element:"Voda",rarity:"Vzácná",power:54,passive:"+10 proti Ohni",colors:["#287fdb","#62e0e8"]},
  {id:"mechule",name:"Mechule",description:"Léčitelka ze šeptajícího háje.",element:"Příroda",rarity:"Vzácná",power:55,passive:"+8 v posledním kole",colors:["#3ca66b","#b7dc67"]},
  {id:"plaminek",name:"Plamínek",description:"Hasič, který se ohně nebojí.",element:"Oheň",rarity:"Vzácná",power:56,passive:"+12 po prohraném kole",colors:["#ef4b45","#ffb34e"]},
  {id:"koralo",name:"Korálo",description:"Strážce živých podmořských měst.",element:"Voda",rarity:"Epická",power:66,passive:"+8 v prvním kole",colors:["#6c5ce7","#39d9dc"]},
  {id:"dubena",name:"Duběna",description:"Prastará ochránkyně kořenů.",element:"Příroda",rarity:"Epická",power:67,passive:"+10 proti Vodě",colors:["#48753a","#d4a85a"]},
  {id:"lavous",name:"Lávous",description:"Král žhavých sopečných plání.",element:"Oheň",rarity:"Legendární",power:79,passive:"+12 po prohraném kole",colors:["#9d2639","#ffca57"]},
  {id:"marena",name:"Maréna",description:"Královna devíti přílivů.",element:"Voda",rarity:"Legendární",power:80,passive:"+10 proti Ohni",colors:["#234dbe","#a67cff"]},
  {id:"vesmir",name:"Vesmírek",description:"Poutník zpoza poslední hvězdy.",element:"Příroda",rarity:"Mýtická",power:95,passive:"+15 v rozhodujícím kole",colors:["#281d68","#e276ff"]}
];
export const catById=(id:string)=>CATS.find(c=>c.id===id);
