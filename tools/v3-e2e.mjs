import {chromium} from "playwright";
import {createServer} from "vite";
import {mkdir} from "node:fs/promises";

const remoteBase=process.env.V3_BASE_URL;
const server=remoteBase?null:await createServer({server:{host:"127.0.0.1",port:4173,strictPort:true}});
if(server)await server.listen();
const baseUrl=remoteBase||"http://127.0.0.1:4173";
const browser=await chromium.launch({headless:true});
const viewports=[{name:"390",width:390,height:844},{name:"393",width:393,height:852},{name:"430",width:430,height:932}];
const assert=(condition,message)=>{if(!condition)throw new Error(message)};

try{
  for(const viewport of viewports){
    const context=await browser.newContext({viewport,serviceWorkers:"block"});
    const page=await context.newPage();
    await page.goto(baseUrl,{waitUntil:"domcontentloaded"});
    await page.waitForSelector("canvas");
    assert(await page.locator(".v3-nav button").count()===4,`${viewport.name}: navigation count`);
    await mkdir(`artifacts/rebuild-v3/${viewport.name}`,{recursive:true});
    if(!remoteBase)await page.screenshot({path:`artifacts/rebuild-v3/${viewport.name}/01-island.png`});
    const box=await page.locator("canvas").boundingBox();assert(box,`${viewport.name}: canvas missing`);
    await page.mouse.click(box.x+108/430*box.width,box.y+615/932*box.height);
    await page.waitForSelector(".v3-sheet:not([hidden])");
    assert((await page.locator(".v3-sheet h1").textContent())==="Rybník",`${viewport.name}: pond sheet`);
    if(!remoteBase)await page.screenshot({path:`artifacts/rebuild-v3/${viewport.name}/02-pond-sheet.png`});
    const before=Number(await page.locator("[data-fish]").textContent());
    await page.locator("[data-collect]").dispatchEvent("click");
    await page.waitForTimeout(900);
    const after=Number(await page.locator("[data-fish]").textContent());assert(after>=before,`${viewport.name}: fish counter`);
    if(!remoteBase)await page.screenshot({path:`artifacts/rebuild-v3/${viewport.name}/03-collected.png`});
    const stable=await page.evaluate(()=>{const game=window.__MEOWVERSE_GAME__;const pond=game.scene.getScene("IslandScene").children.getByName("pond");return pond.x===pond.getData("originX")&&pond.y===pond.getData("originY")});
    assert(stable,`${viewport.name}: pond world position changed`);
    assert(await page.locator(".v3-fatal").count()===0,`${viewport.name}: fatal screen`);
    assert(await page.evaluate(()=>document.documentElement.scrollWidth<=document.documentElement.clientWidth),`${viewport.name}: horizontal overflow`);
    await context.close();
    console.log(`✓ ${viewport.width}×${viewport.height}`);
  }
  const context=await browser.newContext({viewport:{width:390,height:844},serviceWorkers:"block"});
  await context.addInitScript(()=>{Storage.prototype.getItem=()=>{throw new Error("unavailable")};Storage.prototype.setItem=()=>{throw new Error("unavailable")}});
  const page=await context.newPage();await page.goto(baseUrl,{waitUntil:"domcontentloaded"});await page.waitForSelector("canvas");assert(await page.locator(".v3-fatal").count()===0,"clean start failed");await context.close();console.log("✓ čistý start");
}finally{
  await Promise.race([browser.close(),new Promise(resolve=>setTimeout(resolve,2000))]);
  if(server)await server.close();
}
process.exit(0);
