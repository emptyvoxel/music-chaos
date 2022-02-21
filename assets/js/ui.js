let SCALE = 10;
let PARTICLES = 500;
let MAGNITUDE = 10;
let particles = [];
let COLOR = '#ffffff';

const SIZE = Math.min(innerHeight, innerWidth);
let CHUNKS = Math.floor(SIZE / SCALE);
let flowField = new Array(CHUNKS * CHUNKS);

const audio = new Audio();
const audioContext = new AudioContext();

const track = audioContext.createMediaElementSource(audio);
const analyser = audioContext.createAnalyser();
analyser.fftSize = Math.pow(2, 14);

track.connect(analyser);
track.connect(audioContext.destination);

let dataArray = new Uint8Array(analyser.frequencyBinCount);

function ConfigName (name, config) {
    const container = document.createElement('div');
    const element = document.createElement('h1');
    element.innerText = name;

    container.appendChild(element);
    container.appendChild(config);

    document.body.appendChild(container);
}

function ScaleConfig () {
    const element = document.createElement('input');
    element.type = 'number';
    element.value = SCALE;
    element.max = 20;
    element.min = 5;
    element.oninput = ({ target }) => {
        SCALE = Number(target.value);
        CHUNKS = Math.floor(SIZE / SCALE);
        flowField = new Array(CHUNKS * CHUNKS);
    };

    ConfigName('Chunk Scale', element);
}

function ParticlesConfig () {
    const element = document.createElement('input');
    element.type = 'number';
    element.value = PARTICLES;
    element.max = 600;
    element.min = 100;
    element.oninput = ({ target }) => {
        particles = [];
        for (let i = 0; i < Number(target.value); i++) {
            particles.push(new Particle());
        }
    }

    ConfigName('Particle Count', element);
}

function MagnitudeConfig () {
    const element = document.createElement('input');
    element.type = 'number';
    element.value = MAGNITUDE;
    element.max = 10;
    element.min = 1;
    element.oninput = ({ target }) => MAGNITUDE = Number(target.value);

    ConfigName('Vector Magnitude', element);
}

function ColorConfig () {
    const element = document.createElement('input');
    element.type = 'color';
    element.value = COLOR;
    element.oninput = ({ target }) => stroke(`${target.value}19`);

    ConfigName('Stroke Color', element);
}

function AudioInput () {
    const element = document.createElement('input');
    element.type = 'file';

    element.oninput = ({ target }) => {
        audio.setAttribute('src', URL.createObjectURL(target.files[0]));
        audioContext.resume();
        audio.play();
        loop();
    }

    ConfigName('Audio File', element);
}

function MetaConfigs () {
    AudioInput();
    ColorConfig();
    MagnitudeConfig();
    ParticlesConfig();
    ScaleConfig();
}