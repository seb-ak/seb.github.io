class Obj {
    constructor(type) {
        this.type = type

        this.div = document.createElement("div")
        this.div.className = this.type;
        screen.appendChild(this.div);
    }

    updateDiv() {
        this.div.style.top = `${this.loc.y}vw`
        this.div.style.left = `${this.loc.x}vw`
        this.div.style.transform = `translate(-${this.radius/2}vw, -${this.radius/2}vw) rotate(${this.rot}rad)`
    }
}

class Ball extends Circle{
    constructor(id) {
        super();

    }

    wsUpdateValues(data) {
        this.data = data.data
    }

    wsSendValues() {
        if (!ws || ws.readyState !== WebSocket.OPEN) return;
        ws.send(JSON.stringify(this.data));
    }


}



const protocol = location.protocol === 'https:'? "wss:" : "ws:"
let url = `${protocol}//casey-currently-acquire-follow.trycloudflare.com/`

const ws = new WebSocket(url);
ws.onmessage = async (e) => {
    const text = (typeof e.data === 'string') ? e.data : await e.data.text();
    const data = JSON.parse(text);

    .wsUpdateValues(data);
};



const screen = document.getElementById("screen");
const myId = Math.random().toString(16).slice(2);




let lastTime = performance.now()
function loop(time) {
    const deltaTime = (time - lastTime)/6
    lastTime = time


    requestAnimationFrame(loop);
}
requestAnimationFrame(loop);
