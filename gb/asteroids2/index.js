import { gb } from "../consoleV1.js";

function norm(n) {
    const mag = Math.sqrt(Math.pow(n.x, 2) + Math.pow(n.y, 2));
    return {x: n.x / mag, y: n.y / mag};
} 
function lerp(a, b, t) {
    return a + (b - a) * t;
}
function distance(x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
}
function posMod(n, m) {
    return ((n % m) + m) % m;
}

// UI
const uiText = {
    line1: "ASTEROIDS2",
    line2: "BY SEB A-K",
    line3: "PRESS START",
    time: -1,
};

// SHIP
const ship = {
    x: 0,
    y: 0,
    xvel: 0,
    yvel: 0,
    rotation: 0,
    boostCooldown: 30,
    boostTime: Infinity,
    bulletCooldown: 50,
    bulletTime: Infinity,
    speed: 0,
    radius: 10,
    thrust: 0.5, //0.2
    friction: 1, //0.98,
    rotateSpeed: 5,
    fuel: 100,
    fuelConsumptionPerBoost: 0
};
ship.xdir = Math.cos(ship.rotation * Math.PI / 180);
ship.ydir = Math.sin(ship.rotation * Math.PI / 180);

const score = {
    dir: "gb/asteroids2/highscore",
    current: 0,
    high: 0,
    last: 0,
}
const highscore = localStorage.getItem(score.dir);
if (highscore === null) localStorage.setItem(score.dir, 0);
else score.high = parseInt(highscore, 10);


// ASTEROIDS
const asteroids = [];
const despawnRadius = 600;
let asteroidCount = 10;
function newAsteroid() {
    const radius = 5 + Math.random() * 20;
    const angle = Math.random() * Math.PI * 2; // random angle in radians
    const distanceFromCenter = 200/gb.camera.zoom + radius + Math.random()*100;


    const x = gb.camera.x + Math.cos(angle) * distanceFromCenter;
    const y = gb.camera.y + Math.sin(angle) * distanceFromCenter;

    const totalPoints = 30
    let points = []
    for (let i=0; i<totalPoints; i++) {
        const pointAngle = 360/totalPoints * i + (Math.random()-0.5)*100/totalPoints
        const rad = pointAngle * Math.PI / 180;
        let dist = radius

        if (Math.random()<0.5) dist -= (Math.random()/2 + 1) * radius/10

        points.push({
            x: Math.cos(rad) * dist,
            y: Math.sin(rad) * dist,
        })
    }

    return {
        radius: radius,
        x: x,
        y: y,
        xvel: Math.random() * 2 - 1,
        yvel: Math.random() * 2 - 1,
        points: points,
        damage: 0,
    };
}
function damageAsteroid(asteroid, damage=1) {
    
    asteroid.damage += damage

    const len = asteroid.points.length;

    const dents = 5
    let indexes = []
    for (let i = 0; i < dents; i++) {
        indexes.push( Math.floor(Math.random() * len) )
    }

    for (let i = 0; i < dents; i++) {
        const edge = asteroid.points[indexes[i]];
        const mid = {
            x: edge.x / 2,
            y: edge.y / 2
        };
        asteroid.points.splice(indexes[i], 0, mid);
    }

    gb.playSound("hit")

    if (asteroid.damage >= 2) {
        particles.push(newParticle(asteroid.x, asteroid.y, "asteroid", 0, asteroid.radius));
        particles.push(newParticle(asteroid.x, asteroid.y, "asteroid", 1, asteroid.radius));
        particles.push(newParticle(asteroid.x, asteroid.y, "asteroid", 2, asteroid.radius));
        const index = asteroids.indexOf(asteroid);
        asteroids[index] = newAsteroid();
    }
}


// BOSS
const angle = Math.random() * 360;
const rad = angle * Math.PI / 180;
const dist = 450;
const boss = {
    x: Math.cos(rad) * dist,
    y: Math.sin(rad) * dist,
    phase: 0,
    cooldown: 0,
    radius: 50,
    width: 200,
    height: 350,
    shield: {
        active: true,
        radius: 270,
        health: 10,
        sides: 30,
        rotation: 0,
    },
}


