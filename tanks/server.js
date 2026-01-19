import { WebSocketServer, WebSocket } from "ws";

function shuffleArray(array) {
    array = array.slice()
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array
}

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
                if (
                    i<0 || i>=map.length ||
                    j<0 || j>=map[i].length
                ) continue;
                if (map[i][j] == "#") return true;
            }
        }
        return false;
    }

    aboveMapTile(map) {
        let i = Math.floor(this.y/5)
        let j = Math.floor(this.x/5)
        if (
            i<0 || i>=map.length ||
            j<0 || j>=map[i].length
        ) return " ";
        return map[i][j];
    }

    distanceTo(other) {
        const dx = this.x - other.x;
        const dy = this.y - other.y;
        return Math.sqrt(dx*dx + dy*dy);
    }
}

class Tank extends Rect {
    constructor(data, stats, main) {
        super(20, 20, 3, 3);
        this.type = "Tank";

        this.id = data.id;
        this.name = data.name;
        this.colour = data.colour;
        this.inputs = { 
            forward:false, backward:false, rotation:0,
            primary:false, secondary:false, a:false, b:false, c:false,
        };
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
        this.radius = 5/2;
        
        this.stats = Object.assign({}, stats);// make it not shared object

        this.health = this.stats.health;
        this.lives = this.stats.lives;
        this.respawnTimer = -1;

        this.wins = 0

        this.respawn(main, true);

        this.main = main
    }

    damage(damage) {
        this.health -= damage;
        if (this.health <= 0) { this.respawn(this.main); }
    }

    respawn(main, starting = false) {
        if (this.lives <= 0 && !starting) return

        let foundLoc = false;
        const locs = shuffleArray(main.spawnLocs);
        for (const loc of locs) {
            for (const t of Object.values(main.objects)) {
                if (t.type !== "Tank" || !t.visible) continue;
                
                let i = Math.floor(t.y/5);
                let j = Math.floor(t.x/5);
                if (
                    i<0 || i>=main.map.length ||
                    j<0 || j>=main.map[i].length
                ) continue;

                if (i == loc.x && j == loc.y) continue;
                this.x = loc.x*5;
                this.y = loc.y*5;
                foundLoc = true;
                break;
            }
        }
        if (!foundLoc) {
            console.log(locs)
            this.x = locs[0].x*5;
            this.y = locs[0].y*5;
        }
        

        
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

    step(map, objects, mult) {

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
                this.inputs = { 
                    forward:false, backward:false, rotation:0,
                    primary:false, secondary:false, a:false, b:false, c:false,
                };
            }
        }

        if (this.inputs.primary && this.primaryCooldown < Date.now()) {
            this.primaryCooldown = Date.now() + this.stats.primaryCooldown;
            this.newBullet(objects);
        }

        if (this.inputs.secondary && this.secondaryCooldown < Date.now()) {
            this.secondaryCooldown = Date.now() + this.stats.secondaryCooldown;
            this.newMine(objects);
        }

        this.rotation = this.inputs.rotation;

        let distance = 0;
        if (this.inputs.forward) { distance = this.stats.speed; }
        if (this.inputs.backward) { distance = -this.stats.speed; }
        const dx = distance * Math.cos(this.rotation * Math.PI/180) * mult;
        const dy = distance * Math.sin(this.rotation * Math.PI/180) * mult;

        this.x += dx
        if (this.mapCollison(map)) {this.x -= dx}

        this.y += dy
        if (this.mapCollison(map)) {this.y -= dy}

        const currentTile = this.aboveMapTile(map);
        if (currentTile === "o") {
            this.damage(9999999);
        }

