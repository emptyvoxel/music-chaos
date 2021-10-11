const SCALE = 10;
const PARTICLES = 100;
const CHUNKS = Math.floor(innerHeight / SCALE);
const flowField = new Array(CHUNKS * CHUNKS);

const particles = [];

function setup () {
    createCanvas(innerHeight, innerHeight);
    colorMode(RGB, 255);

    for (let i = 0; i < PARTICLES; i++) {
        particles.push(new Particle());
    }

    background(0);
    stroke(0, 255, 255, 30);
}

function draw () {
    for (let i = 0; i < CHUNKS; i++) {
        for (let j = 0; j < CHUNKS; j++) {
            const index = j + i * CHUNKS;
            const angle = random(10);
            
            const vector = p5.Vector.fromAngle(angle);
            flowField[index] = vector;
        }
    }

    for (let i = 0; i < particles.length; i++) {
        particles[i].move(flowField);
        particles[i].update();
        particles[i].edges();
        particles[i].render();
    }
}