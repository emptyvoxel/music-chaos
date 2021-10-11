// I took this code from a Perlin Noise project I did a few years ago
// When I first wrote it, I was a following a tutorial/challenge by
// The Coding Train: https://www.youtube.com/watch?v=BjoM9oKOAKY

class Particle {
    constructor (x=random(SIZE), y=random(SIZE)) {
        this.position = createVector(x, y);
        this.before = this.position.copy();
        this.velocity = createVector(0, 0);
        this.acceleration = createVector(0, 0);
        this.maxSpeed = 5;
    }

    update () {
        this.velocity.add(this.acceleration);
        this.velocity.limit(this.maxSpeed);
        this.position.add(this.velocity);
        this.acceleration.mult(0);
    }

    move (vectors) {
        const x = Math.floor(this.position.x / SCALE);
        const y = Math.floor(this.position.y / SCALE);
        const index = x + y * CHUNKS;

        this.acceleration.add(vectors[index]);
    }

    updateBefore () {
        this.before.x = this.position.x;
        this.before.y = this.position.y;
    }

    edges () {
        if (this.position.x > width) {
            this.position.x = 0;
            this.updateBefore();
        }

        else if (this.position.x < 0) {
            this.position.x = width;
            this.updateBefore();
        }

        if (this.position.y > height) {
            this.position.y = 0;
            this.updateBefore();
        }

        else if (this.position.y < 0) {
            this.position.y = height;
            this.updateBefore();
        }
    }

    render () {
        line(
            this.position.x,
            this.position.y,
            this.before.x,
            this.before.y
        );

        this.updateBefore();
    }
}