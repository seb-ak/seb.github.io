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
        this.inputs = {left:0, right:0, forward:0, backward:0, primary:0, secondary:0, a:0, b:0, c:0};
        this.lastUpdate = Date.now();

        this.rotation = 0;
        this.primaryCooldown = Date.now();
        this.secondaryCooldown = Date.now();

        this.visible = true;
        
        this.upgrades = {
            "Fire Rate":0,
            "Bullet Speed":0,
            "Bullet Damage":0,
            "Bullet Bounces":0,
            "Health":0,
            "Speed":0,
            "Mine Radius":0,
            "Mine Damage":0,
            "Mine Rate":0,
        }
        this.gotUpgrade = false;

        this.stats = {
            health: 3,
            lives: 1,
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
        this.respawnTimer = -1;

        this.wins = 0

        this.respawn(true);
    }

    damage(damage) {
        this.health -= damage;
        if (this.health <= 0) { this.respawn(); }
    }

    respawn(starting = false) {
        if (this.lives <= 0 && !starting) return

        const locs = [10, 30, 70, 90]
        this.x = locs[Math.floor(Math.random()*locs.length)];
        this.y = locs[Math.floor(Math.random()*locs.length)];

        if (starting) {
            this.health = this.stats.health;
            this.lives = this.stats.lives;
            this.visible = true;
            this.respawnTimer = -1;
            this.primaryCooldown = Date.now();
            this.secondaryCooldown = Date.now();
            return;
        }

        this.lives--;
        this.health = this.stats.health;
        this.visible = false;
        this.respawnTimer = Date.now() + 1000;

        if (this.lives <= 0) {
            this.health = 0;
            this.respawnTimer = -1;
        }
    }

    step(map, objects) {

        if (!this.visible) {
            if (
                this.respawnTimer !== -1 && 
                this.respawnTimer < Date.now() &&
                !(this.lastUpdate + afkTimeout < Date.now()) &&
                this.lives > 0
            ) {
                this.respawnTimer = -1;
                this.visible = true;
            } else {
                this.inputs = {left:0, right:0, forward:0, backward:0, primary:0, secondary:0, a:0, b:0, c:0};
            }
        }

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
            lives: this.lives,
            visible: this.visible,
            wins: this.wins,
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

        this.damage = 1;
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
            if (o.type !== "Tank" || o.id == this.tankId || !o.visible) continue;

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
            if (o.type !== "Tank" || o.id == this.tankId || !o.visible) continue;

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

        this.lobbyMap = [
"####################",
"                    ",
" ###  #   #  # # ## ",
"  #  # # # # ##  #  ",
"  #   ## # # # #  # ",
"                    ",
"####################",
"#                  #",
"#                  #",
"#                  #",
"#                  #",
"#                  #",
"#                  #",
"#                  #",
"#    ##########    #",
"#    ##########    #",
"#                  #",
"#                  #",
"#                  #",
"####################",
        ]
        this.shopMap = [
"####################",
"#                  #",
"#   #   # # ### ## #",
"#   # # # # # # #  #",
"#   ##### # # #  # #",
"#                  #",
"####################",
"                    ",
"                    ",
"                    ",
"                    ",
"                    ",
"                    ",
"####################",
"#                  #",
"# ### # # ### ###  #",
"# ##  ### # # # #  #",
"#   # # # # # ###  #",
"# ### # # ### #    #",
"#                  #",
        ]
        this.mapList = [
[
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
],
        ]

        this.map = [];

        this.objects = {};

        this.outData = {};

        this.activePlayers = [];
        this.alivePlayers = [];

        this.gameState = "lobby";
        this.hostId = undefined;

        this.interval = 50;
        this.next = Date.now() + this.interval;

        this.winner = undefined;

        this.shop = []
        this.upgrades = [
            {name:"+1 Fire Rate",onBuy:     (tank)=>{tank.upgrades["Fire Rate"]++;      tank.stats.primaryCooldown -= 200}},
            {name:"+1 Bullet Speed",onBuy:  (tank)=>{tank.upgrades["Bullet Speed"]++;   tank.stats.bulletSpeed += 0.2}},
            {name:"+1 Bullet Damage",onBuy: (tank)=>{tank.upgrades["Bullet Damage"]++;  tank.stats.bulletDamage += 1}},
            {name:"+1 Bullet Bounces",onBuy:(tank)=>{tank.upgrades["Bullet Bounces"]++; tank.stats.bulletBounces += 1}},
            {name:"+1 Health",onBuy:        (tank)=>{tank.upgrades["Health"]++;         tank.stats.health += 1}},
            {name:"+1 Speed",onBuy:         (tank)=>{tank.upgrades["Speed"]++;          tank.stats.speed += 0.05}},
            {name:"+1 Mine Radius",onBuy:   (tank)=>{tank.upgrades["Mine Radius"]++;    tank.stats.mineRadius += 1}},
            {name:"+1 Mine Damage",onBuy:   (tank)=>{tank.upgrades["Mine Damage"]++;    tank.stats.mineDamage += 1}},
            {name:"+1 Mine Rate",onBuy:     (tank)=>{tank.upgrades["Mine Rate"]++;      tank.stats.secondaryCooldown -= 500}},
        ]
        
        this.nextRound = 0;

        this.loop();
    }

    wsSend(data) {
        for (const client of this.wss.clients) {
            if (client.readyState !== client.OPEN) continue;
            client.send(JSON.stringify(data));
        }
    }

    startRound() {
        for (const o of Object.values(this.objects)) {
            if (o.type === "Projectile" || o.type === "Mine") { o.dead = true; }
            else if (o.type === "Tank") { o.respawn(true); }
        }
        this.map = this.mapList[Math.floor(Math.random()*this.mapList.length)]
    }

    newShop() {
        function shuffleArray(array) {
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
            }
            return array
        }

        const shuffled = shuffleArray(this.upgrades)
        this.shop = shuffled.slice(0,3)

        for (const o of Object.values(this.objects)) {
            if (o.type === "Tank") { o.gotUpgrade = false; }
        }

        this.nextRound = Date.now() + 1000 * 20
    }

    loop() {
        console.log(this.gameState,"-",this.activePlayers.length,"players")

        if (this.gameState === "shop" && Date.now() > this.nextRound) {
            this.gameState = "game";
            this.startRound();
        }

        const host = this.objects[this.hostId]
        if (host && host.inputs && host.inputs.b > Date.now() && this.gameState === "lobby" && this.activePlayers.length >= 2) {
            this.gameState = "game";
            this.startRound();
        }

        if (this.gameState === "game" && this.alivePlayers.length <= 1) {
            this.winner = this.alivePlayers[0] || undefined;
            this.objects[this.winner].wins++;
            this.startRound();
            this.newShop();
            this.gameState = "shop";
        }

        if (host && host.lastUpdate && host.lastUpdate + afkTimeout < Date.now()) {
            this.hostId = undefined;
        }

        this.outData = {}

        this.activePlayers = [];
        this.alivePlayers = [];
        let i = 0
        let numPlayersGotUpgrade = 0;

        if (this.objects) {
            for (const o of Object.values(this.objects)) {
                if (o.lastUpdate && o.lastUpdate + afkTimeout < Date.now()) {
                    o.damage(999999);
                    this.outData[o.id] = {id: o.id, type:"Tank", visible:false};
                    continue;
                }

                if (o.type === "Tank") {
                    this.activePlayers.push(o.id);
                    if (o.lives > 0) { this.alivePlayers.push(o.id); }
                }

                if (this.hostId===undefined) {this.hostId = o.id}

                if (this.gameState === "game") { //--// GAME //--//
                    const data = o.step(this.map, this.objects);
                    this.outData[o.id] = data
                } else if (this.gameState === "lobby") { //--// LOBBY //--//
                    if (o.type !== "Tank") continue
                    i++
                    this.outData[o.id] = {
                        id: o.id,
                        name: o.name,
                        colour: o.colour,
                        type: o.type,
                        x: 10*i,
                        y: 50,
                        rotation: o.rotation,
                        health: o.health,
                        lives: o.lives,
                        visible: o.visible,
                    }
                } else if (this.gameState === "shop") { //--// SHOP //--//
                    if (o.type === "Projectile" || o.type === "Mine") {
                        const data = o.step(this.map, this.objects);
                        this.outData[o.id] = data;
                    }
                    if (o.type !== "Tank") continue

                    if (o.gotUpgrade) { numPlayersGotUpgrade++ }

                    if (o.inputs.a > Date.now() && !o.gotUpgrade) {
                        this.shop[0].onBuy(o);
                        o.gotUpgrade = true;
                    }
                    if (o.inputs.b > Date.now() && !o.gotUpgrade) {
                        this.shop[1].onBuy(o);
                        o.gotUpgrade = true;
                    }
                    if (o.inputs.c > Date.now() && !o.gotUpgrade) {
                        this.shop[2].onBuy(o);
                        o.gotUpgrade = true;
                    }

                    if (o.id !== this.winner) { i++; }
                    this.outData[o.id] = {
                        id: o.id,
                        name: o.name,
                        colour: o.colour,
                        type: o.type,
                        x: (o.id == this.winner)? 10 : 10*i,
                        y: (o.id == this.winner)? 20 : 50,
                        rotation: o.rotation,
                        health: o.health,
                        lives: o.lives,
                        visible: o.visible,
                        wins: o.wins,
                        upgrades: o.upgrades,
                        gotUpgrade: o.gotUpgrade,
                    }
                    
                }
            }
        }

        if (
            numPlayersGotUpgrade == this.activePlayers.length &&
            (this.nextRound - Date.now()) > 1000 *5
        ) {
            this.nextRound = Date.now() + 1000 * 5
        }

        let textString = ""
        if (this.gameState==="shop") {
            textString = `next round in ${Math.ceil((this.nextRound - Date.now()) / 1000)}s`
        }

        const chooseMap = {"game":this.map, "lobby":this.lobbyMap, "shop":this.shopMap}
        this.outData["Main"] = {
            map: chooseMap[this.gameState],
            hostId: this.hostId,
            gameState: this.gameState,
            abc: this.gameState==="shop"? [this.shop[0].name,this.shop[1].name,this.shop[2].name] : ["","",""],
            topText: textString
        }

        this.wsSend(this.outData);

        if (Object.keys(this.objects).length > 0 && this.activePlayers.length === 0) {
            //--// RESTART SERVER //--//
            console.log("Server restarted");
            MAIN = new Main(wss)
        } else {
            // LOOP //
            this.next += this.interval;
            setTimeout(() => this.loop(), Math.max(0, this.next - Date.now()));
        }
    }

    receive(data) {
        if (!this.objects[data.id]) {
            const tank = new Tank(data)
            if (this.gameState === "game") {
                tank.lives = 0;
                tank.health = 0;
                tank.visible = false;
                tank.respawnTimer = -1;
            }
            this.objects[data.id] = tank
        }
        this.objects[data.id].inputs = data;
        this.objects[data.id].lastUpdate = Date.now();
    }
}

const afkTimeout = 10 * 1000
const wss = new WebSocketServer({ port: 8080 });
let MAIN = new Main(wss);
console.log("Server started");
