var canvas = document.getElementById("starfield");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var context = canvas.getContext("2d");

/* =====================
   🔊 MUSIC + START LOGIC
===================== */
const bgMusic = document.getElementById("bgMusic");
bgMusic.volume = 0.4;

const startMusicButton = document.getElementById("startMusicButton");
let animationStarted = false;

startMusicButton.addEventListener("click", () => {
    bgMusic.play().then(() => {
        startMusicButton.style.display = "none";
        animationStarted = true;   // 🚀 START TEXT ANIMATION
        requestAnimationFrame(draw);
    }).catch(err => console.log(err));
});
/* ===================== */

var stars = 500;
var colorrange = [0, 60, 240];
var starArray = [];

function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Initialize stars
for (var i = 0; i < stars; i++) {
    starArray.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 1.2,
        hue: colorrange[getRandom(0, colorrange.length - 1)],
        sat: getRandom(50, 100),
        opacity: Math.random()
    });
}

var frameNumber = 0;
var opacity = 0;
var secondOpacity = 0;
var thirdOpacity = 0;

var baseFrame = context.getImageData(0, 0, canvas.width, canvas.height);

function drawStars() {
    starArray.forEach(star => {
        context.beginPath();
        context.arc(star.x, star.y, star.radius, 0, 360);
        context.fillStyle = `hsla(${star.hue}, ${star.sat}%, 88%, ${star.opacity})`;
        context.fill();
    });
}

function updateStars() {
    starArray.forEach(star => {
        if (Math.random() > 0.99) star.opacity = Math.random();
    });
}

const valentinesButton = document.getElementById("valentinesButton");

valentinesButton.addEventListener("click", () => {
    valentinesButton.textContent = "loading...";
    fetch("send_mail.php")
        .then(res => {
            valentinesButton.textContent = res.ok
                ? "Check Your Email <3"
                : "Error 😞";
        })
        .catch(() => valentinesButton.textContent = "Error 😞");
});

function drawText() {
    var fontSize = Math.min(30, window.innerWidth / 24);
    var lineHeight = 8;

    context.font = fontSize + "px Comic Sans MS";
    context.textAlign = "center";

    context.shadowColor = "rgba(45,45,255,1)";
    context.shadowBlur = 8;

    if (frameNumber < 250) {
        context.fillStyle = `rgba(45,45,255,${opacity})`;
        context.fillText(
            "everyday day I cannot believe how lucky I am",
            canvas.width / 2,
            canvas.height / 2
        );
        opacity += 0.003;
    }

    if (frameNumber >= 250 && frameNumber < 500) opacity -= 0.003;
    if (frameNumber === 500) opacity = 0;

    if (frameNumber > 500 && frameNumber < 750) {
        context.fillStyle = `rgba(45,45,255,${opacity})`;
        context.fillText(
            "amongst trillions and trillions of stars, over billions of years",
            canvas.width / 2,
            canvas.height / 2
        );
        opacity += 0.003;
    }

    if (frameNumber >= 750 && frameNumber < 1000) opacity -= 0.003;
    if (frameNumber === 1000) opacity = 0;

    if (frameNumber > 1000 && frameNumber < 1250) {
        context.fillStyle = `rgba(45,45,255,${opacity})`;
        context.fillText(
            "to be alive, and to get to spend this life with you",
            canvas.width / 2,
            canvas.height / 2
        );
        opacity += 0.003;
    }

    if (frameNumber >= 1250 && frameNumber < 1500) opacity -= 0.003;
    if (frameNumber === 1500) opacity = 0;

    if (frameNumber >= 3000) {
        context.fillStyle = `rgba(45,45,255,${thirdOpacity})`;
        context.fillText(
            "Will you be my Valentine <3 ?",
            canvas.width / 2,
            canvas.height / 2 + 120
        );
        thirdOpacity += 0.003;
        valentinesButton.style.display = "block";
    }

    context.shadowColor = "transparent";
}

function draw() {
    if (!animationStarted) return; // ⛔ DO NOTHING until button click

    context.putImageData(baseFrame, 0, 0);
    drawStars();
    updateStars();
    drawText();

    frameNumber++;
    requestAnimationFrame(draw);
}

window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    baseFrame = context.getImageData(0, 0, canvas.width, canvas.height);
});
