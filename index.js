const items = [
    {   title: "3d Renderer",
        subtitle: "",
        description: "A 3d renderer I made from scratch only using Javascript. It can render obj files",
        image: "Z-images/Renderer.png",
        link: {
            text: "View now",
            url: "Renderer1/",
        },
        index: 5,
        show: true,
    },
    {   title: "8bit-bird5",
        subtitle: "",
        description: "A local multiplayer pygame game with shaders to give it a retro look",
        image: "Z-images/8bb-cover.png",
        link: {
            text: "Download now",
            url: "8bb/",
        },
        index: 4,
        show: true,
    },
    {   title: "Asteroids2",
        subtitle: "",
        description: "A simple arcade game where you dodge Asteroids and try to beat the highscore.",
        image: "Z-images/asteroids2.png",
        link: {
            text: "Play now",
            url: "asteroids2/",
        },
        index: 1,
        show: true,
    },
    {   title: "Shape Game",
        subtitle: "",
        description: "Topdown shooter made in pygame with enemy ai, upgrades, multiple bossfights and modes",
        image: "Z-images/coverimg.png",
        link: {
            text: "Play now",
            url: "shapegame/",
        },
        index: 3,
        show: true,
    },
    {   title: "Golf",
        subtitle: "",
        description: "4 player local multiplayer mini golf game using a single input each",
        image: "Z-images/Golf.png",
        link: {
            text: "Play now",
            url: "golf/",
        },
        index: 7,
        show: true,
    },
    {   title: "RUN",
        subtitle: "",
        description: "A prototype of my copy of the RUN game using css and js",
        image: "Z-images/run.png",
        link: {
            text: "Play [prototype] now",
            url: "run/",
        },
        index: 9,
        show: false,
    },
    {   title: "Dots",
        subtitle: "",
        description: "A 3d horror game prototype where you can only see dots from your flashlight",
        image: "Z-images/dots2.png",
        link: {
            text: "Play [prototype] now",
            url: "dots/",
        },
        index: 2,
        show: true,
    },
    {   title: "Radar Game",
        subtitle: "",
        description: "A submarine game made with css and js, where you controll the radar and shooting",
        image: "Z-images/radar.png",
        link: {
            text: "Play [prototype] now",
            url: "radarGame/",
        },
        index: 8,
        show: false,
    },
    {   title: "2dCollision",
        subtitle: "",
        description: "2d ball simulation made with pygame [left click] move, [right click] throw",
        image: "Z-images/2dcollisions.png",
        link: {
            text: "View now",
            url: "2dcollisions/",
        },
        index: 6,
        show: true,
    }
];

