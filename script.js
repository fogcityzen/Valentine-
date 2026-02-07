var canvas = document.getElementById("starfield");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

/* =====================
   🔊 MUSIC SETUP
===================== */
const bgMusic = document.getElementById("bgMusic");
bgMusic.volume = 0.4;

const startMusicButton = document.getElementById("startMusicButton");

startMusicButton.addEventListener("click", () => {
    bgMusic.play().then(() => {
        startMusicButton.style.display = "none";
    }).catch(err => {
        console.log("Music play blocked:", err);
    });
});
/* ===================== */

var context = canvas.getContext("2d");
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
        if (Math.random() > 0.99) {
            star.opacity = Math.random();
        }
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
        .catch(() => {
            valentinesButton.textContent = "Error 😞";
        });
});

function drawTextWithLineBreaks(lines, x, y, fontSize, lineHeight) {
    lines.forEach((line, i) => {
        context.fillText(line, x, y + i * (fontSize + lineHeight));
    });
}

function drawText() {
    var fontSize = Math.min(30, window.innerWidth / 24);
    var lineHeight = 8;

    context.font = fontSize + "px Comic Sans MS";
    context.textAlign = "center";

    context.shadowColor = "rgba(45,45,255,1)";
    context.shadowBlur = 8;

    if (frameNumber < 250) {
        context.fillStyle = `rgba(45,45,255,${opacity})`;
        context.fillText("everyday day I cannot believe how lucky I am", canvas.width/2, canvas.height/2);
        opacity += 0.003;
    }

    if (frameNumber >= 250 && frameNumber < 500) opacity -= 0.003;
    if (frameNumber === 500) opacity = 0;

    if (frameNumber > 500 && frameNumber < 750) {
        context.fillStyle = `rgba(45,45,255,${opacity})`;
        drawTextWithLineBreaks(
            ["amongst trillions and trillions of stars,", "over billions of years"],
            canvas.width/2,
            canvas.height/2,
            fontSize,
            lineHeight
        );
        opacity += 0.003;
    }

    if (frameNumber >= 750 && frameNumber < 1000) opacity -= 0.003;
    if (frameNumber === 1000) opacity = 0;

    if (frameNumber > 1000 && frameNumber < 1250) {
        context.fillStyle = `rgba(45,45,255,${opacity})`;
        context.fillText("to be alive, and to get to spend this life with you", canvas.width/2, canvas.height/2);
        opacity += 0.003;
    }

    if (frameNumber >= 1250 && frameNumber < 1500) opacity -= 0.003;
    if (frameNumber === 1500) opacity = 0;

    if (frameNumber > 1500 && frameNumber < 1750) {
        context.fillStyle = `rgba(45,45,255,${opacity})`;
        context.fillText("is so incredibly, unfathomably unlikely", canvas.width/2, canvas.height/2);
        opacity += 0.003;
    }

    if (frameNumber >= 1750 && frameNumber < 2000) opacity -= 0.003;
    if (frameNumber === 2000) opacity = 0;

    if (frameNumber > 2000 && frameNumber < 2250) {
        context.fillStyle = `rgba(45,45,255,${opacity})`;
        context.fillText("and yet here I am to get the impossible chance to get to know you", canvas.width/2, canvas.height/2);
        opacity += 0.003;
    }

    if (frameNumber >= 2250 && frameNumber < 2500) opacity -= 0.003;
    if (frameNumber === 2500) opacity = 0;

    if (frameNumber > 2500) {
        context.fillStyle = `rgba(45,45,255,${opacity})`;
        context.fillText(
            "I love you so much Khadidja <3 , more than all the time and space in the universe can contain",
            canvas.width/2,
            canvas.height/2
        );
        opacity += 0.003;
    }

    if (frameNumber >= 2750) {
        context.fillStyle = `rgba(45,45,255,${secondOpacity})`;
        context.fillText(
            "and I can't wait to spend all the time in the world to share that love with you!",
            canvas.width/2,
            canvas.height/2 + 50
        );
        secondOpacity += 0.003;
    }

    if (frameNumber >= 3000) {
        context.fillStyle = `rgba(45,45,255,${thirdOpacity})`;
        context.fillText("Will you be my Valentine <3 ?", canvas.width/2, canvas.height/2 + 120);
        thirdOpacity += 0.003;
        valentinesButton.style.display = "block";
    }

    context.shadowColor = "transparent";
}

function draw() {
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

requestAnimationFrame(draw);
