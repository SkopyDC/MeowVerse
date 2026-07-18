import {expect,test,type Page} from "@playwright/test";

const viewports=[{name:"iphone-390",width:390,height:844},{name:"iphone-393",width:393,height:852},{name:"iphone-430",width:430,height:932}];
async function stable(page:Page){const state=await page.evaluate(()=>({scroll:document.documentElement.scrollWidth,client:document.documentElement.clientWidth}));expect(state.scroll).toBeLessThanOrEqual(state.client)}

for(const viewport of viewports)test.describe(viewport.name,()=>{
  test.use({viewport});
  test("PWA shell a hlavní scény drží mobilní rozvržení",async({page})=>{
    await page.goto("/");
    await expect(page.locator(".island-scene")).toBeVisible();
    await stable(page);
    await page.locator('[data-hit-area="pond"]').dispatchEvent("click");
    await expect(page.locator(".bottom-sheet")).toBeVisible();
    await stable(page);
    await page.locator(".scene-shade").click({position:{x:2,y:2}});
    await page.locator('[data-hit-area="arena"]').dispatchEvent("click");
    await page.getByRole("button",{name:"Připravit PvP"}).click();
    await expect(page.locator(".prepare-screen")).toBeVisible();
    await stable(page);
    await page.getByRole("button",{name:"Hrát PvP"}).click();
    await expect(page.locator(".search-screen")).toBeVisible();
    await expect(page.locator(".versus-screen")).toBeVisible({timeout:4000});
    await expect(page.locator(".battle-scene")).toBeVisible({timeout:4000});
    await stable(page);
    await expect(page.locator(".game-header")).toHaveCount(0);
  });
});

test("čisté zařízení ani chyba localStorage nezablokuje start",async({browser})=>{const context=await browser.newContext({viewport:{width:393,height:852}});await context.addInitScript(()=>{Storage.prototype.getItem=()=>{throw new Error("storage unavailable")};Storage.prototype.setItem=()=>{throw new Error("storage unavailable")}});const page=await context.newPage();await page.goto("/");await expect(page.locator(".island-scene")).toBeVisible({timeout:3000});await context.close()});
