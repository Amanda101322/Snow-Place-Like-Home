const globe = document.querySelector("#globe");
const button = document.querySelector("#shake");
const messageElement = document.querySelector("#message");
const counterElement = document.querySelector("#counter");
const fortuneCard = document.querySelector("#fortune-card");
const themeToggle = document.querySelector("#theme-toggle");
const currentTheme = localStorage.getItem("theme");
const overlay = document.getElementById('welcome-overlay');
const enterBtn = document.getElementById('enter-btn');
const greeting = document.getElementById('snowman-greeting');

let warmthCount = parseInt(localStorage.getItem("warmthCount")) || 0;
if (counterElement) {
    counterElement.textContent = warmthCount;
}

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
if (canvas) {
    const ctx = canvas.getContext("2d");

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

// Sets up snowflake array
let flakes = [];
for (let i = 0; i < 75; i++) {
    flakes.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    radius: Math.random() * 4 + 2,
    speed: Math.random() * 1.5 + 0.8
    });
}

function drawSnow() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
    ctx.beginPath();

   for (let i =0; i < flakes.length; i++) {
    const f = flakes[i];
        ctx.moveTo(f.x, f.y);
        ctx.arc(f.x, f.y, f.radius, 0, Math.PI * 2);

        f.y += f.speed;

        if (f.y > canvas.height) {
            f.y = -f.radius;
            f.x = Math.random() * canvas.width;
        }
   }
        ctx.fill();
        requestAnimationFrame(drawSnow);
}
drawSnow();
}

const shakeSound = new Audio("snowglobe-shake-sound.mp3");
const soundToggle = document.querySelector("#sound-toggle");
let isMuted = false;

if (soundToggle) {
soundToggle.addEventListener("click", () => {
    isMuted = !isMuted;
    soundToggle.textContent = isMuted ? "🔇 Sound Off" :  "Sound On";
    
    if (isMuted) {
        shakeSound.pause();
        shakeSound.currentTime = 0;
    }
});
}

if (button) {
button.addEventListener("click", () => {
    button.disabled = true;
    warmthCount++;
    if (counterElement) {
    counterElement.textContent = warmthCount;
    }
    localStorage.setItem("warmthCount", warmthCount.toString());

    if (!isMuted) {
        shakeSound.currentTime = 0;
        shakeSound.play().catch(() => {});
    }
    if (globe) {
    globe.classList.add("shaking");
    }
    setTimeout(() => {
        if (globe) {
        globe.classList.remove("shaking");
        }
        button.disabled = false;
        shakeSound.pause();
        shakeSound.currentTime = 0;

        const randomIndex = Math.floor(Math.random() * messages.length);
        if (messageElement) {
            messageElement.textContent = messages[randomIndex];
        }

        if (fortuneCard) {
            fortuneCard.classList.remove("show");
            void fortuneCard.offsetWidth;
            fortuneCard.classList.add("show");
        }
    }, 600);
});
}
if (currentTheme === "dark") {
    document.body.classList.add("dark-mode");
    if (themeToggle) {
    themeToggle.textContent = "☼";
}
}

if (themeToggle) {
themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    const isDark = document.body.classList.contains("dark-mode");
    themeToggle.textContent = isDark ? "☼" : "☾";
    localStorage.setItem("theme", isDark ? "dark" : "light");
});
}

const currentHour = new Date().getHours();
if (greeting) {
if (currentHour < 12) {
    greeting.textContent = "Good morning! Ready for some winter kindness"
} else if (currentHour < 18) {
    greeting.textContent = "Good afternoon! Warm up with a cozy fortune"
} else {
    greeting.textContent = "Good evening! Shake the globe for tonight's warmth"
}
}

function  dismissOverlay() {
    if (overlay &&!overlay.classList.contains('hidden')) {
        overlay.classList.add('hidden');
    }
}
if (enterBtn) {
    enterBtn.addEventListener('click', dismissOverlay);
}

window.addEventListener("keyup", (event) => {
    if (event.key === 'Enter') {
        dismissOverlay();
    }
});