const stars = []
function newStar() {
    const x = Math.random() * 2 * gb.screen.width;
    const y = Math.random() * 2 * gb.screen.height;

    return {x:x, y:y};
}

const bullets = []
function newBullet() {

    const speed = 10
    const dx = Math.cos(ship.rotation * Math.PI / 180);
    const dy = Math.sin(ship.rotation * Math.PI / 180);

    return {
        x: ship.x + dx * ship.radius,
        y: ship.y + dy * ship.radius,
        xdir: dx,
        ydir: dy,
        xvel: dx*speed + ship.xdir * ship.speed,
        yvel: dy*speed + ship.ydir * ship.speed,
        speed: speed,
        time: 0,
        radius: 2,
        enemy: false
    }
}
function bossBullet(x, y, rot, speed=10) {
    const dx = Math.cos(rot * Math.PI / 180);
    const dy = Math.sin(rot * Math.PI / 180);

    return {
        x: x + dx * 5,
        y: y + dy * 5,
        xdir: dx,
        ydir: dy,
        xvel: dx*speed,
        yvel: dy*speed,
        speed: speed,
        time: 0,
        radius: 2,
        enemy: true
    }
}
function removeBullet(bullet) {
    for (let i = 0; i < 8; i++) particles.push(newParticle(bullet.x, bullet.y, "bullet", i));
    bullets.splice(bullets.indexOf(bullet), 1)
}

const particles = []
function newParticle(x, y, type, n=0, radius=5) {
    radius /= 3
    radius *= 0.5+Math.random()

    const rot = (Math.random()-0.5)*200 + 120*n
    const dx = Math.cos(rot * Math.PI / 180);
    const dy = Math.sin(rot * Math.PI / 180);
    
    const totalPoints = 6
    let points = []
    let time = 300

    switch (type) {
        case "asteroid":
            for (let i=0; i<totalPoints; i++) {
                const pointAngle = 360/totalPoints * i + (Math.random()-0.5)*100/totalPoints;
                const rad = pointAngle * Math.PI / 180;
                let dist = radius;

                dist -= Math.random() * radius/2;

                points.push({
                    x: Math.cos(rad) * dist,
                    y: Math.sin(rad) * dist,
                })
            }
            time = 300
            break;

        case "bullet":
            points.push(
                {
                    x: 0,
                    y: 0,
                },
                {
                    x: 0.3,
                    y: 0.3,
                }
            )
            time = 60
            break;
        default:
            
        break;
    }
    return {
        x:x + dx*radius,
        y:y + dy*radius,
        xdir: dx * (Math.random()+0.5)*2,
        ydir: dy * (Math.random()+0.5)*2,
        points: points,
        time: time,
    }

}

for (let i = 0; i < 50; i++) stars.push(newStar());

function start() {setInterval(update, 20);}
window.addEventListener("DOMContentLoaded", start);

function update() {
    move();

    gb.clearScreen();
    draw();
    gb.drawWorld();
    gb.drawUI();
}


