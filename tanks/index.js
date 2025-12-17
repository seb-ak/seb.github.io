class Projectile {
    constructor() {
        this.type = "Projectile"

    }
}

class Tank {
    constructor() {
        this.type = "Tank"
        this.id
        this.x
        this.y
        this.rotation

        this.newData = {}

        this.div.tank = document.createElement("div")
        this.div.tank.className = this.type;
        screen.appendChild(this.div.tank);

        this.div.turret = document.createElement("div")
        this.div.turret.className = this.type;
        this.div.tank.appendChild(this.div.turret);
    }

    updateDiv() {
        this.div.style.top = `${this.loc.y}vw`
        this.div.style.left = `${this.loc.x}vw`
        this.div.style.transform = `translate(-${this.radius/2}vw, -${this.radius/2}vw) rotate(${this.rot}rad)`
    }
}


class Main {
    constructor(url) {

        this.inputs = {left:false, right:false, forward:false, back:false, primary:false, secondary:false}

        this.objects = {}


        const protocol = location.protocol === 'https:'? "wss://" : "ws://"
        this.ws = new WebSocket(`${protocol}${url.replace("https://","")}`);
        this.ws.onmessage = async (e) => {
            const text = (typeof e.data === 'string') ? e.data : await e.data.text();
            const data = JSON.parse(text);
            this.decodeData(data);
        };
    }
    
    wsSendInputs() {
        if (!this.ws || this.ws.readyState !== WebSocket.OPEN) return;

        this.ws.send(JSON.stringify(data));
    }

    decodeData(data) {
        for (const [id, values] of Object.entries(data)) {
            if (id=="Main") 

            if (!this.objects[id]) {
                if (values["type"]=="Tank") { this.objects[id] = new Tank() }
                else if (values["type"]=="Projectile") { this.objects[id] = new Projectile() }
            }
            this.objects[id].newData = values
        }
    }
}




const screen = document.getElementById("screen");
const myId = Math.random().toString(16).slice(2);




let lastTime = performance.now()
function loop(time) {
    const deltaTime = (time - lastTime)/6
    lastTime = time


    requestAnimationFrame(loop);
}
requestAnimationFrame(loop);
