import type {Cat} from "../types";

export const CATS: Cat[] = [
  {id:"jiskra",name:"Jiskra",element:"Oheň",power:42,profession:"Kuchař",passive:"První výhra přidá 1 medaili navíc."},
  {id:"kapka",name:"Kapka",element:"Voda",power:46,profession:"Rybář",passive:"Po výhře přinese 3 rybky navíc."},
  {id:"listka",name:"Lístka",element:"Příroda",power:44,profession:"Farmář",passive:"První prohra dne neubere sérii."},
  {id:"uhlik",name:"Uhlík",element:"Oheň",power:55,profession:"Horník",passive:"Za výhru nad Přírodou přinese 2 rybky."},
  {id:"priliv",name:"Příliv",element:"Voda",power:58,profession:"Kurýr",passive:"Za výhru přidá jednu rybku."},
  {id:"mechule",name:"Mechule",element:"Příroda",power:61,profession:"Rybář",passive:"Při práci zvýší rybník o 40 %."}
];

export const catById=(id:string)=>CATS.find(cat=>cat.id===id);