function move() {
    const distToBoss = distance(ship.x,ship.y, boss.x,boss.y)
    const bossFightActive = distToBoss < 600

    if (distToBoss < 1000) {
        asteroidCount = 0
    } else if (score.current>3000) {
        asteroidCount = 60
    } else if (score.current>2000) {
        asteroidCount = 50
    } else if (score.current>1000) {
        asteroidCount = 40
    } else {
        asteroidCount = 30
    }


    if (asteroids.length > asteroidCount) {
        asteroids.length = asteroidCount; // remove extras
    }
    if (asteroids.length < asteroidCount) {
        for (let i = asteroids.length; i < asteroidCount; i++) {
            asteroids.push(newAsteroid());
        }
    }

    // SCORE
    score.current += ship.speed

    // INPUTS
    const Bbutton = gb.button.b;
    const Abutton = gb.button.a;
    const START = gb.button.start;

    if (!Number.isNaN(gb.joystick.rotation)) ship.rotation = gb.joystick.rotation;

    // SHOOT
    ship.bulletTime++
    if (Abutton && ship.bulletTime > ship.bulletCooldown && uiText.time!==-1) {
        ship.bulletTime=0
        bullets.push(newBullet())
        gb.playSound("laserShoot3",0.9,1.1)
    }


    // BOOST
    ship.boostTime++

    let boostType = undefined
    if (uiText.time===-1 && START) boostType = "start";
    if (uiText.time!==-1 && Bbutton) boostType = "normal";

    if (ship.boostTime > ship.boostCooldown && boostType!=undefined && ship.fuel > 0) {
        ship.boostTime = 0
        ship.fuel -= ship.fuelConsumptionPerBoost

        gb.camera.shake = 10

        if (ship.speed==0) ship.speed = 1;
        ship.speed += ship.thrust;

        const rad = ship.rotation * Math.PI / 180;

        ship.xvel += Math.cos(rad);
        ship.yvel += Math.sin(rad);
        
        ship.speed = Math.sqrt(Math.pow(ship.xvel, 2) + Math.pow(ship.yvel, 2));

        const sounds = ["boost2","boost3","boost4","boost5"]
        gb.playSound(sounds[Math.floor(Math.random()*3)], 0.8, 1.2);

        if (boostType==="start") {
            uiText.time=0
            gb.playSound("powerUp");
        }
    }

    // MOVE SHIP
    ship.speed *= ship.friction;
    ship.x += ship.xvel;
    ship.y += ship.yvel;

    // MOVE BULLETS
    for (const b of bullets) {

        if (b.time >= 300) {
            bullets.splice(bullets.indexOf(b), 1);
        }

        for (const a of asteroids) {
            const dist = distance(b.x,b.y, a.x,a.y)
            if (dist <= a.radius + b.radius) {
                damageAsteroid(a)
                removeBullet(b)
            }

        }

        b.time++;

        b.x += b.xvel;
        b.y += b.yvel;
    }

    // MOVE PARTICLES
    for (const p of particles) {
        p.time--

        if (p.time < 0) {
            particles.splice(particles.indexOf(p), 1);
        }

        p.x += p.xdir
        p.y += p.ydir
    }


    // BOSS



    // CAMERA
    let x = ship.x
    let y = ship.y
    if (distToBoss < 700) {
        x = (ship.x + boss.x) / 2
        y = (ship.y + boss.y) / 2
    }   
    gb.camera.targetx = x + ship.xvel * 20 * (ship.boostTime<60? 1.1 : 1) + (Math.random()-0.5)*(gb.camera.shake>0)*30;
    gb.camera.targety = y + ship.yvel * 20 * (ship.boostTime<60? 1.1 : 1) + (Math.random()-0.5)*(gb.camera.shake>0)*30;

    let mainZoom;
    if (distToBoss <= 700) {
        mainZoom = 0.5;
    } else if (distToBoss >= 900) {
        mainZoom = 1;
    } else {
        let t = (distToBoss - 700) / 100;
        mainZoom = 0.5 + t * 0.5;
    }
    const minorZoom = - Math.min(0.01 * ship.speed, 0.7) - (ship.boostTime<60? 0.005 : 0)
    gb.camera.zoom = mainZoom + minorZoom

    gb.camera.x += (gb.camera.targetx - gb.camera.x) * 0.1;
    gb.camera.y += (gb.camera.targety - gb.camera.y) * 0.1;

    if (gb.camera.shake>0) gb.camera.shake--
    if (uiText.time>0) uiText.time--
    
    // ASTEROIDS
    for (const a of asteroids) {
        a.x += a.xvel;
        a.y += a.yvel;

        const distanceToShip = distance(ship.x, ship.y, a.x, a.y);

        // 
        if (uiText.time===-1 && distanceToShip < a.radius + ship.radius + 80) {
            damageAsteroid(a, 99)
        }

        if (distToBoss < 1000) {
            damageAsteroid(a, 99)
        }

        // Collision
        if (distanceToShip < a.radius + ship.radius) {
            damageAsteroid(a, 99)

            ship.speed = 0;
            ship.xvel = 0;
            ship.yvel = 0;

            gb.camera.shake = 40
            // if (navigator.vibrate) navigator.vibrate(40*20);

            score.last = Math.floor(score.current)

            uiText.time = -1
            uiText.line1 = `HIT ASTEROID`
            uiText.line2 = `SCORE ${score.last}`
            uiText.line3 = `PRESS START`

            if (score.current > score.high) {
                score.high = Math.floor(score.current)
                uiText.line2 = `NEW HIGHSCORE ${score.last}`
                gb.playSound("pickupCoin")

                localStorage.setItem(score.dir, score.high);

            }

            gb.playSound("hit")
            gb.playSound("explosion")
        }

        // Despawn
        if (distanceToShip > despawnRadius) {
            const index = asteroids.indexOf(a);
            asteroids[index] = newAsteroid();
        }
    }




}

