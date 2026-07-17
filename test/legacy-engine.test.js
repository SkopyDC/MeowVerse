import { test, expect } from "vitest";
import { advanceTime, collectItem, CONFIG, createState, randomItem, spawnInterval, startGame } from "../public/legacy/engine.js";

test("nová hra začíná se třemi životy a nulovým skóre", () => {
  const state = startGame(createState(120));
  expect(state.lives).toBe(3);
  expect(state.score).toBe(0);
  expect(state.best).toBe(120);
  expect(state.running).toBe(true);
});

test("ryby přidávají body a aktualizují rekord", () => {
  let state = startGame(createState());
  state = collectItem(state, "fish");
  state = collectItem(state, "gold");
  expect(state.score).toBe(40);
  expect(state.best).toBe(40);
});

test("meteor a minutá ryba ubírají život", () => {
  let state = startGame(createState());
  state = collectItem(state, "meteor");
  state = collectItem(state, "miss");
  state = collectItem(state, "meteor");
  expect(state.lives).toBe(0);
  expect(state.running).toBe(false);
});

test("mise skončí po časovém limitu", () => {
  const state = advanceTime(startGame(createState()), CONFIG.roundDurationMs);
  expect(state.running).toBe(false);
});

test("interval zrychluje, ale neklesne pod minimum", () => {
  expect(spawnInterval(100)).toBeLessThan(spawnInterval(0));
  expect(spawnInterval(100000)).toBe(CONFIG.minSpawnIntervalMs);
});

test("náhodný výběr pokrývá všechny typy", () => {
  expect(randomItem(0.1)).toBe("meteor");
  expect(randomItem(0.5)).toBe("fish");
  expect(randomItem(0.99)).toBe("gold");
});
