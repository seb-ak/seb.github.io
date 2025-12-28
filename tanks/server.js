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

        this.rotation = 0;
        this.primaryCooldown = Date.now();
        this.secondaryCooldown = Date.now();
        
        this.stats = {
            health: 1,
            lives: 999999,
            speed: 0.2,
            rotationSpeed: 5,

            primaryCooldown: 2000,
            secondaryCooldown: 10000,

            bulletDamage: 1,
            bulletSpeed: 1.2,
            bulletBounces: 3,

            mineDamage: 5,
            mineRadius: 5,
        }

        this.health = this.stats.health;
        this.lives = this.stats.lives;

        this.respawn(true);
    }

    damage(damage) {
        this.health -= damage;
        if (this.health <= 0) { this.respawn(); }
    }
 
    respawn(starting = false) {
        if (this.lives <= 0) return

        const locs = [10, 30, 70, 90]
        this.x = locs[Math.floor(Math.random()*locs.length)];
        this.y = locs[Math.floor(Math.random()*locs.length)];

        if (starting) return;

        this.health = this.stats.health;
        this.lives--;
    }

    step(map, objects) {

        if (this.inputs.primary > Date.now() && this.primaryCooldown < Date.now()) {
            this.primaryCooldown = Date.now() + this.stats.primaryCooldown
            this.newBullet(objects);
        }

        if (this.inputs.secondary > Date.now() && this.secondaryCooldown < Date.now()) {
            this.secondaryCooldown = Date.now() + this.stats.secondaryCooldown
            this.newMine(objects);
        }

        if (this.inputs.left > Date.now()) {this.rotation -= this.stats.rotationSpeed;}
        if (this.inputs.right > Date.now()) {this.rotation += this.stats.rotationSpeed;}

        let distance = 0;
        if (this.inputs.forward > Date.now()) {distance = this.stats.speed}
        if (this.inputs.backward > Date.now()) {distance = -this.stats.speed}
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
            rotation: this.rotation,
            health: this.health,
        }
    }

    newBullet(objects) {
        let newId = Math.random().toString(16).slice(2);

        for (const o of Object.values(objects)) {
            if (o.type === "Projectile" && o.dead === true) {
                newId = o.id;
                break;
            }
        }

        const projectile = new Projectile(newId);

        projectile.x = this.x + 3 * Math.cos(this.rotation * Math.PI/180);
        projectile.y = this.y + 3 * Math.sin(this.rotation * Math.PI/180);
        projectile.rotation = this.rotation;

        projectile.colour = this.colour;
        projectile.tankId = this.id;

        projectile.speed = this.stats.bulletSpeed;
        projectile.maxBounces = this.stats.bulletBounces;
        projectile.damage = this.stats.bulletDamage;

        objects[newId] = projectile;
    }

    newMine(objects) {
        let newId = Math.random().toString(16).slice(2);

        for (const o of Object.values(objects)) {
            if (o.type === "Mine" && o.dead === true) {
                newId = o.id;
                break;
            }
        }

        const mine = new Mine(newId);

        mine.x = this.x;
        mine.y = this.y;
        mine.damage = this.stats.mineDamage;
        mine.colour = this.colour;
        mine.tankId = this.id;

        objects[newId] = mine;
    }
}

class Projectile extends Rect {
    constructor(id) {
        super(0, 0, 1, 1)
        this.type = "Projectile";
        this.id = id;

        this.maxBounces = 3;
        this.bounces = 0;
        this.dead = false;
        this.radius = 1;
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

        for (const o of Object.values(objects)) {
            if (o.type !== "Tank" || o.id == this.tankId) continue;

            const dist = this.distanceTo(o);
            if (dist < (o.width / 2) + this.radius) {
                o.damage(this.damage);
                this.dead = true;
            }
        }


        if (this.dead) { return {id: this.id, dead: true} }
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

class Mine extends Rect {
    constructor(id) {
        super(0,0,5,5)
        this.type = "Mine";
        this.id = id

        this.radius = 5;
        this.dead = false;
    }

    step(map, objects) {
        if (this.dead) {
            return {id:this.id, dead:this.dead}
        }

        for (const o of Object.values(objects)) {
            if (o.type !== "Tank" || o.id == this.tankId) continue;

            const dist = this.distanceTo(o);
            if (dist < (o.width / 2) + this.radius) {
                o.damage(this.damage);
                this.dead = true;
            }
        }

        return {
            id: this.id,
            colour: this.colour,
            type: this.type,
            radius: this.radius,
            x: this.x,
            y: this.y,
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
