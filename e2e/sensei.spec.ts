import {expect,test} from "@playwright/test";
import {mkdir} from "node:fs/promises";

test.use({viewport:{width:393,height:852}});
test("nový účet vstoupí do první Senseiovy zkoušky",async({page})=>{
  await mkdir("artifacts/sensei-review",{recursive:true});
  await page.goto("/");
  await page.locator('[data-hit-area="arena"]').click();
  await page.getByRole("button",{name:"Připravit PvP"}).click();
  await expect(page.getByRole("button",{name:/Vyzvat Senseie/})).toBeVisible();
  await page.getByRole("button",{name:/Vyzvat Senseie/}).click();
  await expect(page.getByRole("heading",{name:"Sensei Tlapka"})).toBeVisible();
  await page.screenshot({path:"artifacts/sensei-review/01-dojo.png"});
  await page.getByRole("button",{name:"Zahájit zkoušku"}).click();
  await expect(page.locator(".sensei-intro")).toBeVisible();
  await page.screenshot({path:"artifacts/sensei-review/02-intro.png"});
  await expect(page.locator(".versus-screen")).toBeVisible({timeout:4000});
  await page.screenshot({path:"artifacts/sensei-review/03-versus.png"});
  await expect(page.locator(".battle-scene.choose")).toBeVisible({timeout:4000});
  await expect(page.locator(".card-hand [data-card]")).toHaveCount(5);
  await page.screenshot({path:"artifacts/sensei-review/04-trial.png"});
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=document.documentElement.clientWidth)).toBe(true);
});
