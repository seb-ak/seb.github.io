let ctx;
let canvas;
let canvasWidth = 320;
let canvasHeight = 240;

function playSound(name, pitchMin = 1, pitchMax = 1) {
    const audio = new Audio(`sounds/${name}.wav`);
    audio.currentTime = 0;
    audio.playbackRate = pitchMin + Math.random() * (pitchMax - pitchMin);
    audio.play();
}

const chars = {
    "0": [{x:0,y:0},{x:0,y:2},{x:1,y:2},{x:1,y:0},{x:0,y:0}],
    "1": [{x:.5,y:0},{x:.5,y:2}],
    "2": [{x:0,y:2},{x:1,y:2},{x:1,y:1},{x:0,y:1},{x:0,y:0},{x:1,y:0}],
    "3": [{x:0,y:0},{x:1,y:0},{x:1,y:1},{x:0,y:1},{x:1,y:1},{x:1,y:2},{x:0,y:2}],
    "4": [{x:1,y:0},{x:1,y:2},{x:1,y:1},{x:0,y:1},{x:0,y:2}],
    "5": [{x:0,y:0},{x:1,y:0},{x:1,y:1},{x:0,y:1},{x:0,y:2},{x:1,y:2}],
    "6": [{x:0,y:1},{x:0,y:0},{x:1,y:0},{x:1,y:1},{x:0,y:1},{x:0,y:2},{x:1,y:2}],
    "7": [{x:1,y:0},{x:1,y:2},{x:0,y:2}],
    "8": [{x:0,y:1},{x:0,y:0},{x:1,y:0},{x:1,y:1},{x:0,y:1},{x:0,y:2},{x:1,y:2},{x:1,y:1}],
    "9": [{x:0,y:0},{x:1,y:0},{x:1,y:1},{x:0,y:1},{x:0,y:2},{x:1,y:2},{x:1,y:1}],
    ".": [{x:.5,y:0},{x:.6,y:.1}],
    " ": [],
    "-": [{x:0,y:1},{x:1,y:1}],
    "A": [{x:0,y:0},{x:0.5,y:2},{x:1,y:0},{x:0.75,y:1},{x:0.25,y:1}],
    "B": [{x:0,y:0},{x:0,y:2},{x:0.7,y:2},{x:1,y:1.7},{x:0.7,y:1},{x:1,y:0.7},{x:0.7,y:0},{x:0,y:0}],
    "C": [{x:1,y:2},{x:0,y:2},{x:0,y:0},{x:1,y:0}],
    "D": [{x:0,y:0},{x:0,y:2},{x:0.7,y:2},{x:1,y:1.5},{x:1,y:0.5},{x:0.7,y:0},{x:0,y:0}],
    "E": [{x:1,y:2},{x:0,y:2},{x:0,y:0},{x:1,y:0},{x:0,y:0},{x:0,y:1},{x:0.7,y:1}],
    "F": [{x:0,y:0},{x:0,y:2},{x:1,y:2},{x:0,y:2},{x:0,y:1},{x:0.7,y:1}],
    "G": [{x:0.5,y:1},{x:1,y:1},{x:1,y:0},{x:0,y:0},{x:0,y:2},{x:1,y:2}],
    "H": [{x:0,y:0},{x:0,y:2},{x:0,y:1},{x:1,y:1},{x:1,y:2},{x:1,y:0}],
    "I": [{x:0,y:0},{x:1,y:0},{x:.5,y:0},{x:.5,y:2},{x:0,y:2},{x:1,y:2}],
    "J": [{x:1,y:2},{x:1,y:0},{x:0.5,y:0},{x:0,y:0.5}],
    "K": [{x:0,y:0},{x:0,y:2},{x:0,y:1},{x:1,y:2},{x:0,y:1},{x:1,y:0}],
    "L": [{x:0,y:2},{x:0,y:0},{x:1,y:0}],
    "M": [{x:0,y:0},{x:0,y:2},{x:0.5,y:1},{x:1,y:2},{x:1,y:0}],
    "N": [{x:0,y:0},{x:0,y:2},{x:1,y:0},{x:1,y:2}],
    "O": [{x:0.5,y:2},{x:0,y:1.5},{x:0,y:0.5},{x:0.5,y:0},{x:1,y:0.5},{x:1,y:1.5},{x:0.5,y:2}],
    "P": [{x:0,y:0},{x:0,y:2},{x:1,y:2},{x:1,y:1.5},{x:0,y:1.5}],
    "Q": [{x:0.5,y:2},{x:0,y:1.5},{x:0,y:0.5},{x:0.5,y:0},{x:0.8,y:0.2},{x:1,y:0},{x:0.8,y:0.2},{x:1,y:0.5},{x:1,y:1.5},{x:0.5,y:2}],
    "R": [{x:0,y:0},{x:0,y:2},{x:1,y:2},{x:1,y:1.5},{x:0,y:1.5},{x:1,y:0}],
    "S": [{x:1,y:2},{x:0,y:2},{x:0,y:1},{x:1,y:1},{x:1,y:0},{x:0,y:0}],
    "T": [{x:0,y:2},{x:1,y:2},{x:0.5,y:2},{x:0.5,y:0}],
    "U": [{x:0,y:2},{x:0,y:0.5},{x:0.5,y:0},{x:1,y:0.5},{x:1,y:2}],
    "V": [{x:0,y:2},{x:0.5,y:0},{x:1,y:2}],
    "W": [{x:0,y:2},{x:0.25,y:0},{x:0.5,y:1.5},{x:0.75,y:0},{x:1,y:2}],
    "X": [{x:0,y:2},{x:1,y:0},{x:0.5,y:1},{x:1,y:2},{x:0,y:0}],
    "Y": [{x:0,y:2},{x:0.5,y:1},{x:1,y:2},{x:0.5,y:1},{x:0.5,y:0}],
    "Z": [{x:0,y:2},{x:1,y:2},{x:0,y:0},{x:1,y:0}],
};
function printText(text, x, y, fontSize=5, center=false) {
    if (center) x -= text.length * fontSize*1.5 / 2
    if (center) y -= fontSize / 2

    let ret = []

    for (let char of text) {
        if (!chars[char]) char=" "

        let cRet = []

        ctx.beginPath();
        for (const point of chars[char]) {
            // if (chars[char].indexOf(point)===0) {
            //     ctx.moveTo(x + point.x*fontSize, y - point.y*fontSize);
            // } else {
            //     ctx.lineTo(x + point.x*fontSize, y - point.y*fontSize);
            // }
            cRet.push({x:x + point.x*fontSize, y:y - point.y*fontSize})
        }

        ret.push(cRet)
        // ctx.strokeStyle = "white";
        // ctx.lineWidth = 1;
        // ctx.stroke();

        x+=fontSize*1.5
    }
    return ret
}

