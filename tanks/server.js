import { WebSocketServer } from "ws";


class Projectile {
    constructor() {
        this.type = "Projectile"
        
        this.x
        this.y
        this.radius
    }
}

class Tank {
    constructor() {
        this.type = "Tank"
        this.id
        this.x
        this.y
        this.rotation
    }
}




class Main {
    constructor() {
        this.wss = new WebSocketServer({ port: 8080 });

        wss.on("connection", (ws) => {
            ws.on("message", (data) => {this.receive(data)});
        });
    }

    send(data) {
        for (const client of wss.clients) {
            if (client.readyState !== client.OPEN) continue;
            client.send(JSON.stringify(data));
        }
    }

    receive(data) {
        
    }
}
    
    
