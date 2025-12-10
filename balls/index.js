class Circle {
    constructor(loc, radius, colour) {
        this.loc = loc;
        this.radius = radius;
        this.colour = colour;

        this.div = document.createElement("div")
        this.div.className = "circle";
        this.div.style.width = `${radius}vw`
        this.div.style.height = `${radius}vw`
        screen.appendChild(this.div);
    }
}

class Ball extends Circle{
    constructor(id) {
        super({x:0, y:0}, 10, "#505")

        this.id = id;
        this.vel = {x:0, y:0};
        this.dir = 0
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
