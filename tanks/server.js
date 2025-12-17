import { WebSocketServer } from "ws";







class Main {
    constructor() {
        this.wss = new WebSocketServer({ port: 8080 });

        wss.on("connection", (ws) => {
            ws.on("message", (data) => {
                this.receive(data)
        
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
        
    }
}
    
    
