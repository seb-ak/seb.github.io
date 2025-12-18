import { WebSocketServer } from "ws";

class Tank {
    constructor() {
        this.speed = 0.2
        this.x = 50
        this.y = 50
        this.rotation = 0
    }
    step() {
        const dx = this.speed * Maths.cos(this.rotation
    }

}


const objects = {}

const interval = 50;
let next = Date.now() + interval;

function loop() {
    
    this.outData = {}

    for (const o of Object.values(objects)) {
        const data = o.step()
        this.outData[o.id] = data
    }

    next += interval;
    setTimeout(loop, Math.max(0, next - Date.now()));
}

loop();




class Main {
    constructor() {
        this.wss = new WebSocketServer({ port: 8080 });

        wss.on("connection", (ws) => {
            ws.on("message", (text) => {
                const data = JSON.parse(text);
                this.receive(data);
        
            });
        });
    }

    send(data) {
        for (const client of wss.clients) {
            if (client.readyState !== client.OPEN) continue;
            client.send(data.toString());
        }
    }

    receive(data) {
        if (!objects[data.id]) {
            objects[data.id] = new Tank()
        }
        objects[data.id].inputs = data
    }
}
    
    
