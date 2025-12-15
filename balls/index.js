class Circle {
    constructor(loc, radius, colour) {
        this.loc = loc;
        this.radius = radius;
        this.colour = {
            bg: colour,
            border: "#666"
        }
        this.rot = 0;
        this.name = ""

        this.z = 0

        this.collision = false;
        this.mass = -1;

        this.div = document.createElement("div")
        this.div.className = "circle";
        screen.appendChild(this.div);
    }

    collidingWith(circle) {
        const dist = Math.sqrt(
            Math.pow(this.loc.x - circle.loc.x, 2) +
            Math.pow(this.loc.y - circle.loc.y, 2)
        );
        return (dist < (this.radius + circle.radius));
    }

    updateDiv(camx=0, camy=0) {
        this.div.style.top = `${50 + this.loc.y - camy}vw`
        this.div.style.left = `${50 + this.loc.x - camx}vw`
        this.div.style.width = `${this.radius}vw`;
        this.div.style.height = `${this.radius}vw`;
        this.div.style.transform = `translate(-${this.radius/2}vw, -${this.radius/2}vw) rotate(${this.rot}rad)`
        this.div.style.backgroundColor = this.colour.bg;
        this.div.style.borderColor = this.colour.border;
        this.div.style.zIndex = this.z;
        this.div.textContent = this.name;
    }
}

class Ball extends Circle{
    constructor(id) {
        const col = `#${Math.floor(Math.random()*9)}${Math.floor(Math.random()*9)}${Math.floor(Math.random()*9)}`
        super({x:0, y:0}, 10, col);

        this.id = id;
        this.vel = 0;
        this.mass = 10;
        this.dir = {x:0,y:0};
        this.rot = 0;
        this.name = "name";

        this.charge = 0;

        this.collision = true;

        this.restitution = 0.5;
        this.drag = 0.2;
        this.chargeSpeed = 0.4;
        this.power = 0.4;

        this.colour.border = "#999";
        this.z = 1;
    }

    wsUpdateValues(data) {
        if (data.id == myId) return;
        this.vel = data.vel;
        this.loc = data.loc;
        this.mass = data.mass;
        this.dir = data.dir;
        this.rot = data.rot;
        this.name = data.name;
        this.charge = data.charge;
        this.colour = data.colour;
        this.collision = data.collision;
    }

    wsSendValues() {
        if (!ws || ws.readyState !== WebSocket.OPEN) return;
        ws.send(JSON.stringify({
            id: this.id,
            vel: this.vel,
            loc: this.loc,
            mass: this.mass,
            dir: this.dir,
            rot: this.rot,
            name: this.name,
            charge: this.charge,
            colour: this.colour,
            collision: this.collision,
        }));
    }

    tick(deltaTime) {
        if (!this.isOnMap()) {
            // return;
        }

        if (this.id === myId) this.inputs(deltaTime)

        for (let i=0; i<simulationSteps; i++) {this.simulate(deltaTime/simulationSteps);}
    }

    inputs(deltaTime) {
        if (mouseStart !== undefined) {
            const distance = Math.sqrt(Math.pow(mouseStart.x - mousePos.x, 2) + Math.pow(mouseStart.y - mousePos.y, 2));
            if (distance === 0) return;
            this.mousedx = (mouseStart.x - mousePos.x) / distance;
            this.mousedy = (mouseStart.y - mousePos.y) / distance;
        }

        if (mouseDown) {
            this.charge += this.chargeSpeed * deltaTime
            if (this.charge > 100) this.charge = 100;
            this.rot = Math.atan2(this.mousedy, this.mousedx)
        } else if (this.charge > 0) {
            const newVel = {
                x: (this.vel * this.dir.x) + (this.charge * this.mousedx / 100 * this.power),
                y: (this.vel * this.dir.y) + (this.charge * this.mousedy / 100 * this.power),
            }; newVel.length = Math.sqrt(Math.pow(newVel.x, 2) + Math.pow(newVel.y, 2));
            
            this.vel = newVel.length
            this.dir = {
                x: newVel.x / newVel.length,
                y: newVel.y / newVel.length,
            }

            this.charge = 0;
        }
    }