const font = {
    "A": {width:3,f:[" # ","# #","# #","###","# #"]},
    "B": {width:3,f:["## ","# #","## ","# #","###"]},
    "C": {width:3,f:[" ##","#  ","#  ","#  "," ##"]},
    "D": {width:3,f:["## ","# #","# #","# #","## "]},
    "E": {width:3,f:["###","#  ","## ","#  ","###"]},
    "F": {width:3,f:["###","#  ","## ","#  ","#  "]},
    "G": {width:3,f:["###","#  ","#  ","# #","###"]},
    "H": {width:3,f:["# #","# #","###","# #","# #"]},
    "I": {width:3,f:["###"," # "," # "," # ","###"]},
    "J": {width:3,f:["###"," # "," # "," # ","#  "]},
    "K": {width:3,f:["# #","# #","## ","# #","# #"]},
    "L": {width:3,f:["#  ","#  ","#  ","#  ","###"]},
    "M": {width:5,f:["## # ","# # #","#   #","#   #","#   #"]},
    "N": {width:3,f:["## ","# #","# #","# #","# #"]},
    "O": {width:3,f:["###","# #","# #","# #","###"]},
    "P": {width:3,f:["###","# #","###","#  ","#  "]},
    "Q": {width:3,f:["### ","# # ","# # ","# # ","## #"]},
    "R": {width:3,f:["###","# #","## ","# #","# #"]},
    "S": {width:3,f:[" ##","#  ","###","  #","## "]},
    "T": {width:3,f:["###"," # "," # "," # "," # "]},
    "U": {width:3,f:["# #","# #","# #","# #","###"]},
    "V": {width:3,f:["# #","# #","# #","# #"," # "]},
    "W": {width:5,f:["#   #","#   #","#   #","# # #"," # # "]},
    "X": {width:3,f:["# #","# #"," # ","# #","# #"]},
    "Y": {width:3,f:["# #","# #"," # "," # "," # "]},
    "Z": {width:3,f:["###","  #"," # ","#  ","###"]},
    "a": {width:3,f:["   ","   "," ##","# #","###"]},
    "b": {width:3,f:["#  ","#  ","## ","# #","## "]},
    "c": {width:3,f:["   ","   "," ##","#  "," ##"]},
    "d": {width:3,f:["  #","  #"," ##","# #"," ##"]},
    "e": {width:3,f:["   "," # ","# #","## "," ##"]},
    "f": {width:3,f:[" ##","#  ","## ","#  ","#  "]},
    "g": {width:3,f:["   ","   "," ##","# #"," ##","  #","## "]},
    "h": {width:3,f:["#  ","#  ","## ","# #","# #"]},
    "i": {width:1,f:["#"," ","#","#","#"]},
    "j": {width:2,f:[" #","  "," #"," #","# "]},
    "k": {width:3,f:["#  ","# #","## ","# #","# #"]},
    "l": {width:2,f:["# ","# ","# ","# "," #"]},
    "m": {width:5,f:["     ","     "," # # ","# # #","#   #"]},
    "n": {width:3,f:["   ","   ","## ","# #","# #"]},
    "o": {width:3,f:["   ","   "," # ","# #"," # "]},
    "p": {width:3,f:["   ","   ","## ","# #","## ","#  ","#  "]},
    "q": {width:3,f:["    ","    "," ## ","# # "," ## ","  ##","  # "]},
    "r": {width:2,f:["  "," #","# ","# ","# "]},
    "s": {width:3,f:["   "," ##","#  "," ##","## "]},
    "t": {width:3,f:["   "," # ","###"," # ","  #"]},
    "u": {width:3,f:["   ","   ","# #","# #"," ##"]},
    "v": {width:3,f:["   ","   ","# #","# #"," # "]},
    "w": {width:5,f:["     ","#   #","#   #","# # #"," # # "]},
    "x": {width:3,f:["   ","   ","# #"," # ","# #"]},
    "y": {width:3,f:["   ","   ","# #","# #"," ##","  #","## "]},
    "z": {width:3,f:["   ","###","  #"," # ","###"]},
    "0": {width:3,f:["###","# #","# #","# #","###"]},
    "1": {width:3,f:[" # ","## "," # "," # ","###"]},
    "2": {width:3,f:["###","  #"," ##","#  ","###"]},
    "3": {width:3,f:["## ","  #"," # ","  #","## "]},
    "4": {width:3,f:["  #"," ##","# #","###","  #"]},
    "5": {width:3,f:["###","#  ","## ","  #","## "]},
    "6": {width:3,f:[" ##","#  ","## ","# #","###"]},
    "7": {width:3,f:["###","  #"," # "," # "," # "]},
    "8": {width:3,f:["###","# #"," # ","# #","###"]},
    "9": {width:3,f:["###","# #","###","  #","  #"]},
    "-": {width:3,f:["   ","   ","###","   ","   "]},
    "=": {width:3,f:["   ","###","   ","###","   "]},
    "!": {width:3,f:[" # "," # "," # ","   "," # "]},
    "'": {width:1,f:["#"," "," "," "," "]},
    "£": {width:3,f:["  #"," # ","###"," # ","###"]},
    "$": {width:3,f:[" ##","## ","###"," ##","## "]},
    "%": {width:3,f:["# #","  #"," # ","#  ","# #"]},
    "^": {width:3,f:[" # ","# #","   ","   ","   "]},
    "&": {width:3,f:[" # ","# #","## ","# #","###"]},
    "*": {width:3,f:[" # ","###"," # ","   ","   "]},
    "(": {width:2,f:[" #","# ","# ","# "," #"]},
    ")": {width:2,f:["# "," #"," #"," #","# "]},
    "_": {width:3,f:["   ","   ","   ","   ","###"]},
    "+": {width:3,f:["   "," # ","###"," # ","   "]},
    "{": {width:2,f:[" #","# "," #","# "," #"]},
    "}": {width:2,f:["# "," #","# "," #","# "]},
    "[": {width:2,f:["##","# ","# ","# ","##"]},
    "]": {width:2,f:["##"," #"," #"," #","##"]},
    ":": {width:1,f:[" ","#"," ","#"," "]},
    ";": {width:2,f:["  "," #","  "," #","# "]},
    "#": {width:5,f:[" # # ","#####"," # # ","#####"," # # "]},
    "@": {width:5,f:[" ### ","# ###","## ##","# ###"," ### "]},
    "~": {width:4,f:["    "," # #","# # ","    ","    "]},
    "?": {width:3,f:["###","  #"," # ","   "," # "]},
    ".": {width:1,f:[" "," "," "," ","#"]},
    ",": {width:2,f:["  ","  ","  ","  "," #","# "]},
    "<": {width:2,f:["  "," #","# "," #","  "]},
    ">": {width:2,f:["  ","# "," #","# ","  "]},
    "/": {width:3,f:["  #","  #"," # ","#  ","#  "]},
    "\\": {width:3,f:["#  ","#  "," # ","  #","  #"]},
    "|": {width:1,f:["#","#","#","#","#"]},
    "¦": {width:1,f:["#","#"," ","#","#"]},
    "`": {width:2,f:["# "," #","  ","  ","  "]},
    "¬": {width:3,f:["   ","   ","###","  #","   "]},
    " ": {width:1,f:[" "," "," "," "," "]},
}

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

