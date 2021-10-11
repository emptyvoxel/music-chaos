const SCALE = 10;
const PARTICLES = 500;
const CHUNKS = Math.floor(innerHeight / SCALE);
const flowField = new Array(CHUNKS * CHUNKS);
const particles = [];

const audio = new Audio();
const audioContext = new AudioContext();
const audioInput = document.createElement('input');
audioInput.type = 'file';

const track = audioContext.createMediaElementSource(audio);
const analyser = audioContext.createAnalyser();
analyser.fftSize = Math.pow(2, 14);

track.connect(analyser);
track.connect(audioContext.destination);

let dataArray = new Uint8Array(analyser.frequencyBinCount);

audioInput.oninput = ({ target }) => {
    audio.setAttribute('src', URL.createObjectURL(target.files[0]));
    audioContext.resume();
    audio.play();
    loop();
}

audio.onended = () => {
    noLoop();
}

function setup () {
    createCanvas(innerHeight, innerHeight);
    colorMode(RGB, 255);

    for (let i = 0; i < PARTICLES; i++) {
        particles.push(new Particle());
    }

    stroke(255, 255, 255, 25);
    background(0);
    noLoop();

    document.body.appendChild(audioInput);
}

function draw () {
    analyser.getByteFrequencyData(dataArray);
    for (let i = 0; i < CHUNKS; i++) {
        for (let j = 0; j < CHUNKS; j++) {
            const index = j + i * CHUNKS;
            // No idea of what this does...
            // I tested a bunch of stuff and this one was the best...
            const angle = (dataArray[j] / 128) + (dataArray[i+j] / 128) * PI;
            
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