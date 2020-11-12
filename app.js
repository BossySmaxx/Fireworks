let width = innerWidth, height = innerHeight;
let firework = [];
let gravity;
function setup () {
    createCanvas(width, height);
    gravity = createVector(0, 0.2);
}

function draw () {
    colorMode(RGB);
    background(0, 0, 0, 25);
    // blendMode(BLEND);
    stroke(255);
    strokeWeight(4);
    if (random(1) < 0.03) {
        firework.push(new Firework());
    }
    
    for (let i = 0; i < firework.length; i++) {
        stroke(255, 0, 0);
        firework[i].update();
        firework[i].show();     
    }

    
}

class Particle {
    constructor (x, y, hue, firework) {
        this.hue = hue;
        this.lifespan = 255;
        this.pos = createVector(x, y);
        if (firework) {
            this.vel = createVector(0, random(-20, -8));
        } else {
            this.vel = p5.Vector.random2D();
            this.vel.mult(random(2, 6))
        }
        this.acc = createVector(0, 0);
    }

    applyForce (force) {
        this.acc.add(force);
    }

    update () {
        if (!this.firework) {
            this.vel.mult(1);
            this.lifespan -= 2.5; 
        }
        this.vel.add(this.acc);
        this.pos.add(this.vel);
        this.acc.mult(0);

    }

    show () {
        colorMode(HSB);
        if (!this.firework) {
            strokeWeight(6);
            stroke(this.hue, 255, 255, this.lifespan);
        } else {
            strokeWeight(3)
            stroke(this.hue, 255, 255);
        }
        point(this.pos.x, this.pos.y);
    }

    done () {
        if (this.lifespan < 0) {
            return true;
        } else {
            return false;
        }
    }
}

class Firework {
    constructor () {
        this.hue = random(255);
        this.fireworks = new Particle(random(0, width), height, this.hue, true);
        this.particle = [];
        this.exploded = false;
    }
    
    explode () {
        for (let i = 0; i < 50; i++) {
            let p = new Particle(this.fireworks.pos.x, this.fireworks.pos.y, this.hue, false);
            this.particle.push(p);           
        }
    }
        

    update () {
        if (!this.exploded) {
            this.fireworks.applyForce(gravity);
            this.fireworks.update();
            
            if (this.fireworks.vel.y >= 0) {
                this.exploded = true;
                this.explode();
            }
        }

        for (let i = this.particle.length - 1; i >= 0; i--) {
            this.particle[i].applyForce(gravity);
            this.particle[i].update();
        }
    }
    show () {
        if (!this.exploded) {
            this.fireworks.show();
        }

        for (let i = 0; i < this.particle.length; i++) {
            this.particle[i].show();             
        }
    }
}