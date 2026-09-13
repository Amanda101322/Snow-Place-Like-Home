const globe = document.querySelector("#globe");
const button = document.querySelector("#shake");
const messageElement = document.querySelector("#message");
const counterElement = document.querySelector("#counter");
const fortuneCard = document.querySelector("#fortune-card");

let warmthCount = parseInt(localStorage.getItem("warmthCount")) || 0;
counterElement.textContent = warmthCount;

const messages = [
    "you are someone's favourite person to sit next to",
    "sending sunshine your way",
    "the thing you are building counts, even half finished",
    "you are allowed to be a beginner for as long as you want",
    "someone is going to love what you make with this",
    "hot chocolate tastes better after a hot day",
    "I am so glad your journey brought you to this page today",
    "you ask good questions-that is the whole skill",
    "you sweeten the sourest of days",
    "cheering you on cause you deserve everything that comes your way",
    "this is a good week to have a good week",
    "you make the good times better and the hard times easier",
    "if you're having a tough day, remember you'll survive",
    "you deserve all the good things life has to offer"
];

const canvas = document.getElementById("snow-canvas");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

// Creates 50 snowflakes with random positions and speeds
const flakes = Array.from({ length: 80 }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    radius: Math.random() * 4 + 2,
    speed: Math.random() * 1.5 + 0.8,
    sway: Math.random() * 0.5 - 0.25
}));

function drawSnow() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
    ctx.beginPath();

    flakes.forEach(flake => {
        ctx.moveTo(flake.x, flake.y);
        ctx.arc(flake.x, flake.y, flake.radius, 0, Math.PI * 2);

        // Move flake down
        flake.y += flake.speed;

        // Reset to top when it reaches the bottom
        if (flake.y > canvas.height) {
            flake.y = -flake.radius;
            flake.x = Math.random() * canvas.width;
        }
    });

    ctx.fill();
    requestAnimationFrame(drawSnow);
}
drawSnow();
const shakeSound = new Audio("snowglobe-shake-sound.mp3");
const soundToggle = document.querySelector("#sound-toggle");
let isMuted = false;

soundToggle.addEventListener("click", () => {
    isMuted = !isMuted;
    soundToggle.textContent = isMuted ? "🔇 Sound Off" :  "Sound On";
    
    if (isMuted) {
        shakeSound.pause();
        shakeSound.currentTime = 0;
    }
});

button.addEventListener("click", () => {
    button.disabled = true;

    warmthCount = warmthCount + 1;
    if (counterElement) {
    counterElement.textContent = warmthCount;
}
    localStorage.setItem("warmthCount", warmthCount);

    if (!isMuted) {
        shakeSound.currentTime = 0;
        shakeSound.play().catch(() => {});
    }
    globe.classList.add("shaking");
    setTimeout(() => {
        globe.classList.remove("shaking");
        button.disabled = false;
        shakeSound.pause();
        shakeSound.currentTime = 0;
    }, 600);

    const pick = Math.floor(Math.random() * messages.length);
    message.textContent = messages[pick];
});
button.addEventListener("click", () => {
    button.disabled = true;
    if (fortuneCard) {
        fortuneCard.classList.remove("show");
    }

    warmthCount++;
    counterElement.textContent = warmthCount;
    localStorage.setItem("warmthCount", warmthCount.toString());

    if (!isMuted) {
        shakeSound.currentTime = 0;
        shakeSound.play().catch(() => {});
    }
    globe.classList.add("shaking");

    setTimeout(() => {
        globe.classList.remove("shaking");
        button.disabled = false;
        shakeSound.pause();
        shakeSound.currentTime = 0;

        const pick = Math.floor(Math.random() * messages.length);
        if (messageElement) {
            messageElement.textContent = messages[pick];
        }

        if (fortuneCard) {
            fortuneCard.classList.add("show");
        }
    }, 600);
});
