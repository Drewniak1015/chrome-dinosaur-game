import {
  getCustomProperty,
  incrementCustomProperty,
  setCustomProperty,
} from "./updateCustomProperty.js";

const dinoElem = document.querySelector("[data-dino]");
const JUMP_SPEED = 0.45;
const GRAVITY = 0.0015;
const DINO_FRAME_COUNT = 2;
const FRAME_TIME = 100;
let isJumping;
let dinoFrame;
let currentFrameTime;
let yVelocity = 0;
export function setupDino() {
  isJumping = false;
  dinoFrame = 0;
  currentFrameTime = 0;
  setCustomProperty(dinoElem, "--bottom", 0);
  document.addEventListener("keydown", onJump);
  document.addEventListener("keydown", onJump);
}
export function updateDino(delta, speedscale) {
  handleRun(delta, speedscale);
  handleJump(delta);
}
function handleRun(delta, speedscale) {
  if (isJumping) {
    dinoElem.src = `imgs/dino-stationary.png`;
    return;
  }
  if (currentFrameTime >= FRAME_TIME) {
    dinoFrame = (dinoFrame + 1) % DINO_FRAME_COUNT;
    dinoElem.src = `imgs/dino-run-${dinoFrame}.png`;
    currentFrameTime -= FRAME_TIME;
  }
  currentFrameTime += delta * speedscale;
}
function handleJump(delta) {
  if (!isJumping) return;

  incrementCustomProperty(dinoElem, "--bottom", yVelocity * delta);
  yVelocity;

  if (getCustomProperty(dinoElem, "--bottom") <= 0) {
    setCustomProperty(dinoElem, "--bottom", 0);
    isJumping = false;
  }
  yVelocity -= GRAVITY * delta;
}
function onJump(e) {
  if (e.code !== "Space" || isJumping) return;
  yVelocity = JUMP_SPEED;
  isJumping = true;
}
export function getDinoRect() {
  return dinoElem.getBoundingClientRect();
}
export function setDinoLose()
{
  dinoElem.src='imgs/dino-lose.png'
}