        return {
            id: this.id,
            name: this.name,
            colour: this.colour,
            type: this.type,
            x: this.x,
            y: this.y,
            rotation: this.rotation,
            health: this.health,
            maxHealth: this.stats.health,
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
        mine.radius = this.stats.mineRadius;
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

    step(map, objects, mult) {

        if (this.dead) {
            return {id: this.id, dead: true}
        }

        const dx = this.speed * Math.cos(this.rotation * Math.PI/180) * mult;
        const dy = this.speed * Math.sin(this.rotation * Math.PI/180) * mult;


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
            if (dist < (o.radius + this.radius)) {
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

        this.damage = 5;
        this.radius = 5;
        this.dead = false;
    }

    step(map, objects, mult) {
        if (this.dead) {
            return {id:this.id, dead:this.dead}
        }

        for (const o of Object.values(objects)) {
            if (o.type !== "Tank" || o.id == this.tankId || !o.visible) continue;

            const dist = this.distanceTo(o);
            if (dist < (o.radius + this.radius)) {
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
        this.interval = 125;

        this.wss = wss;

        this.wss.on("connection", (ws) => {
            ws.on("message", (message) => {
                // console.log("\nnewMessage")
                try {
                    const text = (typeof message === 'string') ? message : message.toString();
                    // console.log(text);
                    const data = JSON.parse(text);
                    // console.log(data);
                    this.receive(data);
                } catch (err) {
                    console.log("Invalid message from client:", err);
                    try { ws.close(1003); } catch(e){}
                }
            });

            ws.on("close", () => {
                // connection closed — no special cleanup required here
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
"#        o         #",
"#               o  #",
"#     #            #",
"#    #o#           #",
"#     #     o      #",
"#                  #",
"#    ##########    #",
"#    ##########    #",
"#                  #",
"#                  #",
"#                  #",
"####################",
        ]
        this.shopMap = [
"                    ",
"                    ",
"                    ",
"                    ",
"                    ",
"                    ",
"                    ",
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
        this.leaderboardMap = [" "]
        this.mapList = [
[
"####################",
"#                  #",
"# s              s #",
"#     ########     #",
"#                  #",
"#        s         #",
"#  #            #  #",
"#  #            #  #",
"#  #    ####    #  #",
"#  # s  ####    #  #",
"#  #    #### s  #  #",
"#  #    ####    #  #",
"#  #            #  #",
"#  #      s     #  #",
"#                  #",
"#                  #",
"#     ########     #",
"# s              s #",
"#                  #",
"####################",
],
[
"####################",
"#      o           #",
"#      o        s  #",
"#      ######   ooo#",
"#  s               #",
"#                  #",
"#   ######         #",
"#        o       s #",
"#        o         #",
"#ooo#  #oo#####    #",
"#      #           #",
"# s    #     s     #",
"#           #oooooo#",
"#           #      #",
"#     #  s  #      #",
"#     #            #",
"#ooooo#            #",
"#           o   s  #",
"# s         o      #",
"####################",
],
[
"####################",
"#                  #",
"#    s       #     #",
"#   #####oooo#  s  #",
"#            #     #",
"#         s  #     #",
"#    #       #     #",
"#    #             #",
"# s  #     #########",
"#    #             #",
"#            #     #",
"#            #     #",
"#    o       #     #",
"#####o       #     #",
"#            #     #",
"# s             s  #",
"#   #####ooooo     #",
"#                  #",
"#        s         #",
"####################",
],
        ]
        this.spawnLocs = [{x:0,y:0}];

        this.map = [];

        this.objects = {};

        this.outData = {};

        this.firstToWins = 999999999;
        this.gameEnded = false;

        this.activePlayers = [];
        this.alivePlayers = [];

        this.gameState = "lobby";
        this.hostId = undefined;

        this.next = Date.now() + this.interval;

        this.winner = undefined;

        this.lastLog = "";
        this.lastSetSettings = 0;

        this.upgradeIncrease = {
            tank: {
                health: 1,
                speed: 0.05,
            },
            bullet: {
                fire_rate: 200,
                speed: 0.2,
                damage: 1,
                bounces: 1,
            },
            mine: {
                radius: 1,
                damage: 1,
                place_rate: 500,
            },
        }

        this.shop = []
        this.upgrades = [
            {name:"+1 Fire Rate",onBuy:     (tank)=>{tank.upgrades["Fire Rate"]++;      tank.stats.primaryCooldown -= this.upgradeIncrease.bullet.fire_rate}},
            {name:"+1 Bullet Speed",onBuy:  (tank)=>{tank.upgrades["Bullet Speed"]++;   tank.stats.bulletSpeed += this.upgradeIncrease.bullet.speed}},
            {name:"+1 Bullet Damage",onBuy: (tank)=>{tank.upgrades["Bullet Damage"]++;  tank.stats.bulletDamage += this.upgradeIncrease.bullet.damage}},
            {name:"+1 Bullet Bounces",onBuy:(tank)=>{tank.upgrades["Bullet Bounces"]++; tank.stats.bulletBounces += this.upgradeIncrease.bullet.bounces}},
            {name:"+1 Health",onBuy:        (tank)=>{tank.upgrades["Health"]++;         tank.stats.health += this.upgradeIncrease.tank.health}},
            {name:"+1 Speed",onBuy:         (tank)=>{tank.upgrades["Speed"]++;          tank.stats.speed += this.upgradeIncrease.tank.speed}},
            {name:"+1 Mine Radius",onBuy:   (tank)=>{tank.upgrades["Mine Radius"]++;    tank.stats.mineRadius += this.upgradeIncrease.mine.radius}},
            {name:"+1 Mine Damage",onBuy:   (tank)=>{tank.upgrades["Mine Damage"]++;    tank.stats.mineDamage += this.upgradeIncrease.mine.damage}},
            {name:"+1 Mine Rate",onBuy:     (tank)=>{tank.upgrades["Mine Rate"]++;      tank.stats.secondaryCooldown -= this.upgradeIncrease.mine.place_rate}},
        ]
        
        this.nextRound = 0;

        this.settings = undefined;

        this.baseTankStats = {
            health: 3,
            lives: 1,
            speed: 0.2,

            primaryCooldown: 2000,
            secondaryCooldown: 10000,

            bulletDamage: 1,
            bulletSpeed: 1.2,
            bulletBounces: 3,

            mineDamage: 5,
            mineRadius: 5,
        }

        this.loop();
    }

    wsSend(data) {
        for (const client of this.wss.clients) {
            if (client.readyState !== WebSocket.OPEN) continue;

            if (client.bufferedAmount > 1_000_000) {
                client.close(1013, "Backpressure");
                continue;
            }
            client.send(JSON.stringify(data));
            
        }
    }

    startRound() {
        this.map = this.mapList[Math.floor(Math.random()*this.mapList.length)]
        this.spawnLocs = []
        for (let y=0; y<this.map.length; y++) {
            for (let x=0; x<this.map[y].length; x++) {
                if (this.map[y][x] !== "s") continue;
                this.spawnLocs.push({x:x,y:y});
            }
        }
        for (const o of Object.values(this.objects)) {
            if (o.type === "Projectile" || o.type === "Mine") { o.dead = true; }
            else if (o.type === "Tank") { o.respawn(this, true); }
        }
    }

    newShop() {

        const shuffled = shuffleArray(this.upgrades.slice())
        this.shop = shuffled.slice(0,3)

        for (const o of Object.values(this.objects)) {
            if (o.type === "Tank") { o.gotUpgrade = false; }
        }

        this.nextRound = Date.now() + 1000 * 20
    }

    leaderboard() {
        this.nextRound = Date.now() + 1000 * 5
        this.lboardText = ""
        const scores = []
        for (const o of Object.values(this.objects)) {
            if (o.type !== "Tank") continue;
            scores.push({name:o.name, wins:o.wins});
        }

        scores.sort((a,b) => (b.wins || 0) - (a.wins || 0));

        if (scores.length > 0 && scores[0].wins >= this.firstToWins) {
            this.gameEnded = true;
            this.lboardText += `game over\n${scores[0].name} has won\n\n`
        }
        this.lboardText += "leaderboard\n"
        for (const {name, wins} of scores) {
            this.lboardText += `\n${name}: ${wins}`
        }
    }

    loop() {
        let log = `${this.gameState} - ${this.activePlayers.length} players - host ${this.hostId}`
        // for (const o of Object.values(this.objects)) {
        //     if (o.type==="Tank") log += `\n${JSON.stringify(o.inputs)}`
        // }
        if (log != this.lastLog) { console.log(log); this.lastLog = log; }

        if (this.gameState === "shop" && Date.now() > this.nextRound) {
            this.gameState = "game";
            this.startRound();
        }
        if (this.gameState === "leaderboard" && Date.now() > this.nextRound && !this.gameEnded) {
            this.gameState = "shop";
            this.startRound();
            this.newShop();
        }

        const host = this.objects[this.hostId]
        if (host && host.inputs && host.inputs.b && this.gameState === "lobby" && this.activePlayers.length >= 2) {
            this.gameState = "game";
            this.startRound();
        }

        if (host && host.inputs && host.inputs.a && this.gameState === "lobby") {
            this.sendSettings()
        }

        if (this.gameState === "game" && this.alivePlayers.length <= 1) {
            this.winner = this.alivePlayers[0] || undefined;
            if (this.winner) this.objects[this.winner].wins++;
            this.startRound();
            this.gameState = "leaderboard";
            this.leaderboard();
        }

        if (host && host.lastUpdate && host.lastUpdate + afkTimeout < Date.now()) {
            this.hostId = undefined;
        }

        this.outData = {}

        this.activePlayers = [];
        this.alivePlayers = [];
        let i = 0
        let numPlayersGotUpgrade = 0;

        const mult = this.interval/50

        if (this.objects) {
            for (const o of Object.values(this.objects)) {
                if (o.lastUpdate && o.lastUpdate + afkTimeout < Date.now()) {
                    o.damage(999999);
                    this.outData[o.id] = {id: o.id, type:"Tank", visible:false, afk:true};
                    continue;
                }

                if (o.type === "Tank") {
                    this.activePlayers.push(o.id);
                    if (o.name == "testplayer") this.activePlayers.push("testplayer");
                    if (o.lives > 0) { 
                        this.alivePlayers.push(o.id);
                        if (o.name == "testplayer") this.alivePlayers.push("testplayer");
                    }
                }

                if (this.hostId===undefined) {this.hostId = o.id}

                if (this.gameState === "game") { //--// GAME //--//
                    const data = o.step(this.map, this.objects, mult);
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
                        const data = o.step(this.map, this.objects, mult);
                        this.outData[o.id] = data;
                    }
                    if (o.type !== "Tank") continue

                    if (o.gotUpgrade) { numPlayersGotUpgrade++ }

                    if (o.inputs.a && !o.gotUpgrade) {
                        this.shop[0].onBuy(o);
                        o.gotUpgrade = true;
                    }
                    if (o.inputs.b && !o.gotUpgrade) {
                        this.shop[1].onBuy(o);
                        o.gotUpgrade = true;
                    }
                    if (o.inputs.c && !o.gotUpgrade) {
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
                    
                } else if (this.gameState === "leaderboard") {
                    if (o.type === "Projectile" || o.type === "Mine") {
                        const data = o.step(this.map, this.objects, mult);
                        this.outData[o.id] = data;
                    } else if (o.type !== "Tank")  {
                        this.outData[o.id] = {
                            id: o.id,
                            name: o.name,
                            colour: o.colour,
                            type: o.type,
                            x: (o.id == this.winner)? 80 : 10*i,
                            y: (o.id == this.winner)? 20 : 90,
                            rotation: o.rotation,
                            health: 0,
                            lives: 0,
                            visible: false,
                            wins: o.wins,
                        }
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
        let abc = ["","",""];
        const time = Math.ceil((this.nextRound - Date.now()) / 1000)
        if ((this.lastSetSettings + 2000) > Date.now()) {
            textString = "settings updated"
        }
        if (this.gameState==="leaderboard" && !this.gameEnded) {
            textString = `shop in ${time}s\n` + this.lboardText;
        }
        if (this.gameState==="shop") {
            textString = `next round in ${time}s`
            abc = [this.shop[0].name,this.shop[1].name,this.shop[2].name];
        }

        const chooseMap = {"game":this.map, "lobby":this.lobbyMap, "shop":this.shopMap, "leaderboard":this.leaderboardMap}
        this.outData["Main"] = {
            map: chooseMap[this.gameState],
            hostId: this.hostId,
            gameState: this.gameState,
            abc: abc,
            topText: textString,
            settings: this.settings,
        }
        this.settings = undefined;

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
            const tank = new Tank(data, this.baseTankStats, this)
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

        if (data.id === this.hostId && this.gameState === "lobby" && data.settings) {
            this.setSettings(data.settings);
        }

    }

    sendSettings() {
        this.settings = {
            "game":{
                "firstToWins": this.firstToWins,
            },
            "tank_stats": this.baseTankStats,
            "upgrade_increase_amount": this.upgradeIncrease,
            "maps": this.mapList,
        }
    }

    setSettings(settings) {
        this.firstToWins = settings.game.firstToWins
        this.baseTankStats = settings.tank_stats
        this.upgradeIncrease = settings.upgrade_increase_amount
        this.mapList = settings.maps
        this.lastSetSettings = Date.now()
        
        for (const o of Object.values(this.objects)) {
            if (o.type !== "Tank") continue
            o.stats = Object.assign({}, this.baseTankStats);// make it not shared object
            o.health = o.stats.health;
            o.lives = o.stats.lives;
        }
    }


}

console.log("Server started");
const afkTimeout = 10 * 1000
const wss = new WebSocketServer({ port: 8080, perMessageDeflate: false });
let MAIN = new Main(wss);
