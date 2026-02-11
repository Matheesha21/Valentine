// CANVAS HEARTS BACKGROUND
const canvas = document.getElementById("heartsCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let hearts = [];

function createHeart() {
  return {
    x: Math.random() * canvas.width,
    y: canvas.height + 30,
    size: Math.random() * 20 + 10,
    speed: Math.random() * 2 + 1,
    opacity: 1,
    drift: (Math.random() - 0.5) * 2
  };
}

function drawHeart(x, y, size, opacity) {
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(size / 30, size / 30);
  ctx.beginPath();
  ctx.globalAlpha = opacity;

  ctx.moveTo(0, 0);
  ctx.bezierCurveTo(-15, -15, -30, 10, 0, 30);
  ctx.bezierCurveTo(30, 10, 15, -15, 0, 0);

  ctx.fillStyle = "#ff2e63";
  ctx.fill();
  ctx.restore();
}

function animateHearts() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  hearts.forEach((heart, index) => {
    heart.y -= heart.speed;
    heart.x += heart.drift;
    heart.opacity -= 0.005;

    drawHeart(heart.x, heart.y, heart.size, heart.opacity);

    if (heart.opacity <= 0) {
      hearts.splice(index, 1);
    }
  });

  requestAnimationFrame(animateHearts);
}

setInterval(() => {
  hearts.push(createHeart());
}, 250);

animateHearts();

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});


// MOVING NO BUTTON (RUN AWAY)
const noBtn = document.getElementById("noBtn");
const yesBtn = document.getElementById("yesBtn");
const questionBox = document.getElementById("questionBox");
const surprisePage = document.getElementById("surprisePage");
const music = document.getElementById("bgMusic");

let noBtnX = 0;
let noBtnY = 0;

function moveNoButton() {
  const padding = 80;
  const maxX = window.innerWidth - noBtn.offsetWidth - padding;
  const maxY = window.innerHeight - noBtn.offsetHeight - padding;

  noBtnX = Math.random() * maxX + padding / 2;
  noBtnY = Math.random() * maxY + padding / 2;

  noBtn.style.left = `${noBtnX}px`;
  noBtn.style.top = `${noBtnY}px`;
}

// Start button at random place
moveNoButton();

document.addEventListener("mousemove", (e) => {
  const mouseX = e.clientX;
  const mouseY = e.clientY;

  const btnRect = noBtn.getBoundingClientRect();
  const btnX = btnRect.left + btnRect.width / 2;
  const btnY = btnRect.top + btnRect.height / 2;

  const distance = Math.sqrt((mouseX - btnX) ** 2 + (mouseY - btnY) ** 2);

  if (distance < 120) {
    moveNoButton();
  }
});


// YES BUTTON CLICK EVENT
yesBtn.addEventListener("click", () => {
  // Start music (browser requires user click)
  music.play();

  questionBox.classList.add("hidden");
  surprisePage.classList.remove("hidden");

  // Burst of hearts
  for (let i = 0; i < 50; i++) {
    hearts.push(createHeart());
  }
});
