import {
  getCustomProperty,
  incrementCustomProperty,
  setCustomProperty,
} from "./updateCustomProperty.js";

const SPEED = 0.05;
const CACTUS_INTERVAL_MIN = 500;
const CACTUS_INTERVAL_MAX = 2000;
let nextCactusTime;
const worldElem = document.querySelector("[data-world]");
export function setupCactus() {
  nextCactusTime = CACTUS_INTERVAL_MIN;
  document.querySelectorAll("[data-cactus]").forEach((cactus) => {
    cactus.remove();
  });
}

export function updateCactus(delta, speedscale) {
  document.querySelectorAll("[data-cactus]").forEach((cactus) => {
    incrementCustomProperty(cactus, "--left", delta * speedscale * SPEED * -1);
    if (getCustomProperty(cactus, "--left") <= -100) {
      cactus.remove();
    }
  });

  if (nextCactusTime <= 0) {
    createCactus();
    nextCactusTime = randomNumberBetween(
      CACTUS_INTERVAL_MIN,
      CACTUS_INTERVAL_MAX
    );
  }
  nextCactusTime -= delta;
}
function createCactus() {
  const cactus = document.createElement("img");
  cactus.dataset.cactus = true;
  cactus.src = "imgs/cactus.png";
  cactus.classList.add("cactus");
  setCustomProperty(cactus, "--left", 100);
  worldElem.appendChild(cactus);
}
function randomNumberBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
export function getCactusRects() {
  return [...document.querySelectorAll("[data-cactus]")].map((cactus) => {
    return cactus.getBoundingClientRect();
  });
}