function distance(x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
}

const camera = {
    x: 0,
    y: 0,
    targetx: 0,
    targety: 0,
    shake: 0,
    text: {
        line1: "ASTEROIDS2",
        line2: "BY SEB A-K",
        line3: "PRESS START",
        time: -1,
    },
};

const ship = {
    x: 0,
    y: 0,
    xdir: 0,
    ydir: 0,
    rotation: 0,
    boostTime: 100,
    speed: 0,
    radius: 10,
    thrust: 0.2,
    rotateSpeed: 5,
};

const score = {
    current: 0,
    high: 0,
    last: 0,
}
const highscore = localStorage.getItem('highscore');
if (highscore === null) {
  localStorage.setItem('highscore', 0);
} else {
  score.high = parseInt(highscore, 10);
}


let screen = []

const asteroids = [];
const despawnRadius = 600;
let asteroidCount = 10;
function newAsteroid() {
    const radius = 5 + Math.random() * 20;
    const angle = Math.random() * Math.PI * 2; // random angle in radians
    const distanceFromCenter = 200 + radius + Math.random()*100;


    const x = camera.x + Math.cos(angle) * distanceFromCenter;
    const y = camera.y + Math.sin(angle) * distanceFromCenter;

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
        points: points
    };
}

const stars = []
function newStar() {
    const x = Math.random() * 2 * canvasWidth;
    const y = Math.random() * 2 * canvasHeight;

    return {x:x, y:y};
}
for (let i = 0; i < 50; i++) {
    stars.push(newStar());
}

function start() {
    canvas = document.getElementById("gameCanvas");
    ctx = canvas.getContext("2d");

    setInterval(update, 20);

    setupJoystick();

    function resizeCanvas() {
        const canvas = document.getElementById("gameCanvas");
        // Set width to window width, height to 4:3 aspect ratio
        const width = window.innerWidth * 0.9;
        const height = Math.round(width * 0.75);
        canvas.style.width = width + "px";
        canvas.style.height = height + "px";
        canvas.width = width;
        canvas.height = height;
    }
    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();
}

