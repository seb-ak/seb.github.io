document.addEventListener('DOMContentLoaded', () => {
    const game = document.querySelector('.game');
    const fpsDisplay = document.getElementById('fpsDisplay');

    let lastFrameTime = Date.now();
    const fpsCap = 144;
    const frameDuration = 1000 / fpsCap;

    let player = new Player();
    let squares = new Squares(20, 18, 0.1); // Pass the arguments correctly

    function update() {
        const currentFrameTime = Date.now();
        const deltaTime = currentFrameTime - lastFrameTime;

        if (deltaTime >= frameDuration) {
            const fps = Math.round(1000 / deltaTime);
            fpsDisplay.textContent = `FPS: ${fps}`;
            lastFrameTime = currentFrameTime;

            player.updatePos();
            
            const ox = -player.position.x/10
            const oy = -player.position.y/10
            const extraAngle = player.extraX / 500 * (180 / Math.PI);

            squares.draw(ox, oy, extraAngle, player);
            player.draw(ox, oy, 0);
        }

        requestAnimationFrame(update);
    }

    update();
});

function distance(a, b) {
    return Math.sqrt(
        Math.pow(a.x-b.x, 2) +
        Math.pow(a.y-b.y, 2) +
        Math.pow(a.z-b.z, 2)
    )
}

class Player {
    constructor() {
        this.div = document.querySelector('.player');
        this.shadow = document.querySelector('.shadow');
        this.position = { x: 0.00, y: 0.00, z: 0.00 };
        this.extraX = 0
        this.velocity = { x: 0.00, y: 0.00, z: 0.00 };
        this.keys = {
            w: false,
            a: false,
            s: false,
            d: false,
            space: false
        };
        this.speed = 2;
        this.gravity = 0.3;
        this.jumpHeight = 13;
        document.addEventListener('keydown', (e) => {
            if (e.key === 'w') this.keys.w = true;
            if (e.key === 'a') this.keys.a = true;
            if (e.key === 's') this.keys.s = true;
            if (e.key === 'd') this.keys.d = true;
            if (e.key === ' ') this.keys.space = true;
        });
        document.addEventListener('keyup', (e) => {
            if (e.key === 'w') this.keys.w = false;
            if (e.key === 'a') this.keys.a = false;
            if (e.key === 's') this.keys.s = false;
            if (e.key === 'd') this.keys.d = false;
            if (e.key === ' ') this.keys.space = false;
        });
    }

    updatePos() {
        if (this.keys.w) this.velocity.z -= this.speed;
        if (this.keys.s) this.velocity.z += this.speed;

        if (this.keys.a) this.velocity.x -= this.speed;
        if (this.keys.d) this.velocity.x += this.speed;

        if (this.keys.space && this.position.y <= 0) this.velocity.y += this.jumpHeight;

        let g = this.gravity
        if (this.velocity.y < 0) g = this.gravity * 1.5 

        this.velocity.x *= 0.7;
        this.velocity.y -= g;
        this.velocity.z *= 0.7;

        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
        this.position.z += this.velocity.z;
        
        this.position.x = Math.max(-400, Math.min(400, this.position.x))
        this.position.z = Math.max(-500, Math.min(20, this.position.z))

        const rotateDistance = this.velocity.x
        if (Math.abs(this.position.x) > 150) {
            this.position.x -= rotateDistance
            this.extraX += rotateDistance
        }

        if (this.position.y < 0) {
            this.position.y = 0;
            this.velocity.y = 0;
        }

        fpsDisplay.textContent = `${fpsDisplay.textContent} ----------
        vel: ${this.velocity.x.toFixed(1)} ${this.velocity.y.toFixed(1)} ${this.velocity.z.toFixed(1)}
        pos: ${this.position.x.toFixed(1)} ${this.position.y.toFixed(1)} ${this.position.z.toFixed(1)}`;
    }

    draw(ox, oy, orot) {
        const circleY = Math.sqrt(Math.pow(500, 2) - Math.pow(this.position.x, 2));

        this.div.style.transform = `
            translate3d(${this.position.x+ox}px, ${-this.position.y+circleY+oy}px, ${this.position.z - 500}px) 
            rotate(${-Math.sin(this.position.x / 500) * 90}deg)
        `;

        const angle = Math.atan2(this.position.x, circleY) * -60;

        this.shadow.style.transform = `
            translate3d(${this.position.x+ox}px, ${circleY+oy}px, ${this.position.z - 500}px) 
            rotateX(90deg) rotateY(${angle}deg) 
            scale(${1+(500-this.position.y)/600})
            scaleX(${0.7-(Math.abs(this.position.x)/1000)})
        `;

    }
}

class Squares {
    constructor(length, sides, speed) {
        this.speed = speed;
        this.sides = sides;
        this.length = length;
        this.radius = 300;

        const game = document.querySelector('.game');
        for (let i = 0; i < this.sides * this.length; i++) {
            const square = document.createElement('div');
            square.classList.add('square');
            square.id = `l${Math.floor(i / sides)}`;
            game.appendChild(square);
        }
        this.list = Array.from(document.querySelectorAll('.square'));
        this.startTime = Date.now();
        this.collisions = [];
    }

    draw(ox, oy, orot, player) {
        const currentTime = Date.now();

        const transforms = [];
        const colors = [];

        const circleY = Math.sqrt(Math.pow(500, 2) - Math.pow(player.position.x, 2));
        const playerPos = {
            x: player.position.x,
            y: -player.position.y + circleY,
            z: player.position.z - 500 + (player.position.z^2)*5,
        };
        this.collisions = [];

        const test = document.querySelector('.test');
        test.style.transform = `
            translate3d(${playerPos.x}px, ${playerPos.y}px, ${playerPos.z}px) 
        `
        test.style.backgroundColor = `rgb(${Math.random() * 255},${Math.random() * 255},${Math.random() * 255})`;
        
        this.list.forEach((s, index) => {
            let l = Math.floor(index / this.sides);
            const i = index % this.sides;
            const angle = (360 / this.sides * i + orot) % 360;
            const dist = l * 100 + this.speed * (currentTime - this.startTime) + 1000;
            const x = this.radius * Math.cos(angle * Math.PI / 180);
            const y = this.radius * Math.sin(angle * Math.PI / 180);
            const z = this.length * -78 + (dist % (this.length * 100));
            
            if (z > -500 && y > 0) {
                const squarePos = { x: x, y: y, z: z };
                
                const distanceToPlayer = distance(playerPos, squarePos);
                // s.textContent = `${distanceToPlayer.toFixed(0)}`;
                if (distanceToPlayer < 500) {
                    this.collisions.push({
                        dist: distanceToPlayer,
                        index: index,
                    })
                }
            }

            transforms.push(`
                translate3d(${(ox + x) * 0.477}px, ${(oy + y) * 0.477}px, ${z}px) 
                rotateX(90deg) rotateY(${angle + 90}deg) 
                scale(${-0.477}) scaleY(-1)
            `);
            const c = ((dist % (this.length * 100)) / 10);
            colors.push(c);
        });
    
        this.list.forEach((s, i) => {

            s.style.borderColor = `rgb(${colors[i]},${colors[i]},${colors[i]})`;
            s.style.transform = transforms[i];
            s.style.backgroundColor = `rgb(${colors[i] / 10},${colors[i] / 15},${colors[i] / 4})`;
            this.collisions.forEach((c) => {
                if (c.index == i) {
                    s.style.borderColor = 'red';
                }
            });

        });
    }
}