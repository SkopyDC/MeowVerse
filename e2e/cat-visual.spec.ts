import {test,expect} from "@playwright/test";
import {mkdir} from "node:fs/promises";

const viewports=[{name:"390",width:390,height:844},{name:"393",width:393,height:852},{name:"430",width:430,height:932}];

for(const viewport of viewports)test.describe(`review-${viewport.name}`,()=>{
  test.use({viewport});
  test("screenshoty gameplay toku",async({page})=>{
    test.setTimeout(120_000);
    const dir=`artifacts/gameplay-redesign/${viewport.name}`;
    await mkdir(dir,{recursive:true});
    await page.goto("/");
    await page.screenshot({path:`${dir}/01-island.png`});
    await page.locator('[data-hit-area="pond"]').dispatchEvent("click");
    await page.screenshot({path:`${dir}/02-pond-selected.png`});
    await page.locator(".scene-shade").click({position:{x:2,y:2}});
    await page.locator('[data-hit-area="arena"]').dispatchEvent("click");
    await page.getByRole("button",{name:"Připravit PvP"}).click();
    await page.getByRole("button",{name:"Hrát PvP"}).click();
    await page.screenshot({path:`${dir}/03-searching.png`});
    await expect(page.locator(".versus-screen")).toBeVisible({timeout:5000});
    await page.screenshot({path:`${dir}/04-versus.png`});
    await expect(page.locator(".battle-scene.choose")).toBeVisible({timeout:5000});
    await page.screenshot({path:`${dir}/05-round-start.png`});
    await page.locator("[data-card]").first().click();
    await page.screenshot({path:`${dir}/06-card-selected.png`});
    await page.getByRole("button",{name:"Potvrdit"}).click();
    await page.screenshot({path:`${dir}/07-cards-facedown.png`});
    await expect(page.locator(".battle-scene.flip, .battle-scene.element").first()).toBeVisible({timeout:5000});
    await page.screenshot({path:`${dir}/08-flip.png`});
    await expect(page.locator(".battle-scene.clash, .battle-scene.result").first()).toBeVisible({timeout:5000});
    await page.screenshot({path:`${dir}/09-element-result.png`});
    let safety=0;
    while(await page.locator(".match-result").count()===0&&safety++<9){
      await expect(page.locator(".battle-scene.choose, .match-result").first()).toBeVisible({timeout:7000});
      if(await page.locator(".match-result").count())break;
      await page.locator("[data-card]").first().click();
      await page.getByRole("button",{name:"Potvrdit"}).click();
      await expect(page.locator(".battle-scene.clash, .battle-scene.result").first()).toBeVisible({timeout:5000});
      if(safety===1)await page.screenshot({path:`${dir}/10-same-element.png`});
    }
    await expect(page.locator(".match-result")).toBeVisible({timeout:5000});
    await page.screenshot({path:`${dir}/11-match-result.png`});
    const overflow=await page.evaluate(()=>document.documentElement.scrollWidth<=document.documentElement.clientWidth&&[...document.querySelectorAll<HTMLElement>(".cat-avatar")].every(el=>el.scrollWidth<=el.clientWidth&&el.scrollHeight<=el.clientHeight));
    expect(overflow).toBe(true);
  });
});
