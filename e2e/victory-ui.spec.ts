import {test,expect} from "@playwright/test";
import {mkdir} from "node:fs/promises";

test.use({viewport:{width:390,height:844}});
test("startovní šestice a kompaktní ukazatel obou cest",async({page})=>{
  test.setTimeout(30_000);
  await mkdir("artifacts/victory-review",{recursive:true});
  await page.goto("/");
  await page.locator('[data-building="arena"]').click();
  await page.getByRole("button",{name:"Hledat soupeře"}).click();
  await expect(page.locator(".prepared-team [data-card]")).toHaveCount(6);
  await page.screenshot({path:"artifacts/victory-review/01-starter-six.png"});
  await page.getByRole("button",{name:"Hledat soupeře"}).click();
  await expect(page.locator(".battle-scene")).toBeVisible({timeout:5000});
  await expect(page.locator(".victory-meter")).toHaveCount(2);
  await expect(page.locator(".victory-meter.player .victory-element")).toHaveCount(3);
  await expect(page.locator(".victory-meter.player .victory-element b")).toHaveCount(9);
  await expect(page.getByText("Vyhraj každým živlem…")).toBeVisible();
  await page.screenshot({path:"artifacts/victory-review/02-empty-progress.png"});
  await page.getByRole("button",{name:"Rozumím"}).click();
  const show=async(won:number[],points:number[],file:string,complete=false)=>{
    await page.locator(".victory-meter.player").evaluate((meter,{won,points,complete})=>{const elements=[...meter.querySelectorAll(".victory-element")];elements.forEach((element,index)=>{element.classList.toggle("won",won.includes(index));[...element.querySelectorAll("b")].forEach((dot,dotIndex)=>dot.classList.toggle("active",dotIndex<(points[index]||0)))});meter.classList.toggle("route-complete",complete)},{won,points,complete});
    await page.screenshot({path:`artifacts/victory-review/${file}`});
  };
  await show([0],[1,0,0],"03-one-element.png");
  await show([0],[2,0,0],"04-two-specialist.png");
  await show([0,1,2],[1,1,1],"05-elemental-complete.png",true);
  await show([0],[3,0,0],"06-specialist-complete.png",true);
});