let WIDTH = 500;
let HEIGHT = 500;
const GRID_SIZE = 50;
let SCALE = 2;

const bg1 = '#02091aff'
const bg2 = '#01060fff'
const bg3 = '#323641ff'
document.body.style.backgroundColor = bg3;

class BaseObject {
    constructor(x, y, width, height) {
        this.x = x; this.y = y;
        this.width = width;
        this.height = height;
        this.vx = 0; this.vy = 0;
        this.dx = 0; this.dy = 0;
        this.moveable = false;
    }

    isCollidingWith(obj) {
        const objMax = {
            x: Math.max(obj.x, obj.x + obj.width),
            y: Math.max(obj.y, obj.y + obj.height)
        };
        const objMin = {
            x: Math.min(obj.x, obj.x + obj.width),
            y: Math.min(obj.y, obj.y + obj.height)
        };

        const thisMax = {
            x: Math.max(this.x, this.x + this.width),
            y: Math.max(this.y, this.y + this.height)
        };
        const thisMin = {
            x: Math.min(this.x, this.x + this.width),
            y: Math.min(this.y, this.y + this.height)
        };

        const colliding =
            (objMin.x < thisMax.x && objMax.x > thisMin.x) &&
            (objMin.y < thisMax.y && objMax.y > thisMin.y);

        if (!colliding) {
            return {
                colliding: false,
                direction: null,
                overlapX: 0,
                overlapY: 0
            };
        }

        const overlapX =
            Math.min(thisMax.x, objMax.x) - Math.max(thisMin.x, objMin.x);
        const overlapY =
            Math.min(thisMax.y, objMax.y) - Math.max(thisMin.y, objMin.y);

        let direction = null;

        if (overlapX < overlapY) {
            if (this.x < obj.x) direction = "left";
            else direction = "right";
        } else {
            if (this.y < obj.y) direction = "top";
            else direction = "bottom";
        }

        return {
            colliding: true,
            direction,
            overlapX,
            overlapY
        };
    }

    tick() {
        if (!this.moveable) return;
        if (this.vx === 0 && this.vy === 0 && this.dx === 0 && this.dy === 0) return;
        
        this.x += this.vx;
        this.y += this.vy;

        this.x += this.dx; this.dx = 0;
        this.y += this.dy; this.dy = 0;

        for (const b of boxes) {
            if (b === this) continue;

            const hit = this.isCollidingWith(b);
            if (hit.colliding) {
                if (b.moveable) {
                    if (hit.direction === "left" || hit.direction === "right") {
                        b.dx += this.vx;
                    } else if (hit.direction === "top" || hit.direction === "bottom") {
                        b.dy += this.vy;
                    }
                }

                if (hit.direction === "left")  this.x -= hit.overlapX;
                if (hit.direction === "right") this.x += hit.overlapX;
                if (hit.direction === "top")   this.y -= hit.overlapY;
                if (hit.direction === "bottom")this.y += hit.overlapY;

                if (hit.direction === "left" || hit.direction === "right") {
                    this.vx *= -1;
                } else {
                    this.vy *= -1;
                }
            }
        }
    }
    
    draw() {}

    string(x, y, str, size, maxWidth=undefined) {
        let dx = 0
        let dy = 0
        const height = 7
        
        const words = str.split(" ");

        for (const word of words) {
            const wordWidth = [...word].reduce((acc, chr) => acc + font[chr].width * size + size, -size);
        
            if (dx + wordWidth > maxWidth) {
                dy += height;
                dx = 0;
            }

            for (const chr of word) {
                dx += this.chr(x+dx, y+dy, chr, size);
                dx += size;
            }

            dx += this.chr(x+dx, y+dy, " ", size);
            dx += size;
        }

    }

