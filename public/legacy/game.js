import { advanceTime, collectItem, createState, randomItem, spawnInterval, startGame } from "./engine.js";

const arena = document.querySelector("#arena");
const game = document.querySelector("#game");
const player = document.querySelector("#player");
const startScreen = document.querySelector("#start-screen");
const gameOver = document.querySelector("#game-over");
const scoreNode = document.querySelector("#score");
const bestNode = document.querySelector("#best");
const livesNode = document.querySelector("#lives");
const finalScoreNode = document.querySelector("#final-score");
const resultCopy = document.querySelector("#result-copy");

let state = createState(Number(localStorage.getItem("meowverse-best")) || 0);
let playerX = 50;
let lastFrame = 0;
let lastSpawn = 0;
let frameId = 0;

const itemGlyph = { fish: "🐟", gold: "🌟", meteor: "☄️" };

function updateHud() {
  scoreNode.textContent = state.score;
  bestNode.textContent = state.best;
  livesNode.textContent = "♥".repeat(state.lives) + "♡".repeat(3 - state.lives);
  livesNode.setAttribute("aria-label", `${state.lives} životy`);
}

function positionPlayer(clientX) {
  if (!state.running) return;
  const box = game.getBoundingClientRect();
  playerX = Math.min(94, Math.max(6, ((clientX - box.left) / box.width) * 100));
  player.style.left = `${playerX}%`;
}

function movePlayer(direction) {
  if (!state.running) return;
  playerX = Math.min(94, Math.max(6, playerX + direction * 8));
  player.style.left = `${playerX}%`;
}

function spawn() {
  const type = randomItem();
  const item = document.createElement("div");
  const x = 7 + Math.random() * 86;
  const duration = Math.max(1900, 3300 - state.score * 5);
  item.className = `falling ${type}`;
  item.textContent = itemGlyph[type];
  item.dataset.type = type;
  item.style.left = `${x}%`;
  item.style.animationDuration = `${duration}ms`;
  arena.append(item);

  item.addEventListener("animationend", () => {
    if (item.isConnected && state.running && type !== "meteor") {
      state = collectItem(state, "miss");
      flash("miss");
      updateHud();
      if (!state.running) finish();
    }
    item.remove();
  }, { once: true });
}

function detectCollisions() {
  const playerRect = player.getBoundingClientRect();
  for (const item of arena.children) {
    const rect = item.getBoundingClientRect();
    const hit = rect.bottom > playerRect.top + 8 && rect.top < playerRect.bottom && rect.right > playerRect.left && rect.left < playerRect.right;
    if (!hit) continue;
    const type = item.dataset.type;
    state = collectItem(state, type);
    item.remove();
    flash(type);
    updateHud();
    if (!state.running) finish();
  }
}

function flash(type) {
  game.classList.remove("hit", "collect");
  void game.offsetWidth;
  game.classList.add(type === "meteor" || type === "miss" ? "hit" : "collect");
  if (navigator.vibrate) navigator.vibrate(type === "meteor" ? 60 : 20);
}

function loop(time) {
  if (!state.running) return;
  if (!lastFrame) lastFrame = time;
  state = advanceTime(state, time - lastFrame);
  lastFrame = time;
  if (time - lastSpawn >= spawnInterval(state.score)) {
    spawn();
    lastSpawn = time;
  }
  detectCollisions();
  if (!state.running) return finish();
  frameId = requestAnimationFrame(loop);
}

function begin() {
  cancelAnimationFrame(frameId);
  arena.replaceChildren();
  state = startGame(state);
  playerX = 50;
  player.style.left = "50%";
  lastFrame = 0;
  lastSpawn = 0;
  startScreen.classList.remove("visible");
  gameOver.classList.remove("visible");
  player.classList.add("visible");
  updateHud();
  frameId = requestAnimationFrame(loop);
}

function finish() {
  if (gameOver.classList.contains("visible")) return;
  state = { ...state, running: false };
  cancelAnimationFrame(frameId);
  localStorage.setItem("meowverse-best", String(state.best));
  finalScoreNode.textContent = state.score;
  resultCopy.textContent = state.score >= 200 ? "Legenda MeowVerse je zrozena!" : state.score >= 80 ? "Tvé tlapky mají kosmický talent!" : "Každý kapitán začínal jako kotě.";
  player.classList.remove("visible");
  gameOver.classList.add("visible");
  updateHud();
}

document.addEventListener("pointermove", (event) => positionPlayer(event.clientX));
game.addEventListener("pointerdown", (event) => {
  positionPlayer(event.clientX);
  game.setPointerCapture?.(event.pointerId);
});
document.addEventListener("keydown", (event) => {
  if (event.key === "ArrowLeft" || event.key.toLowerCase() === "a") movePlayer(-1);
  if (event.key === "ArrowRight" || event.key.toLowerCase() === "d") movePlayer(1);
});

function bindMoveButton(selector, direction) {
  const button = document.querySelector(selector);
  let timer;
  const stop = () => clearInterval(timer);
  button.addEventListener("pointerdown", (event) => {
    event.preventDefault();
    movePlayer(direction);
    timer = setInterval(() => movePlayer(direction), 70);
  });
  button.addEventListener("pointerup", stop);
  button.addEventListener("pointercancel", stop);
  button.addEventListener("pointerleave", stop);
}

bindMoveButton("#move-left", -1);
bindMoveButton("#move-right", 1);
document.querySelector("#start-button").addEventListener("click", begin);
document.querySelector("#restart-button").addEventListener("click", begin);
updateHud();
