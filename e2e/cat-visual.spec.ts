import {test,expect} from "@playwright/test";
import {mkdir} from "node:fs/promises";

test.use({viewport:{width:393,height:852}});
test("modulární kočky ve všech používaných kontextech",async({page})=>{
  await mkdir("artifacts/cat-visual-review",{recursive:true});
  await page.goto("/");
  await expect(page.locator(".cat-avatar")).toHaveCount(2);
  await page.screenshot({path:"artifacts/cat-visual-review/island.png"});
  await page.getByRole("button",{name:/Aréna/}).click();
  await expect(page.locator(".enemy .cat-avatar")).toBeVisible();
  await expect(page.locator(".fighter .cat-avatar")).toBeVisible();
  await page.screenshot({path:"artifacts/cat-visual-review/arena.png"});
  await page.locator(".fighter-row").screenshot({path:"artifacts/cat-visual-review/cards.png"});
  await page.screenshot({path:"artifacts/cat-visual-review/collection.png"});
  await page.getByRole("button",{name:/Ostrov/}).click();
  await page.getByRole("button",{name:/Rybník/}).click();
  await page.getByRole("button",{name:/Posbírat/}).click();
  await page.getByRole("button",{name:/Vylepšit/}).click();
  await page.getByRole("button",{name:/Otevřít/}).click();
  await expect(page.locator(".reveal .cat-avatar")).toBeVisible();
  await page.screenshot({path:"artifacts/cat-visual-review/detail.png"});
  const overflow=await page.evaluate(()=>[...document.querySelectorAll<HTMLElement>(".cat-avatar")].every(wrapper=>wrapper.scrollWidth<=wrapper.clientWidth&&wrapper.scrollHeight<=wrapper.clientHeight));
  expect(overflow).toBe(true);
});
