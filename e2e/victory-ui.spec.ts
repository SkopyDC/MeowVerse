import {test,expect} from "@playwright/test";

test.use({viewport:{width:390,height:844}});
test("balíček 20 karet a filmový průběh kola",async({page})=>{
  await page.goto("/");
  await page.locator('[data-building="arena"]').click();
  await page.getByRole("button",{name:"Připravit PvP"}).click();
  await expect(page.locator(".deck-summary")).toContainText("20/20");
  await page.getByRole("button",{name:"Hrát PvP"}).click();
  await expect(page.locator(".battle-scene.choose")).toBeVisible({timeout:5000});
  await expect(page.locator(".card-hand [data-card]")).toHaveCount(5);
  await page.locator("[data-card]").first().click();
  await page.getByRole("button",{name:"Potvrdit"}).click();
  await expect(page.getByText("Čekáme na soupeře…")).toBeVisible();
  await expect(page.locator(".battle-scene.flip")).toBeVisible({timeout:5000});
  await expect(page.locator(".battle-scene.clash")).toBeVisible({timeout:5000});
  await expect(page.locator(".battle-scene.result")).toBeVisible({timeout:5000});
  await expect(page.locator(".score-paws i.won")).toHaveCount(1);
});
