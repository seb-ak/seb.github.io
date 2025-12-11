class Circle {
    constructor(loc, radius, colour) {
        this.loc = loc;
        this.radius = radius;
        this.colour = colour;

        this.div = document.createElement("div")
        this.div.className = "circle";
        this.div.style.width = `${radius}vw`;
        this.div.style.height = `${radius}vw`;
        this.div.style.background_color = this.colour;
        screen.appendChild(this.div);
    }

    distanceTo(circle) {
        return Math.sqrt(
            Math.pow(this.loc.x - circle.loc.x ,2) +
            Math.pow(this.loc.y - circle.loc.y ,2)
        );
    }

    collidingWith(circle) {
        const dist = this.distanceTo(circle);
        return (dist < (this.radius + circle.radius));
    }
}

class Ball extends Circle{
    constructor(id) {
        super({x:0, y:0}, 10, "#505");

        this.id = id;
        this.vel = {x:0, y:0};
        this.mass = 10;
        this.dir = undefined;
        this.rot = 0;

        this.charge = 0;
    }

    wsUpdateValues(data) {
        if (data.id == myId) return;
        this.loc = data.loc;
        this.vel = data.loc;
    }

    swSendValues() {
        ws.send(JSON.stringify({
            id: this.id,
            loc: this.loc,
            vel: this.vel,
        }));
    }

    launch(dx, dy, power) {
        const mag = Math.sqrt(
            Math.pow(dx ,2) +
            Math.pow(dy ,2)
        )
        this.vel.x += 
    }

    tick() {
        if (!this.isOnmap()) {

            return;
        }
        this.inputs()
        this.move();
    }

    inputs() {
        if (mouseDown) {
            this.charge += 1 * deltaTime
        } else if (this.charge > 0) {
            
            launch()
        }
    }

    move() {
        this.loc.x += this.vel.x * deltaTime;
        this.loc.y += this.vel.y * deltaTime;

        this.vel.x *= this.drag * deltaTime;
        this.vel.x *= this.drag * deltaTime;
    }

    isOnMap() {
        onMap = false;
        for (const c of level) {
            if (this.collidingWith(c)) continue;
            onMap = true;
            break;
        }
        return onMap;
    }




}



const ws = new WebSocket("ws://bosnia-fortune-mean-replies.trycloudflare.com:8080");
ws.onmessage = async (e) => {
    const text = await e.data.text();
    const data = JSON.parse(text);

    if (balls[data.id]) balls[data.id].wsUpdateValues(data);
    else balls[data.id] = new Ball(data.id).wsUpdateValues(data);
};



const screen = document.getElementById("screen");

const myId = Math.random().toString(16).slice(2);

const balls = {};
balls[myId] = new Ball(myId)
balls[myId].loc.x = Math.random()*100
balls[myId].loc.y = Math.random()*100

const level = [
    new Circle({x:0,y:0}, 120, "#444"),
]



function loop() {
    const camx = balls[myId].loc.x
    const camy = balls[myId].loc.y

    for (const c of level) {
        c.div.style.top = `${50 + c.loc.y - camy}vw`
        c.div.style.left = `${50 + c.loc.x - camx}vw`
    }

    for (const b of Object.values(balls)) {
        b.div.style.top = `${50 + b.loc.y - camy}vw`
        b.div.style.left = `${50 + b.loc.x - camx}vw`
    }

    requestAnimationFrame(loop);
}
loop();
