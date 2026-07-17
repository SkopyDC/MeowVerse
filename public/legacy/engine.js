export const CONFIG = Object.freeze({
  startingLives: 3,
  fishPoints: 10,
  goldenFishPoints: 30,
  spawnIntervalMs: 720,
  minSpawnIntervalMs: 330,
  roundDurationMs: 60_000,
});

export function createState(best = 0) {
  return {
    score: 0,
    lives: CONFIG.startingLives,
    best: Number.isFinite(best) ? Math.max(0, best) : 0,
    elapsed: 0,
    running: false,
  };
}

export function startGame(state) {
  return { ...createState(state.best), running: true };
}

export function collectItem(state, type) {
  if (!state.running) return state;
  if (type === "meteor" || type === "miss") {
    const lives = Math.max(0, state.lives - 1);
    return { ...state, lives, running: lives > 0 };
  }
  const points = type === "gold" ? CONFIG.goldenFishPoints : CONFIG.fishPoints;
  const score = state.score + points;
  return { ...state, score, best: Math.max(state.best, score) };
}

export function advanceTime(state, deltaMs) {
  if (!state.running) return state;
  const elapsed = state.elapsed + Math.max(0, deltaMs);
  return { ...state, elapsed, running: elapsed < CONFIG.roundDurationMs };
}

export function spawnInterval(score) {
  return Math.max(CONFIG.minSpawnIntervalMs, CONFIG.spawnIntervalMs - Math.floor(score / 50) * 45);
}

export function randomItem(random = Math.random()) {
  if (random < 0.18) return "meteor";
  if (random > 0.92) return "gold";
  return "fish";
}