    chr(x, y, chr, size) {
        const f = font[chr].f
        ctx.fillStyle = this.colour.text;

        for (let dy=0; dy<f.length; dy++) {
            for (let dx=0; dx<f[dy].length; dx++) {
                if (f[dy][dx]==" ") continue
                ctx.fillRect(
                    x+dx*size,y+dy*size, 
                    size,size
                );
            }
        }
        return font[chr].width * size
    }

}

class Button extends BaseObject {
    constructor(x, y, width, height, text, onClick) {
        super(x, y, width, height);
        this.text = text;
        this.onClick = onClick;

        this.colour = {
            bg: '#1f1b22ff',
            text: '#bcbfc2ff',
            outline: '#493d1eff'
        }
    }

    draw() {

    }
}

class Guy extends BaseObject {
    constructor(x, y, text, textSize=2) {
        super(x, y, 1, 1);

        this.text = text;
        this.textSize = textSize;

        this.vx = 1/GRID_SIZE;
        this.vy = 1/GRID_SIZE;
        
        this.colour = {
            bg: '#1f1b22ff',
            text: '#bcbfc2ff',
            outline: '#493d1eff'
        }
        this.border = 4
        
        this.moveable = true;
    }

    draw() {
        ctx.fillStyle = this.colour.bg;
        ctx.fillRect(
            this.x*GRID_SIZE+ this.border/2, this.y*GRID_SIZE+this.border/2,
            this.width*GRID_SIZE-this.border, this.height*GRID_SIZE-this.border
        );//bg
        ctx.fillStyle = this.colour.outline;
        ctx.fillRect(
            this.x*GRID_SIZE+this.border/2, this.y*GRID_SIZE,
            this.width*GRID_SIZE-this.border, this.border
        );//top
        ctx.fillRect(
            this.x*GRID_SIZE+this.border/2, this.y*GRID_SIZE + this.height*GRID_SIZE -this.border,
            this.width*GRID_SIZE-this.border, this.border
        );//bottom
        ctx.fillRect(
            this.x*GRID_SIZE, this.y*GRID_SIZE+this.border/2,
            this.border, this.height*GRID_SIZE-this.border
        );//left
        ctx.fillRect(
            this.x*GRID_SIZE + this.width*GRID_SIZE -this.border, this.y*GRID_SIZE+this.border/2,
            this.border, this.height*GRID_SIZE-this.border
        );//right

        this.string(
            this.x*GRID_SIZE + 8, this.y*GRID_SIZE + 12,
            this.text, this.textSize
        )
    }
}

class Box extends BaseObject {
    constructor(x, y, width, height, content) {
        super(x, y, width, height);
        this.moveable = true;
        this.content = content;

        this.img = new Image();
        this.img.src = content.image;

        this.border = 4

        this.colour = {
            bg: '#1f1b22ff',
            text: '#bcbfc2ff',
            outline: '#1e2949ff'
        }
    }

    draw() {
        ctx.fillStyle = this.colour.bg;
        ctx.fillRect(
            this.x*GRID_SIZE+ this.border/2, this.y*GRID_SIZE+this.border/2,
            this.width*GRID_SIZE-this.border, this.height*GRID_SIZE-this.border
        );//bg
        ctx.fillStyle = this.colour.outline;
        ctx.fillRect(
            this.x*GRID_SIZE+this.border/2, this.y*GRID_SIZE,
            this.width*GRID_SIZE-this.border, this.border
        );//top
        ctx.fillRect(
            this.x*GRID_SIZE+this.border/2, this.y*GRID_SIZE + this.height*GRID_SIZE -this.border,
            this.width*GRID_SIZE-this.border, this.border
        );//bottom
        ctx.fillRect(
            this.x*GRID_SIZE, this.y*GRID_SIZE+this.border/2,
            this.border, this.height*GRID_SIZE-this.border
        );//left
        ctx.fillRect(
            this.x*GRID_SIZE + this.width*GRID_SIZE -this.border, this.y*GRID_SIZE+this.border/2,
            this.border, this.height*GRID_SIZE-this.border
        );//right

        this.drawContents();
    }