    simulate(deltaTime) {
        // this.vel *= 0.9 * deltaTime;
        this.vel -= this.drag/100 * deltaTime;
        if (this.vel < 0) this.vel = 0;

        this.loc.x += this.vel * this.dir.x * deltaTime;
        this.loc.y += this.vel * this.dir.y * deltaTime;

        for (const b of Object.values(balls)) {
            if (b.id === this.id) continue;
            if (!b.collision) continue;

            const distance = Math.sqrt(Math.pow(this.loc.x - b.loc.x, 2) + Math.pow(this.loc.y - b.loc.y, 2));
            const penetration = this.radius + b.radius - distance;
            if (penetration < 0) continue;

            if (distance === 0) continue; // avoid 0 division  
            const collisionNormal = {
                x: (this.loc.x - b.loc.x) / distance,
                y: (this.loc.y - b.loc.y) / distance,
            };

            const relativeVel = {
                x: (b.vel * b.dir.x) - (this.vel * this.dir.x),
                y: (b.vel * b.dir.y) - (this.vel * this.dir.y),
            };

            const relativeVelAlongNormal = (
                relativeVel.x * collisionNormal.x +
                relativeVel.y * collisionNormal.y
            );

            const impulse = -(1 + this.restitution) * relativeVelAlongNormal / (1/this.mass + 1/b.mass);
        
            // this //
            const thisNewVel = {
                x: (this.vel * this.dir.x) + (impulse / this.mass) * collisionNormal.x,
                y: (this.vel * this.dir.y) + (impulse / this.mass) * collisionNormal.y,
            }; thisNewVel.length = Math.sqrt(Math.pow(thisNewVel.x, 2) + Math.pow(thisNewVel.y, 2));
            
            this.vel = thisNewVel.length;
            this.dir = {
                x: thisNewVel.x / thisNewVel.length,
                y: thisNewVel.y / thisNewVel.length,
            };
            
            // b //
            const bNewVel = {
                x: (b.vel * b.dir.x) + (impulse / b.mass) * collisionNormal.x,
                y: (b.vel * b.dir.y) + (impulse / b.mass) * collisionNormal.y,
            }; bNewVel.length = Math.sqrt(Math.pow(bNewVel.x, 2) + Math.pow(bNewVel.y, 2));
            
            b.vel = bNewVel.length;
            b.dir = {
                x: bNewVel.x / bNewVel.length,
                y: bNewVel.y / bNewVel.length,
            };
        }
    }

    isOnMap() {
        let onMap = false;
        for (const l of level) {
            const distance = Math.sqrt(Math.pow(l.loc.x - this.loc.x, 2) + Math.pow(l.loc.y - this.loc.y, 2));
            if (distance + this.radius > l.radius) continue
            onMap = true;
            break;
        }
        return onMap;
    }

}



const protocol = location.protocol === 'https:'? "wss:" : "ws:"
const ws = new WebSocket(`${protocol}//casey-currently-acquire-follow.trycloudflare.com/`);
ws.onmessage = async (e) => {
    console.log("recieved")
    const text = (typeof e.data === 'string') ? e.data : await e.data.text();
    const data = JSON.parse(text);

    if (!balls[data.id]) balls[data.id] = new Ball(data.id);

    balls[data.id].wsUpdateValues(data);
};



let mouseDown = false;
let mouseStart = undefined
let mousePos = {x:0,y:0}
document.addEventListener("pointerdown", (e) => {
    mouseDown = true;
    mouseStart = {
        x: e.clientX,
        y: e.clientY
    }
    mousePos.x = e.clientX;
    mousePos.y = e.clientY;
});
document.addEventListener("pointermove", (e) => {
    if (!mouseDown) return;
    mousePos.x = e.clientX;
    mousePos.y = e.clientY;
});
document.addEventListener("pointerup", () =>     {mouseDown=false;mouseStart=undefined});
document.addEventListener("pointercancel", () => {mouseDown=false;mouseStart=undefined});


const screen = document.getElementById("screen");
const myId = Math.random().toString(16).slice(2);


const balls = {};
balls[myId] = new Ball(myId)
balls[myId].loc.x = 50 - Math.random()*100
balls[myId].loc.y = 50 - Math.random()*100

const level = [
    new Circle({x:0,y:0}, 160, "#222"),
]


class Joystick {
    constructor() {
        this.dots = document.getElementsByClassName("joyDots");
        this.base = document.getElementById("joyBase");
    }

    updateDiv() {
        if (!mouseDown) {
            for (const j of [...this.dots, this.base]) {
                j.style.visibility = "hidden";
            }
        } else {
            this.base.style.visibility = "visible";
            this.base.style.top = `${mouseStart.y}px`;
            this.base.style.left = `${mouseStart.x}px`;
            
            console.debug(balls[myId].charge/100)
            const dx = (mousePos.x - mouseStart.x) / this.dots.length * (balls[myId].charge/100)
            const dy = (mousePos.y - mouseStart.y) / this.dots.length * (balls[myId].charge/100)

            for (let i=0; i<this.dots.length; i++) {
                this.dots[i].style.visibility = "visible";
                this.dots[i].style.left = `${mouseStart.x + dx*(i+1)}px`;
                this.dots[i].style.top  = `${mouseStart.y + dy*(i+1)}px`;
            }
        }
    }
}
const stick = new Joystick()


const simulationSteps = 1

let lastTime = performance.now()
function loop(time) {
    const deltaTime = (time - lastTime)/6
    lastTime = time

    stick.updateDiv();

    for (const b of Object.values(balls)) {
        b.tick(deltaTime)
    }
    balls[myId].wsSendValues()

    const camx = balls[myId].loc.x +  balls[myId].dir.x * 0.5
    const camy = balls[myId].loc.y +  balls[myId].dir.y * 0.5

    for (const b of Object.values(balls)) {b.updateDiv(camx, camy)}
    for (const c of level) {c.updateDiv(camx, camy)}
    
    requestAnimationFrame(loop);
}
requestAnimationFrame(loop);