function draw() {

    // STARS
    for (const s of stars) {
        gb.screen.ui.push([
            {
                x: posMod(s.x - ship.x/10, gb.screen.width * 2),
                y: posMod(s.y - ship.y/10, gb.screen.height * 2)
            },
            {
                x: posMod(s.x - ship.x/10, gb.screen.width * 2)+1,
                y: posMod(s.y - ship.y/10, gb.screen.height * 2)+1
            }
        ]);
    }

    // SHIP
    const xdir = Math.cos(ship.rotation * Math.PI / 180);
    const ydir = Math.sin(ship.rotation * Math.PI / 180);
    gb.screen.world.push(gb.Triangle(ship.x, ship.y, ship.radius, ship.rotation));
    if (ship.boostTime < ship.boostCooldown) {
        gb.screen.world.push(gb.Triangle(
            ship.x - xdir * ship.radius * 1.3,
            ship.y - ydir * ship.radius * 1.3,
            ship.radius * 0.3 * (Math.random()+1),
            270-Math.atan2(xdir, ydir) * 180 / Math.PI
        ));
    }

    // BOSS
    gb.screen.world.push(gb.Path(boss.x, boss.y, [
        {x: -boss.width/2, y: -boss.height/2},
        {x: boss.width/2, y: -boss.height/2},
        {x: boss.width/2, y: boss.height/2},
        {x: -boss.width/2, y: boss.height/2},
    ]));
    if (boss.shield.active) {
        gb.screen.world.push(gb.Circle(boss.x, boss.y, boss.shield.radius, boss.shield.sides, boss.shield.rotation))
    }


    // BULLETS
    for (const b of bullets) {
        gb.screen.world.push(gb.Path(b.x, b.y, [{x:0, y:0},{x:b.xdir*5, y:b.ydir*5}]))
    }

    // PARTICLES
    for (const p of particles) {
        gb.screen.world.push(gb.Path(p.x, p.y, p.points));
    }

    // ASTEROIDS
    for (const a of asteroids) {
        gb.screen.world.push(gb.Path(a.x, a.y, a.points));
    }

    // FUEL BAR
    // gb.screen.ui.push([
    //     {x:0, y:gb.screen.height},{x:gb.screen.width*ship.fuel/100, y:gb.screen.height},
    //     {x:gb.screen.width*ship.fuel/100, y:gb.screen.height-5},{x:0, y:gb.screen.height-5},
    //     {x:0, y:gb.screen.height}
    // ])

    // SCORE TEXT
    gb.screen.ui.push(...gb.Text(`SC ${Math.floor(score.current)}`, 5, 15));
    gb.screen.ui.push(...gb.Text(`HI ${score.high}`, 5, 30));

    const text = `STICK-ROTATE B-BOOST A-SHOOT`
    gb.screen.ui.push(...gb.Text(text, gb.screen.width-5 - 3.5*1.5*text.length, 15, 3.5));

    if (uiText.time>0 || uiText.time===-1) {
        gb.screen.ui.push(...gb.Text(uiText.line1, gb.screen.width/2, gb.screen.height/2-10, 15, true));
        gb.screen.ui.push(...gb.Text(uiText.line2, gb.screen.width/2, gb.screen.height/2+35, 7, true));
        gb.screen.ui.push(...gb.Text(uiText.line3, gb.screen.width/2, gb.screen.height/2+65, 10, true));
    }

}