function update() {

    move();

    draw();
}
const keys = {
    a: false, d: false, w: false, s: false, Space: false,
    ArrowLeft: false, ArrowRight: false, ArrowUp: false, ArrowDown: false,
    START: false, SELECT: false
};
function move() {

    if (score.current>3000) {
        asteroidCount = 50
    } else if (score.current>2000) {
        asteroidCount = 40
    } else if (score.current>1000) {
        asteroidCount = 30
    } else {
        asteroidCount = 20
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
    const left = keys.a || keys.ArrowLeft;
    const right = keys.d || keys.ArrowRight;
    const boost = keys.w || keys.ArrowUp;
    const reverse = keys.s || keys.ArrowDown;
    const START = keys.START || keys.Space;

    // ROTATE
    if (left || right) {
        ship.rotation += (right - left) * ship.rotateSpeed;
    }

    // BOOST
    ship.boostTime++

    let B = 0
    if (camera.text.time===-1) {
        if (START && ship.boostTime>60) {
B = 2;
score.current = 0;
}
    } else {
        if (boost && ship.boostTime>60) {B = 1;}
    }

    if (B>0) {
        ship.boostTime = 0

        camera.shake = 10

        if (ship.speed==0) ship.speed = 1;
        ship.speed += ship.thrust;
        
        const rad = ship.rotation * Math.PI / 180;
        ship.xdir = Math.cos(rad);
        ship.ydir = Math.sin(rad);

        if (camera.text.time===-1) {
            camera.text.time=0
        }
        const sounds = ["boost2","boost3","boost4","boost5"]
        playSound(sounds[Math.floor(Math.random()*3)], 0.8, 1.2);
        if (B==2) playSound("powerUp");
    }

    // MOVE SHIP
    ship.x += ship.xdir * ship.speed;
    ship.y += ship.ydir * ship.speed;

    // CAMERA
    camera.targetx = ship.x + ship.xdir * ship.speed*20 + (Math.random()-0.5)*(camera.shake>0)*30;
    camera.targety = ship.y + ship.ydir * ship.speed*20 + (Math.random()-0.5)*(camera.shake>0)*30;

    camera.x += (camera.targetx - camera.x) * 0.1;
    camera.y += (camera.targety - camera.y) * 0.1;

    if (camera.text.time>0) camera.text.time--
    if (camera.shake>0) camera.shake--

    // ASTEROIDS
    for (const a of asteroids) {
        a.x += a.xvel;
        a.y += a.yvel;

        const distanceToShip = distance(ship.x, ship.y, a.x, a.y);
        
        // 
        if (camera.text.time===-1 && distanceToShip < a.radius + ship.radius + 80) {
            const index = asteroids.indexOf(a);
            asteroids[index] = newAsteroid();
        }

        // Collision
        if (distanceToShip < a.radius + ship.radius) {
            const index = asteroids.indexOf(a);
            asteroids[index] = newAsteroid();

            ship.speed = 0;
            
            camera.shake = 40
            // if (navigator.vibrate) navigator.vibrate(40*20);

            score.last = Math.floor(score.current)

            camera.text.time = -1
            camera.text.line1 = `HIT ASTEROID`
            camera.text.line2 = `SCORE ${score.last}`
            camera.text.line3 = `PRESS START`

            if (score.current > score.high) {
                score.high = Math.floor(score.current)
                camera.text.line2 = `NEW HIGHSCORE ${score.last}`
                playSound("pickupCoin")


  
  localStorage.setItem('highscore', score.high);

            }

            

            playSound("hit")
            playSound("explosion")
        }

        // Despawn
        if (distanceToShip > despawnRadius) {
            const index = asteroids.indexOf(a);
            asteroids[index] = newAsteroid();
        }
    }
}

function posMod(n, m) {
    return ((n % m) + m) % m;
}

function draw() {
    screen = []

    // STARS
    for (const s of stars) {
        screen.push([
            {
                x: posMod(s.x - ship.x/10, canvasWidth * 2),
                y: posMod(s.y - ship.y/10, canvasHeight * 2)
            },
            {
                x: posMod(s.x - ship.x/10, canvasWidth * 2)+1,
                y: posMod(s.y - ship.y/10, canvasHeight * 2)+1
            }
        ]);
    }

    // SHIP
    screen.push(drawTriangle(ship.x, ship.y, ship.radius, ship.rotation));
    if (ship.boostTime<60) {
        screen.push(drawTriangle(
            ship.x - ship.xdir * ship.radius * 1.3,
            ship.y - ship.ydir * ship.radius * 1.3,
            ship.radius * 0.3 * (Math.random()+1),
            270-Math.atan2(ship.xdir, ship.ydir) * 180 / Math.PI
        ));
    }

    // ASTEROIDS
    for (const a of asteroids) {
        screen.push(drawPath(a.x, a.y, a.points));
    }

    // SCORE TEXT
    screen.push(...printText(`SC ${Math.floor(score.current)}`, 5, 15));
    screen.push(...printText(`HI ${score.high}`, 5, 30));

    screen.push(...printText(`JOYSTICK-ROTATE  B-BOOST`, 5, canvasHeight-5, 3.5));

    if (camera.text.time>0 || camera.text.time===-1) {
        screen.push(...printText(camera.text.line1, canvasWidth/2, canvasHeight/2-10, 15, true));
        screen.push(...printText(camera.text.line2, canvasWidth/2, canvasHeight/2+35, 7, true));
        screen.push(...printText(camera.text.line3, canvasWidth/2, canvasHeight/2+65, 10, true));
    }

    drawScreen(screen)
}

function drawScreen(screen) {
    const scale = canvas.width / canvasWidth

    ctx.fillStyle = "#A4B334";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for (const line of screen) {
        ctx.beginPath();

        for (const point of line) {
            if (line.indexOf(point)===0) {
                ctx.moveTo(
                    point.x * scale,
                    point.y * scale
                );
            } else {
                ctx.lineTo(
                    point.x * scale,
                    point.y * scale
                );
            }
        }

        ctx.strokeStyle = "#2E5624";
        ctx.lineWidth = scale;
        ctx.stroke();
    }
}


function drawPath(x, y, points) {
    ctx.beginPath();
    const ret = []
    for (const point of points) {
        // if (points.indexOf(point)===0) {
        //     ctx.moveTo(
        //         x + point.x - camera.x + canvasWidth / 2,
        //         y - point.y - camera.y + canvasHeight / 2
        //     );
        // } else {
        //     ctx.lineTo(
        //         x + point.x - camera.x + canvasWidth / 2,
        //         y - point.y - camera.y + canvasHeight / 2
        //     );
        // }

        ret.push({
            x: x + point.x - camera.x + canvasWidth / 2,
            y: y - point.y - camera.y + canvasHeight / 2
        })
    }

    if (points.length > 0) {
        ret.push({
            x: x + points[0].x - camera.x + canvasWidth / 2,
            y: y + points[0].y - camera.y + canvasHeight / 2
        });
    }

    return ret

    // ctx.closePath();
    // ctx.strokeStyle = "white";
    // ctx.lineWidth = 1;
    // ctx.stroke();
}

function drawCircle(x, y, radius) {
    ctx.beginPath();
    ctx.arc(
        x - camera.x + canvasWidth / 2,
        y - camera.y + canvasHeight / 2,
        radius,
        0,
        Math.PI * 2
    );
    ctx.strokeStyle = "white";
    ctx.lineWidth = 1;
    ctx.stroke();
}

function drawTriangle(x, y, radius, rotation) {
    const rad = rotation * Math.PI / 180;

    const tip = {
        x: x - camera.x + canvasWidth / 2 + Math.cos(rad) * radius,
        y: y - camera.y + canvasHeight / 2 + Math.sin(rad) * radius
    };
    const left = {
        x: x - camera.x + canvasWidth / 2 + Math.cos(rad + Math.PI * 3 / 4) * radius,
        y: y - camera.y + canvasHeight / 2 + Math.sin(rad + Math.PI * 3 / 4) * radius
    };
    const right = {
        x: x - camera.x + canvasWidth / 2 + Math.cos(rad - Math.PI * 3 / 4) * radius,
        y: y - camera.y + canvasHeight / 2 + Math.sin(rad - Math.PI * 3 / 4) * radius
    };

    return [tip, left, right, tip, right]

    // ctx.beginPath();
    // ctx.moveTo(tip.x, tip.y);
    // ctx.lineTo(left.x, left.y);
    // ctx.lineTo(right.x, right.y);
    // ctx.closePath();
    // ctx.strokeStyle = "white";
    // ctx.lineWidth = 1;
    // ctx.stroke();
}


document.addEventListener("keydown", (e) => {
    if (e.key === " " || e.code === "Space") keys.Space = true;
    if (e.key in keys) keys[e.key] = true;
});
document.addEventListener("keyup", (e) => {
    if (e.key === " " || e.code === "Space") keys.Space = false;
    if (e.key in keys) keys[e.key] = false;
});


let joystick
let knob
let joyActive = false, joyStart = {x:0, y:0};

function setVirtualKeys(dx, dy) {
    // Simple 4-way: left/right = a/d, up = w, down = s
    keys.a = dx < -20;
    keys.d = dx > 20;
    keys.w = dy < -20;
    keys.s = dy > 20;
}
function resetVirtualKeys() {
    keys.a = keys.d = keys.w = keys.s = false;
}

function joyMove(e) {
    if (!joyActive) return;
    let touch = e.touches ? e.touches[0] : e;
    let rect = joystick.getBoundingClientRect();
    let dx = touch.clientX - (rect.left + rect.width / 2);
    let dy = touch.clientY - (rect.top + rect.height / 2);

    // Calculate the maximum distance the knob can move (center to edge minus knob radius)
    const joySize = rect.width; // in px
    const knobSize = knob.offsetWidth; // in px
    const maxDist = (joySize - knobSize) / 2;

    // Clamp the distance
    let dist = Math.min(Math.sqrt(dx * dx + dy * dy), maxDist);
    let angle = Math.atan2(dy, dx);
    let knobX = Math.cos(angle) * dist;
    let knobY = Math.sin(angle) * dist;

    // Move the knob so it's always centered
    knob.style.left = ((joySize - knobSize) / 2 + knobX) + "px";
    knob.style.top = ((joySize - knobSize) / 2 + knobY) + "px";

    ship.rotation = angle * 180 / Math.PI;
    // setVirtualKeys(knobX, knobY); // Uncomment if you want WASD emulation
}

function setupJoystick() {
    joystick = document.getElementById("joystick");
    knob = document.getElementById("joystick-knob");

    joystick.addEventListener("touchstart", e => { joyActive = true; joyMove(e); vibrate(10); }, {passive:false});
    joystick.addEventListener("touchmove", joyMove, {passive:false});
    joystick.addEventListener("touchend", e => { joyActive = false; knob.style.left="8vw"; knob.style.top="8vw"; resetVirtualKeys(); }, {passive:false});
    joystick.addEventListener("mousedown", e => { joyActive = true; joyMove(e); vibrate(10); });
    window.addEventListener("mousemove", e => { if (joyActive) joyMove(e); });
    window.addEventListener("mouseup", e => { if (joyActive) { joyActive = false; knob.style.left="8vw"; knob.style.top="8vw"; resetVirtualKeys(); } });
    
    // A button
    document.getElementById("btnA").addEventListener("touchstart", e => { keys.s = true; vibrate(10); }, {passive:false});
    document.getElementById("btnA").addEventListener("touchend", e => { keys.s = false; }, {passive:false});
    document.getElementById("btnA").addEventListener("mousedown", e => { keys.s = true; vibrate(10); });
    document.getElementById("btnA").addEventListener("mouseup", e => { keys.s = false; });

    // B button
    document.getElementById("btnB").addEventListener("touchstart", e => { keys.w = true; vibrate(10); }, {passive:false});
    document.getElementById("btnB").addEventListener("touchend", e => { keys.w = false; }, {passive:false});
    document.getElementById("btnB").addEventListener("mousedown", e => { keys.w = true; vibrate(10); });
    document.getElementById("btnB").addEventListener("mouseup", e => { keys.w = false; });

    // SELECT button
    document.getElementById("select").addEventListener("touchstart", e => { keys.SELECT = true; vibrate(10); }, {passive:false});
    document.getElementById("select").addEventListener("touchend", e => { keys.SELECT = false; }, {passive:false});
    document.getElementById("select").addEventListener("mousedown", e => { keys.SELECT = true; vibrate(10); });
    document.getElementById("select").addEventListener("mouseup", e => { keys.SELECT = false; });

    // START button
    document.getElementById("start").addEventListener("touchstart", e => { keys.START = true; vibrate(10); }, {passive:false});
    document.getElementById("start").addEventListener("touchend", e => { keys.START = false; }, {passive:false});
    document.getElementById("start").addEventListener("mousedown", e => { keys.START = true; vibrate(10); });
    document.getElementById("start").addEventListener("mouseup", e => { keys.START = false; });
}


function vibrate(time) {
    // if (navigator.vibrate) navigator.vibrate(time);
}