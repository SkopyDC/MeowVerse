import {test,expect} from "@playwright/test";
import {mkdir} from "node:fs/promises";

test.use({viewport:{width:393,height:852}});
test("nový účet vstoupí do první Senseiovy zkoušky",async({page})=>{
  test.setTimeout(90_000);
  await mkdir("artifacts/sensei-review",{recursive:true});
  await page.goto("/");
  await page.locator('[data-building="arena"]').click();
  await page.getByRole("button",{name:"Hledat soupeře"}).click();
  await expect(page.getByRole("button",{name:/Vyzvat Senseie/})).toBeVisible();
  await page.getByRole("button",{name:/Vyzvat Senseie/}).click();
  await expect(page.getByRole("heading",{name:"Sensei Tlapka"})).toBeVisible();
  await expect(page.getByText("Bílý pásek")).toBeVisible();
  await expect(page.getByText("Žlutý pásek")).toBeVisible();
  await page.screenshot({path:"artifacts/sensei-review/01-dojo.png"});
  await page.getByRole("button",{name:"Zahájit zkoušku"}).click();
  await expect(page.locator(".sensei-intro")).toBeVisible();
  await page.screenshot({path:"artifacts/sensei-review/02-intro.png"});
  await expect(page.locator(".versus-screen")).toBeVisible({timeout:4000});
  await page.screenshot({path:"artifacts/sensei-review/03-versus.png"});
  await expect(page.locator(".battle-scene.choose")).toBeVisible({timeout:4000});
  await page.screenshot({path:"artifacts/sensei-review/04-trial.png"});
  const elementalRoute=["mechule","uhlik","priliv"];
  let rounds=0;
  while(await page.locator(".belt-award").count()===0&&rounds<elementalRoute.length){
    await expect(page.locator(".battle-scene.choose, .belt-award").first()).toBeVisible({timeout:7000});
    if(await page.locator(".belt-award").count())break;
    await page.locator(`[data-card="${elementalRoute[rounds++]}"]`).click();
    await page.getByRole("button",{name:"Potvrdit"}).click();
    await expect(page.locator(".battle-scene.clash")).toBeVisible({timeout:5000});
  }
  await expect(page.locator(".belt-award")).toBeVisible({timeout:7000});
  await expect(page.getByRole("heading",{name:"Žlutý pásek"})).toBeVisible();
  await page.screenshot({path:"artifacts/sensei-review/05-belt-award.png"});
  const overflow=await page.evaluate(()=>document.documentElement.scrollWidth<=document.documentElement.clientWidth);
  expect(overflow).toBe(true);
});
