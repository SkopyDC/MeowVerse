import {expect,test,type Page} from "@playwright/test";
import {mkdir} from "node:fs/promises";

const viewports=[{name:"390",width:390,height:844},{name:"393",width:393,height:852},{name:"430",width:430,height:932}];
const storageKey="meowverse-progress-v5";

async function setProgress(page:Page,changes:Record<string,unknown>){await page.evaluate(({storageKey,changes})=>{const current=JSON.parse(localStorage.getItem(storageKey)!);localStorage.setItem(storageKey,JSON.stringify({...current,...changes}))},{storageKey,changes});await page.reload()}

for(const viewport of viewports)test.describe(`ostrov-${viewport.name}`,()=>{
  test.use({viewport});
  test("přímé budovy, objednávka, odjezd a návrat auta",async({page})=>{
    test.setTimeout(45_000);
    const dir=`artifacts/island-redesign/${viewport.name}`;
    await mkdir(dir,{recursive:true});
    await page.goto("/");
    await page.screenshot({path:`${dir}/01-island.png`});

    await page.locator('[data-hit-area="dairy"]').dispatchEvent("click");
    await expect(page.getByText("Mlékárna")).toBeVisible();
    await page.screenshot({path:`${dir}/02-dairy-selected.png`});
    await page.locator(".scene-shade").click({position:{x:2,y:2}});
    await page.locator('[data-hit-area="pond"]').dispatchEvent("click");
    await expect(page.getByText("Rybník",{exact:true})).toBeVisible();
    await page.locator(".scene-shade").click({position:{x:2,y:2}});

    await page.locator('[data-hit-area="orders"]').dispatchEvent("click");
    await expect(page.locator(".order-ticket")).toBeVisible();
    await expect(page.getByRole("button",{name:"Naložit objednávku"})).toBeDisabled();
    await setProgress(page,{milk:3,fish:2,cheese:1,orderVanReturnAt:0});
    await page.locator('[data-hit-area="orders"]').dispatchEvent("click");
    await expect(page.getByRole("button",{name:"Naložit objednávku"})).toBeEnabled();
    await page.screenshot({path:`${dir}/03-order-ticket.png`});
    await page.getByRole("button",{name:"Naložit objednávku"}).click();
    await expect(page.locator(".van-stage.departing")).toBeVisible();
    await page.screenshot({path:`${dir}/04-loading-crates.png`});
    await page.waitForTimeout(1800);
    await page.screenshot({path:`${dir}/05-van-departing.png`});
    await page.waitForTimeout(1500);
    await expect(page.locator('[data-hit-area="orders"]')).toHaveCount(0);
    await expect(page.locator("[data-van-timer]")).toBeVisible();
    await page.screenshot({path:`${dir}/06-empty-parking.png`});
    const beforeReload=await page.locator("[data-van-timer]").textContent();
    await page.reload();
    await expect(page.locator('[data-hit-area="orders"]')).toHaveCount(0);
    expect(await page.locator("[data-van-timer]").textContent()).not.toBe("0:00");
    expect(beforeReload).toBeTruthy();
    await setProgress(page,{orderVanReturnAt:Date.now()-1});
    await expect(page.locator('[data-hit-area="orders"]')).toBeVisible();
    await page.screenshot({path:`${dir}/07-van-returned.png`});

    const boxes=await page.locator("[data-hit-area]").evaluateAll(elements=>elements.map(element=>{const rect=(element as HTMLElement).getBoundingClientRect();return {name:(element as HTMLElement).dataset.hitArea!,left:rect.left,right:rect.right,top:rect.top,bottom:rect.bottom}}));
    for(let index=0;index<boxes.length;index++)for(let other=index+1;other<boxes.length;other++){const a=boxes[index]!,b=boxes[other]!;const overlap=Math.max(0,Math.min(a.right,b.right)-Math.max(a.left,b.left))*Math.max(0,Math.min(a.bottom,b.bottom)-Math.max(a.top,b.top));expect(overlap,`${a.name} překrývá ${b.name}`).toBe(0)}
  });
});
