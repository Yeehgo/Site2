const canvas = document.getElementById("particleCanvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particlesArray = [];
const numberOfParticles = 100;

const mouse = {
    x: null,
    y: null,
};

window.addEventListener("mousemove", function (event) {
    mouse.x = event.x;
    mouse.y = event.y;
});

// Particle constructor
class Particle {
    constructor(x, y, size, color, weight) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.color = color;
        this.weight = weight;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fillStyle = this.color;
        ctx.fill();
    }

    update() {
        this.size -= 0.05;
        if (this.size < 0) {
            this.x = mouse.x + (Math.random() * 20 - 10);
            this.y = mouse.y + (Math.random() * 20 - 10);
            this.size = Math.random() * 15 + 1;
            this.weight = Math.random() * 2 - 0.5;
        }
        this.y += this.weight;
        this.weight += 0.02;

        if (this.y > canvas.height - this.size) {
            this.weight *= -0.7;
        }
    }
}

function init() {
    particlesArray = [];
    for (let i = 0; i < numberOfParticles; i++) {
        const size = Math.random() * 15 + 1;
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const color = "rgba(0, 255, 204, 0.7)";
        const weight = 1;
        particlesArray.push(new Particle(x, y, size, color, weight));
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
        particlesArray[i].draw();
    }
    requestAnimationFrame(animate);
}

init();
animate();

window.addEventListener("resize", function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init();
});
