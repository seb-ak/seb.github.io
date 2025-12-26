import { WebSocketServer } from "ws";

class Rect {
    constructor(x, y, width, height) {
        this.x = x
        this.y = y
        this.width = width
        this.height = height
    }

    mapCollison(map) {
        const width = this.width/2 + 1
        const height = this.height/2 + 1
        const left = Math.floor((this.x - width) / 5)
        const right = Math.floor((this.x + width) / 5)
        const top = Math.floor((this.y - height) / 5)
        const bottom = Math.floor((this.y + height) / 5)
        for (let i=top; i<=bottom; i++) {
            for (let j=left; j<=right; j++) {
                if (map[i][j] == "#") return true
            }
        }
        return false
    }

    distanceTo(other) {
        const dx = this.x - other.x
        const dy = this.y - other.y
        return Math.sqrt(dx*dx + dy*dy)
    }
}

class Tank extends Rect {
    constructor(data) {
        super(20, 20, 5, 5);
        this.type = "Tank";

        this.id = data.id;
        this.name = data.name;
        this.colour = data.colour;
        this.inputs = {left:0, right:0, forward:0, backward:0, primary:0, secondary:0};
        this.lastUpdate = Date.now();

        this.speed = 0.2;
        this.rotationSpeed = 5;

        this.rotation = 0;

        this.primaryCooldown = Date.now();
        this.secondaryCooldown = 0;
    }

    step(map, objects) {

        if (this.inputs.primary > Date.now() && this.primaryCooldown < Date.now()) {
            this.primaryCooldown = Date.now() + 2000
            this.newBullet(objects);
        }

        if (this.inputs.left > Date.now()) {this.rotation -= this.rotationSpeed;}
        if (this.inputs.right > Date.now()) {this.rotation += this.rotationSpeed;}

        let distance = 0;
        if (this.inputs.forward > Date.now()) {distance = this.speed}
        if (this.inputs.backward > Date.now()) {distance = -this.speed}
        const dx = distance * Math.cos(this.rotation * Math.PI/180);
        const dy = distance * Math.sin(this.rotation * Math.PI/180);

        this.x += dx
        if (this.mapCollison(map)) {this.x -= dx}

        this.y += dy
        if (this.mapCollison(map)) {this.y -= dy}

        return {
            id: this.id,
            name: this.name,
            colour: this.colour,
            type: this.type,
            x: this.x,
            y: this.y,
            rotation: this.rotation
        }
    }

    newBullet(objects) {
        let newId = Math.random().toString(16).slice(2);

        for (const o in Object.values(objects)) {
            if (o.type === "Projectile" && o.dead === true) {
                newId = o.id;
                break;
            }
        }

        const projectile = new Projectile(newId)

        projectile.x = this.x + 6 * Math.cos(this.rotation * Math.PI/180)
        projectile.y = this.y + 6 * Math.sin(this.rotation * Math.PI/180)
        projectile.rotation = this.rotation
        projectile.colour = this.colour
        projectile.tankId = this.id

        objects[newId] = projectile
    }
}

class Projectile extends Rect {
    constructor(id) {
        super(0, 0, 2, 2)
        this.type = "Projectile";
        this.id = id;

        this.speed = 1.2;

        this.maxBounces = 3;
        this.bounces = 0;
        this.dead = false;
    }

    step(map, objects) {

        if (this.dead) {
            return {id: this.id, dead: true}
        }

        const dx = this.speed * Math.cos(this.rotation * Math.PI/180);
        const dy = this.speed * Math.sin(this.rotation * Math.PI/180);


        let collided = false;

        this.x += dx;
        if (this.mapCollison(map)) {
            this.x -= dx;
            collided = true;
            this.rotation = Math.atan2(dy, -dx) * 180/Math.PI;
        }

        this.y += dy;
        if (this.mapCollison(map)) {
            this.y -= dy;
            collided = true;
            this.rotation = Math.atan2(-dy, dx) * 180/Math.PI;
        }

        if (collided) {
            this.bounces++

            if (this.bounces >= this.maxBounces) {
                this.dead = true;
                return {id: this.id, dead: true}
            }
        }

        return {
            id: this.id,
            type: this.type,
            colour: this.colour,
            x: this.x,
            y: this.y,
            rotation: this.rotation
        }
    }
}

class Main {
    constructor(wss) {
        this.wss = wss;

        this.wss.on("connection", (ws) => {
            ws.on("message", (text) => {
                const data = JSON.parse(text);
                this.receive(data);
            });
        });

        this.map = [
"####################",
"#                  #",
"#                  #",
"#     ###########  #",
"#               #  #",
"#               #  #",
"#  #            #  #",
"#  #            #  #",
"#  #    ####    #  #",
"#  #    ####    #  #",
"#  #    ####    #  #",
"#  #    ####    #  #",
"#  #            #  #",
"#  #            #  #",
"#  #               #",
"#  #               #",
"#  ###########     #",
"#                  #",
"#                  #",
"####################",
        ]
        this.objects = {}

        this.outData = {}

        this.interval = 50;
        this.next = Date.now() + this.interval;
    }

    wsSend(data) {
        for (const client of this.wss.clients) {
            if (client.readyState !== client.OPEN) continue;
            client.send(JSON.stringify(data));
        }
    }


    loop() {
        
        this.outData = {}

        if (this.objects) {
            for (const o of Object.values(this.objects)) {
                if (this.lastUpdate + 5000 < Date.now()) continue;
                const data = o.step(this.map, this.objects);
                this.outData[o.id] = data
            }
        }
        this.outData["Main"] = {
            map: this.map
        }

        this.wsSend(this.outData);

        this.next += this.interval;
        setTimeout(() => this.loop(), Math.max(0, this.next - Date.now()));
    }

    receive(data) {
        if (!this.objects[data.id]) {
            this.objects[data.id] = new Tank(data)
        }
        this.objects[data.id].inputs = data;
        this.objects[data.id].lastUpdate = Date.now();
    }
}
    
const wss = new WebSocketServer({ port: 8080 });
const main = new Main(wss);
main.loop();
console.log("Server started");