    drawContents() {
        this.string(
            this.x*GRID_SIZE + 6, this.y*GRID_SIZE + 6,
            this.content.title, 2
        )
        this.string(
            this.x*GRID_SIZE + 6, this.y*GRID_SIZE + 24,
            this.content.description, 1, this.width*GRID_SIZE*0.44
        )
        if (this.img.complete) {
            ctx.drawImage(
                this.img,
                this.x*GRID_SIZE+this.width*GRID_SIZE/2-this.border, this.y*GRID_SIZE-this.border,
                this.height*GRID_SIZE*1,
                this.height*GRID_SIZE*1
            );
        }
    }
}

class TitleBox extends Box {
    constructor(x, y, width, height) {
        super(x, y, width, height, {
            title: "SEB",
            subtitle: "Abi-Karam",
            description: "\\(^o^)/",
        })
        this.colour.outline = '#1e4942ff'
        this.colour.text = '#c3d8ccff'
    }

    drawContents() {
        this.string(
            this.x*GRID_SIZE + 14, this.y*GRID_SIZE + 14,
            this.content.title, 18
        )
        this.string(
            this.x*GRID_SIZE + 14, this.y*GRID_SIZE + this.height*GRID_SIZE - 18 - 4*4,
            this.content.subtitle, 4
        )
        this.string(
            this.x*GRID_SIZE + 6 + 18*10, this.y*GRID_SIZE + this.height*GRID_SIZE - 8 -4*4,
            this.content.description, 2
        )
    }
}

const boxes = [
    new BaseObject(-1, -1, 100, 1),
    new BaseObject(-1, -1, 1, 100),
    new BaseObject(-1, 20, 100, 1),
    new BaseObject(9, -1, 1, 100),

    new Guy(6, 0, "'O'",5),
    new Guy(7, 3, "^_^",3),

    new Guy(Math.floor(Math.random()*8), 6, "*_*",3),
    new Guy(Math.floor(Math.random()*8), 8, ">_<",3),
    new Guy(Math.floor(Math.random()*8), 10, "*u*",3),
    new Guy(Math.floor(Math.random()*8), 12, "'w'",4),
    new Guy(Math.floor(Math.random()*8), 14, "'-'",4),

    new TitleBox(2, 1, 5, 3),
]

function spawnBoxes() {
    let y = 6;
    for (let i=0; i <= items.length-1; i++) {
        if (!items[i].show) continue;
        boxes.push(
            new Box(Math.floor(Math.random()*6), y, 4, 2, items[i])
        )
        y += 2 + Math.floor(Math.random()*2);
    }
    boxes[2].y = y+2
}spawnBoxes();


function resize() {
    // let w = Math.floor((window.innerWidth*0.9)/SCALE/GRID_SIZE)*GRID_SIZE
    // let h = 3*Math.floor((window.innerHeight*0.9)/SCALE/GRID_SIZE)*GRID_SIZE
    // w = Math.min(w, GRID_SIZE*9);
    // h = Math.min(h, GRID_SIZE*boxes[2].y);

    let w = GRID_SIZE*9;
    let h = GRID_SIZE*boxes[2].y;

    WIDTH = w; canvas.width = w;
    HEIGHT = h; canvas.height = h;
    canvas.style.width = w*SCALE + 'px'
    canvas.style.height = h*SCALE + 'px'

    // if (window.innerWidth < 1010) SCALE = 1;
    // else SCALE = 2;
}
addEventListener("resize", resize); resize();

const FPS = 60;
const FRAME_INTERVAL = 1000 / FPS;
let lastFrameTime = -FRAME_INTERVAL;

requestAnimationFrame(loop);
function loop(now) {
    if ((now - lastFrameTime >= FRAME_INTERVAL)) {
        for (const b of boxes) {
            for (let i=0; i<3; i++) b.tick();
        }
        lastFrameTime = now - ((now - lastFrameTime) % FRAME_INTERVAL);
    }

    for (let y=0; y<HEIGHT/GRID_SIZE; y++) {
        for (let x=0; x<WIDTH/GRID_SIZE; x++) {
            ctx.fillStyle = (x+y)%2==0 ? bg1:bg2;
            ctx.fillRect(
                x*GRID_SIZE, y*GRID_SIZE,
                GRID_SIZE, GRID_SIZE
            );
        }
    }

    ctx.fillStyle = bg3;
    ctx.fillRect(0, 0, 2, 2);
    ctx.fillRect(WIDTH-2, 0, 2, 2);
    ctx.fillRect(0, HEIGHT-2, 2, 2);
    ctx.fillRect(WIDTH-2, HEIGHT-2, 2, 2);


    for (const b of boxes) {
        b.draw();
    }

    requestAnimationFrame(loop);
}