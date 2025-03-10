import { setupGround, updateGround } from "./ground.js";
import { getDinoRect, setupDino, updateDino, setDinoLose } from "./dino.js";
import { getCactusRects, setupCactus, updateCactus } from "./cactus.js";
const WORLD_WIDTH = 100;
const WORLD_HEIGHT = 40;
const worldElem = document.querySelector("[data-world]");
const StartScreenElem = document.querySelector("[data-start-screen]");
const scoreElem = document.getElementById("scoreElem");
const SPEED_SCALE_INCREASE = 0.00001;
setPixelToWorldScale();
window.addEventListener("resize", setPixelToWorldScale);
document.addEventListener("keydown", handleStart, { once: true });

let lastTime;
let speedscale;
let Score;
function checklose() {
  const dinoRect = getDinoRect();
  return getCactusRects().some((rect) => isColission(rect, dinoRect));
}
function isColission(rect1, rect2) {
  return (
    rect1.left < rect2.right &&
    rect1.top < rect2.bottom &&
    rect1.right > rect2.left &&
    rect1.bottom > rect2.top
  );
}
function update(time) {
  if (lastTime == null) {
    lastTime = time;
    window.requestAnimationFrame(update);
    return;
  }
  const delta = time - lastTime;
  updateGround(delta, speedscale);
  updateDino(delta, speedscale);
  updateCactus(delta, speedscale);
  updateSpeedScale(delta);
  updateScore(delta);
  if (checklose()) return handleLose();
  lastTime = time;
  window.requestAnimationFrame(update);
}
function updateSpeedScale(delta) {
  speedscale += delta * SPEED_SCALE_INCREASE;
}
function updateScore(delta) {
  Score += delta * 0.01;
  scoreElem.textContent = 'Punkty:'+Math.floor(Score);
}
function handleStart() {
  lastTime = null;
  speedscale = 1;
  Score = 0;
  setupGround();
  setupDino();
  setupCactus();
  window.requestAnimationFrame(update);
  StartScreenElem.innerHTML = "";
}

function setPixelToWorldScale() {
  let worldToPixelScale;
  if (window.innerWidth / window.innerHeight < WORLD_WIDTH / WORLD_HEIGHT) {
    worldToPixelScale = window.innerWidth / WORLD_WIDTH;
  } else worldToPixelScale = window.innerHeight / WORLD_HEIGHT;
  console.log(window.innerWidth / WORLD_WIDTH);

  worldElem.style.width = `${WORLD_WIDTH * worldToPixelScale}px`;
  worldElem.style.height = `${WORLD_HEIGHT * worldToPixelScale}px`;
}
function handleLose() {
  setDinoLose();
  setTimeout(() => {
    document.addEventListener("keydown", handleStart, { once: true });
  }, 1000);
  StartScreenElem.innerHTML =
    "przegrałeś! kliknij dowolny przycisk aby zacząć ";
}
