const globe = document.querySelector("#globe");
const button = document.querySelector("#shake");
const message = document.querySelector("#message");

const messages = [
    "you are someone's favourite person to sit next to",
    "the thing you are building counts, even half finished",
    "you are allowed to be a beginner for as long as you want",
    "someone is going to love what you make with this",
    "hot chocolate tastes better after a hot day",
    "you ask good questions. that is the whole skill",
];

button.addEventListener("click", () => {
    button.disabled = true;

    // to trigger the shake animation class
    globe.classList.add("shaking");

    // Removes animation class after 600ms so you can shake it again
    setTimeout(() => {
        globe.classList.remove("shaking");
        button.disabled = false;
    }, 600);

    // This will pick a random message from the array
    const pick = Math.floor(Math.random() * messages.length);
    message.textContent = messages[pick];
});