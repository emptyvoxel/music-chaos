function setup () {
    createCanvas(SIZE, SIZE);
    colorMode(RGB, 255);

    stroke('#ffffff19');
    background(0);
    noLoop();

    for (let i = 0; i < PARTICLES; i++) {
        particles.push(new Particle());
    }

    MetaConfigs();

    if (innerHeight > innerWidth) {
        document.body.className = 'vertical';
    }
}

function draw () {
    analyser.getByteFrequencyData(dataArray);
    for (let i = 0; i < CHUNKS; i++) {
        for (let j = 0; j < CHUNKS; j++) {
            const index = j + i * CHUNKS;
            // No idea of what this does...
            // I tested a bunch of stuff and this one was the best...
            const angle = (dataArray[j] / 128) + (dataArray[i+j] / 128) * PI;
            
            let vector = p5.Vector.fromAngle(angle);
            vector = vector.setMag(MAGNITUDE);
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