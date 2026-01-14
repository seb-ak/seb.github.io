const items = [
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
    {   title: "tanks",
        subtitle: "",
        description: "online multiplayer version of Wii tanks",
        image: "Z-images/tanks.png",
        link: {
            text: "Play now",
            url: "tanks/",
        },
        index: 1,
        show: true,
    },
    {   title: "Big Shop Mega",
        subtitle: "",
        description: "A full Game made with Bedrock Scripting API. Where Villagers hide among shoppers to finish their list while the Angry Man hunts them.",
        image: "Z-images/bsm.png",
        link: {
            text: "Learn more",
            url: "BigShopMega/",
        },
        show: true,
    },
    {   title: "Computing NEA project",
        subtitle: "",
        description: "2d platformer made with js as my computing NEA project. Features multiple dimensions with different movement, enemies, items and a bossfight.",
        image: "Z-images/NEA.png",
        link: {
            text: "Play now",
            url: "https://seb-ak.github.io/neaproject/",
        },
        show: true,
        mobileHeight: 4,
    },
    {   title: "3d Renderer",
        subtitle: "",
        description: "A 3d renderer I made from scratch only using Javascript. It can render obj files",
        image: "Z-images/Renderer.png",
        link: {
            text: "View now",
            url: "renderer/Renderer1/",
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
    {   title: "Shape Game",
        subtitle: "",
        description: "Topdown shooter made in pygame with enemy ai, upgrades, multiple bossfights and modes",
        image: "Z-images/coverimg.png",
        link: {
            text: "Play (broken)",
            url: "shapegame/",
        },
        index: 3,
        show: true,
    },
    {   title: "Login",
        subtitle: "",
        description: "",
        // image: "Z-images/coverimg.png",
        link: {
            text: "Login",
            url: "login/",
        },
        index: 3,
        show: true,
        width: 2,
        height: 1,
    },
    {   title: "Dots",
        subtitle: "",
        description: "A 3d horror game prototype where you can only see dots from your flashlight",
        image: "Z-images/dots2.png",
        link: {
            text: "Play (prototype)",
            url: "dots/",
        },
        index: 2,
        show: true,
    },
    {   title: "Golf",
        subtitle: "",
        description: "4 player local multiplayer mini golf game using a single input each",
        image: "Z-images/Golf.png",
        link: {
            text: "Play (broken)",
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
            text: "Play (prototype)",
            url: "run/",
        },
        index: 9,
        show: false,
    },
    {   title: "Radar Game",
        subtitle: "",
        description: "A submarine game made with css and js, where you controll the radar and shooting",
        image: "Z-images/radar.png",
        link: {
            text: "Play (prototype)",
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
            text: "View (broken)",
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
const SPEED = 3;
let SCALE = 2;
let lastSCALE = 0;
let MOBILE = false;
let lastMOBILE = undefined;

let mouseX = 0;
let mouseY = 0;
let mouseDown = false;
let dragging = false;

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
        this.border = 4
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

        this.x += this.vx * SPEED;
        this.y += this.vy * SPEED;

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

    drawBox() {
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
    }

    string(x, y, str, size, maxWidth=undefined) {
        let dx = 0
        let dy = 0
        const height = 7
        
        const words = str.split(" ");
        let maxX = 0;

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

            maxX = Math.max(maxX, dx);
        }
        return maxX;
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
    constructor(x, y, width, height, text, onClick, textSize=1) {
        super(x, y, width, height);
        this.text = text;
        this.onClick = onClick;
        this.textSize = textSize;

        this.colour = {
            bg: '#141216ff',
            text: '#bcbfc2ff',
            outline: '#491e22ff'
        }
        this.border = 1;
    }

    draw() {
        if (
            mouseX >= this.x*GRID_SIZE &&
            mouseX <= (this.x+this.width)*GRID_SIZE &&
            mouseY >= this.y*GRID_SIZE &&
            mouseY <= (this.y+this.height)*GRID_SIZE
        ) {
            this.colour = {
                bg: '#252129ff',
                text: '#ccced1ff',
                outline: '#552428ff'
            }
        } else {
            this.colour = {
                bg: '#141216ff',
                text: '#bcbfc2ff',
                outline: '#491e22ff'
            }
        }
        

        this.drawBox();
        const maxX = this.string(
            this.x*GRID_SIZE + this.border*3, this.y*GRID_SIZE + this.border*3,
            this.text, this.textSize
        );
        this.width = (maxX + this.border*6 - 3) / GRID_SIZE;
    }
}
class MoveButton extends BaseObject {
    constructor(box, size) {
        if (MOBILE) size = 2
        super(0, 0, 0, size==1? 0.24 : 0.44);
        this.box = box;
        this.colour = {
            bg: '#141216ff',
            text: '#bcbfc2ff',
            outline: '#491e22ff'
        }
        this.border = 1;

        this.sx = undefined;
        this.sy = undefined;

        this.doMove = false;

        this.textSize = size;
    }

    onClick() {}

    move() {
        if (this.sx === undefined && this.sy === undefined) {
            this.sx = this.x*GRID_SIZE - mouseX;
            this.sy = this.y*GRID_SIZE - mouseY;
        }

        const threshold = 5;

        let distance = Math.hypot(
            (mouseX - (this.x*GRID_SIZE - this.sx)),
            (mouseY - (this.y*GRID_SIZE - this.sy))
        );
        distance = Math.floor(Math.min(distance/5, 4));

        const moveSpeed = 1/GRID_SIZE * distance;
        
        if      (mouseX-threshold > this.x*GRID_SIZE - this.sx) this.box.dx = moveSpeed;
        else if (mouseX+threshold < this.x*GRID_SIZE - this.sx) this.box.dx = -moveSpeed;
        else this.box.dx = 0;

        if      (mouseY-threshold > this.y*GRID_SIZE - this.sy) this.box.dy = moveSpeed;
        else if (mouseY+threshold < this.y*GRID_SIZE - this.sy) this.box.dy = -moveSpeed;
        else this.box.dy = 0;
    }

    draw() {
        if (
            mouseX >= this.x*GRID_SIZE &&
            mouseX <= (this.x+this.width)*GRID_SIZE &&
            mouseY >= this.y*GRID_SIZE &&
            mouseY <= (this.y+this.height)*GRID_SIZE &&
            !dragging
        ) {
            if (mouseDown) {
                this.doMove = true;
            } else {
                this.colour = {
                    bg: '#252129ff',
                    text: '#ccced1ff',
                    outline: '#552428ff'
                }
            }
        } else {
            this.colour = {
                bg: '#141216ff',
                text: '#bcbfc2ff',
                outline: '#491e22ff'
            }
        }

        if (!mouseDown) this.doMove = false;
        
        if (this.doMove) {
            dragging = true;
            _touchStartScrollY = window.scrollY || window.pageYOffset || 0;
            this.colour = {
                bg: '#353239ff',
                text: '#dddddeff',
                outline: '#75262aff'
            }
            this.move();
        }
        else {
            if (this.sx !== undefined && this.sy !== undefined) dragging = false;
            this.sx = undefined;
            this.sy = undefined;
        }

        this.drawBox();
        const maxX = this.string(
            this.x*GRID_SIZE + this.textSize*2/2 +1, this.y*GRID_SIZE + this.textSize*4/2 +1,
            "<  >", this.textSize
        );
        this.string(
            this.x*GRID_SIZE + this.textSize*4/2 +1, this.y*GRID_SIZE + this.textSize*2/2 +1,
            " ^ ", this.textSize
        );
        this.string(
            this.x*GRID_SIZE + this.textSize*4/2 +1, this.y*GRID_SIZE + this.textSize*8/2 +1,
            " v ", this.textSize
        );
        this.width = (maxX + this.border*6 - 6 + (this.textSize==1 ? 1 : 0)) / GRID_SIZE; 
    }
}


class Guy extends BaseObject {
    constructor(x, y, text, textSize=2) {
        const size = MOBILE? 0.5 : 1
        super(x, y, size, size);

        this.text = text;
        this.textSize = textSize;

        this.vx = 1/GRID_SIZE;
        this.vy = 1/GRID_SIZE;
        
        this.colour = {
            bg: '#1f1b22ff',
            text: '#bcbfc2ff',
            outline: '#493d1eff'
        }
        
        this.moveable = true;
    }

    draw() {
        this.drawBox();

        const divisor = MOBILE? 2 : 1
        this.string(
            this.x*GRID_SIZE + 8 /divisor,
            this.y*GRID_SIZE + 12 /divisor,
            this.text, this.textSize /divisor
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
        this.img.onload = () => { this._cacheDirty = true; };

        this.colour = {
            bg: '#1f1b22ff',
            text: '#bcbfc2ff',
            outline: '#1e2949ff'
        }

        let aaa = this.border/GRID_SIZE*1.5
        if (MOBILE) {
            aaa = (this.height)- this.border/GRID_SIZE*7
        }
        if (content.link) {
            this.buttons = [
                {
                    x: this.border/GRID_SIZE*1.5,
                    y: (this.height)- this.border/GRID_SIZE*1.5 - 0.22,
                    button: new Button(0,0,1.5,0.22, content.link.text, () => {
                        window.location.href = content.link.url;
                    })
                },
                {
                    x: this.width - this.border/GRID_SIZE*1.5 - 0.26 - (MOBILE ? 0.22 : 0),
                    y: aaa,
                    button: new MoveButton(this, MOBILE? 2 : 1)
                }
            ]
        }

        // cache fields
        this._cacheCanvas = null;
        this._cacheDirty = true;
        this._cacheOffsetX = 0;
        this._cacheOffsetY = 0;
    }

    _redrawCache() {
        // compute pixel extents and pads so cached image includes parts drawn outside box (e.g. image)
        let imgW
        let imgH
        let imageX
        let imageY
        if (MOBILE) {
            imgW = Math.round(this.width * GRID_SIZE - this.border*2);
            imgH = imgW;
            imageX = Math.round(this.border);
            imageY = Math.round(this.height * GRID_SIZE - this.border - imgH);
        } else {
            imgW = Math.round(this.height * GRID_SIZE);
            imgH = imgW;
            imageX = Math.round(this.width * GRID_SIZE / 2 - this.border);
            imageY = Math.round(-this.border);
        }

        const boxW = Math.round(this.width * GRID_SIZE);
        const boxH = Math.round(this.height * GRID_SIZE);

        const minX = Math.min(0, imageX);
        const maxX = Math.max(boxW, imageX + imgW);
        const leftPad = minX < 0 ? -minX : 0;
        const rightPad = 2; // small extra pad
        const cacheW = Math.ceil(maxX + leftPad + rightPad);

        const minY = Math.min(0, imageY);
        const maxY = Math.max(boxH, imageY + imgH);
        const topPad = minY < 0 ? -minY : 0;
        const bottomPad = 2;
        const cacheH = Math.ceil(maxY + topPad + bottomPad);

        // create offscreen canvas
        const c = document.createElement('canvas');
        c.width = cacheW;
        c.height = cacheH;
        const cc = c.getContext('2d');

        // helpers that mimic BaseObject drawing but use cc and pixel coords relative to cache
        const baseX = leftPad;
        const baseY = topPad;

        // draw box background + outlines (copied from BaseObject.drawBox but adjusted for cache coords)
        cc.fillStyle = this.colour.bg;
        cc.fillRect(
            baseX + this.border/2, baseY + this.border/2,
            boxW - this.border, boxH - this.border
        );//bg
        cc.fillStyle = this.colour.outline;
        cc.fillRect(
            baseX + this.border/2, baseY,
            boxW - this.border, this.border
        );//top
        cc.fillRect(
            baseX + this.border/2, baseY + boxH - this.border,
            boxW - this.border, this.border
        );//bottom
        cc.fillRect(
            baseX, baseY + this.border/2,
            this.border, boxH - this.border
        );//left
        cc.fillRect(
            baseX + boxW - this.border, baseY + this.border/2,
            this.border, boxH - this.border
        );//right

        // draw title and description using font map (re-implemented to draw into cc)
        const drawChr = (ctxLocal, px, py, chr, size) => {
            const f = font[chr].f;
            ctxLocal.fillStyle = this.colour.text;
            for (let ry = 0; ry < f.length; ry++) {
                for (let rx = 0; rx < f[ry].length; rx++) {
                    if (f[ry][rx] === " ") continue;
                    ctxLocal.fillRect(px + rx * size, py + ry * size, size, size);
                }
            }
            return font[chr].width * size;
        };

        const drawString = (ctxLocal, px, py, str, size, maxWidth = undefined) => {
            let dx = 0;
            let dy = 0;
            const height = 7*size;
            const words = str.split(" ");
            let maxX = 0;
            for (const word of words) {
                const wordWidth = [...word].reduce((acc, chr) => acc + font[chr].width * size + size, -size);
                if (maxWidth !== undefined && dx + wordWidth > maxWidth) {
                    dy += height;
                    dx = 0;
                }
                for (const chr of word) {
                    dx += drawChr(ctxLocal, px + dx, py + dy, chr, size);
                    dx += size;
                }
                dx += drawChr(ctxLocal, px + dx, py + dy, " ", size);
                dx += size;
                maxX = Math.max(maxX, dx);
            }
            return maxX;
        };

        // title
        if (MOBILE) {
            drawString(cc, baseX + 6, baseY + 6, this.content.title, 2, this.width * GRID_SIZE -this.border*3);
            drawString(cc, baseX + 6, baseY + MOBILE? 34 : 24, this.content.description, 1, this.width * GRID_SIZE -this.border*3);
        } else {
            drawString(cc, baseX + 6, baseY + 6, this.content.title, 2);
            drawString(cc, baseX + 6, baseY + 24, this.content.description, 1, this.width * GRID_SIZE * 0.44);
        }

        // draw image if available
        if (this.img && this.img.complete) {
            const destX = baseX + imageX;
            const destY = baseY + imageY;
            try {
                cc.drawImage(this.img, destX, destY, imgW, imgH);
            } catch (e) {
                // ignore draw image errors (cross-origin etc.), cache will still work without it
            }
        }

        // store cache and offsets so it can be blitted to main ctx at correct position
        this._cacheCanvas = c;
        this._cacheOffsetX = leftPad;
        this._cacheOffsetY = topPad;
        this._cacheDirty = false;
    }

    draw() {
        // ensure cache exists and is up-to-date
        if (!this._cacheCanvas || this._cacheDirty) {
            this._redrawCache();
        }

        // draw cached texture at correct global position (account for cached offsets)
        if (this._cacheCanvas) {
            ctx.drawImage(
                this._cacheCanvas,
                this.x * GRID_SIZE - this._cacheOffsetX,
                this.y * GRID_SIZE - this._cacheOffsetY
            );
        } else {
            // fallback to original immediate draw if cache missing
            this.drawBox();
            this.string(
                this.x*GRID_SIZE + 6, this.y*GRID_SIZE + 6,
                this.content.title, 2
            );
            this.string(
                this.x*GRID_SIZE + 6, this.y*GRID_SIZE + 24,
                this.content.description, 1, this.width*GRID_SIZE*0.44
            );
            if (this.img.complete) {
                ctx.drawImage(
                    this.img,
                    this.x*GRID_SIZE+this.width*GRID_SIZE/2-this.border, this.y*GRID_SIZE-this.border,
                    this.height*GRID_SIZE*1,
                    this.height*GRID_SIZE*1
                );
            }
        }

        // draw interactive buttons on top (keep original behavior)
        if (this.buttons) {
            for (const b of this.buttons) {
                b.button.x = this.x + b.x;
                b.button.y = this.y + b.y;
                b.button.draw();
            }
        }
    }
}
class TitleBox extends Box {
    constructor(x, y, width, height) {
        if (MOBILE) { width--; }
        super(x, y, width, height, {
            title: "SEB",
            subtitle: "Abi-Karam",
            description: ""//"\\(^o^)/",
        })
        this.colour.outline = '#1e4942ff'
        this.colour.text = '#c3d8ccff'

        this.buttons = [
            {
                x: this.width - this.border/GRID_SIZE*3 - 0.42,
                y: (this.height)- this.border/GRID_SIZE*3 - 0.36,
                button: new MoveButton(this, 2)
            }
        ]
    }

    draw() {
        this.drawBox();

        this.string(
            this.x*GRID_SIZE + 14,
            this.y*GRID_SIZE + 14,
            this.content.title, MOBILE? 15 : 18
        )
        this.string(
            this.x*GRID_SIZE + 14,
            this.y*GRID_SIZE + this.height*GRID_SIZE - 18 - 4*4,
            this.content.subtitle, 4
        )
        // this.string(
        //     this.x*GRID_SIZE + 6 + 18*10, this.y*GRID_SIZE + this.height*GRID_SIZE - 8 -4*4,
        //     this.content.description, 2
        // )

        if (this.buttons) {
            for (const b of this.buttons) {
                b.button.x = this.x + b.x;
                b.button.y = this.y + b.y;
                b.button.draw();
            }
        }
    }
}



let boxes = []
function spawnBoxes() {
    let y = 6;
    for (let i=0; i <= items.length-1; i++) {
        if (!items[i].show) continue;
        if (MOBILE) {
            if ( i==0 || (Math.random() < 0.5 && (i + 1) < items.length && items[i + 1].show)) {
                let p = Math.floor(Math.random()*3)
                boxes.push(new Box(p==0? 1+Math.floor(Math.random()*1) : 0, y + Math.floor(Math.random()*2), items[i].width||2, items[i].mobileHeight||items[i].height||3, items[i]))
                boxes.push(new Box(p==2? 2+Math.floor(Math.random()*1) : 4, y + Math.floor(Math.random()*2), items[i+1].width||2, items[i+1].mobileHeight||items[i+1].height||3, items[i+1]))
                y += 3;
                i++
            } else {

                boxes.push(new Box(Math.floor(Math.random()*5), y, items[i].width||2, items[i].mobileHeight||items[i].height||3, items[i]))
                y += 4 + Math.floor(Math.random()*1);

            }

        } else if (Math.random() < 0.3 && (i + 1) < items.length && items[i + 1].show) {

            boxes.push(new Box(0, y, items[i].width||4, items[i].height||2, items[i]))
            boxes.push(new Box(5, y, items[i+1].width||4, items[i+1].height||2, items[i+1]))
            y += 2;
            i++

        } else {

            boxes.push(new Box(Math.floor(Math.random()*6), y, items[i].width||4, items[i].height||2, items[i]))
            y += 2 + Math.floor(Math.random()*2);

        }
    }
    boxes[2].y = y+2
    if (MOBILE) {
        boxes[3].x = 6
        boxes[11].x = 1
    }
}
function resize() {
    let w = GRID_SIZE*9;
    let h = GRID_SIZE*20;
    if (boxes.length>0) { h = GRID_SIZE*boxes[2].y; }

    MOBILE = (Math.floor(window.innerWidth/GRID_SIZE/2) < 9)

    if (MOBILE) {
        w = GRID_SIZE*6
    }

    WIDTH = w; canvas.width = w;
    HEIGHT = h; canvas.height = h;
    canvas.style.width = w*SCALE + 'px'
    canvas.style.height = h*SCALE + 'px'
}


const FPS = 60;
const FRAME_INTERVAL = 1000 / FPS;
let lastFrameTime = -FRAME_INTERVAL;

function start() {
    resize();
    boxes = [
        new BaseObject(-1, -1, 100, 1),
        new BaseObject(-1, -1, 1, 100),
        new BaseObject(-1, 20, 100, 1),
        new BaseObject(9, -1, 1, 100),
    
        new Guy(4, 0, "'O'",5),
        new Guy(2, 3, "^_^",3),
    
        new Guy(Math.floor(Math.random()*4), 6, "*_*",3),
        new Guy(Math.floor(Math.random()*4), 8, ">_<",3),
        new Guy(Math.floor(Math.random()*4), 10, "*u*",3),
        new Guy(Math.floor(Math.random()*4), 12, "'w'",4),
        new Guy(Math.floor(Math.random()*4), 14, "'-'",4),
    
        new TitleBox(2, 1, 5, 3),
    ]
    spawnBoxes();
}


addEventListener("resize", resize);

requestAnimationFrame(loop);
function loop(now) {
    if ((now - lastFrameTime >= FRAME_INTERVAL)) {
        for (const b of boxes) b.tick();
        lastFrameTime = now - ((now - lastFrameTime) % FRAME_INTERVAL);
    }

    if (MOBILE != lastMOBILE) {
        start();
        lastMOBILE = MOBILE
    }

    // handle scaling
    if (MOBILE) SCALE = 1;
    else SCALE = 2;

    if (SCALE !== lastSCALE) {
        resize();
        lastSCALE = SCALE;
    }

    // grid background
    for (let y=0; y<HEIGHT/GRID_SIZE; y++) {
        for (let x=0; x<WIDTH/GRID_SIZE; x++) {
            ctx.fillStyle = (x+y)%2==0 ? bg1:bg2;
            ctx.fillRect(
                x*GRID_SIZE, y*GRID_SIZE,
                GRID_SIZE, GRID_SIZE
            );
        }
    }

    // corners
    ctx.fillStyle = bg3;
    ctx.fillRect(0, 0, 2, 2);
    ctx.fillRect(WIDTH-2, 0, 2, 2);
    ctx.fillRect(0, HEIGHT-2, 2, 2);
    ctx.fillRect(WIDTH-2, HEIGHT-2, 2, 2);

    for (const b of boxes) b.draw();

    requestAnimationFrame(loop);
}


window.addEventListener("mousedown", (e) => {mouseDown = true;});
window.addEventListener("mouseup", (e) => {mouseDown = false;});
window.addEventListener("mousemove", (e) => {
    const rect = canvas.getBoundingClientRect();
    mouseX = (e.clientX - rect.left) / SCALE;
    mouseY = (e.clientY - rect.top) / SCALE;
});
window.addEventListener("click", (e) => {
    if (dragging) return;
    for (const b of boxes) {
        if (!b.buttons) continue;
        for (const x of b.buttons) {
            const btn = x.button;
            if (
                mouseX >=  btn.x*GRID_SIZE &&
                mouseX <= (btn.x+btn.width)*GRID_SIZE &&
                mouseY >=  btn.y*GRID_SIZE &&
                mouseY <= (btn.y+btn.height)*GRID_SIZE
            ) btn.onClick();
        }
    }
});

function _hitButtonAt(px, py) {
    for (const b of boxes) {
        if (!b.buttons) continue;
        for (const xb of b.buttons) {
            const btn = xb.button;
            const gx = (b.x + xb.x) * GRID_SIZE;
            const gy = (b.y + xb.y) * GRID_SIZE;
            const gw = btn.width * GRID_SIZE;
            const gh = btn.height * GRID_SIZE;
            if (px >= gx && px <= gx + gw && py >= gy && py <= gy + gh) {
                return { box: b, wrapper: xb, button: btn };
            }
        }
    }
    return null;
}
let _touchStartScrollY = 0;
let _touchCaptured = false;
window.addEventListener("touchstart", (e) => {
    const t = e.touches[0];
    const rect = canvas.getBoundingClientRect();
    mouseX = (t.clientX - rect.left) / SCALE;
    mouseY = (t.clientY - rect.top) / SCALE;

    // remember where the page was scrolled when touch started

    // if touch starts on a button/movebutton we capture it (prevent scroll)
    _touchCaptured = !!_hitButtonAt(mouseX * GRID_SIZE, mouseY * GRID_SIZE);

    mouseDown = true;

    if (_touchCaptured) {
        // prevent browser scroll from starting if we're touching interactive UI
        e.preventDefault();
    }
}, { passive: false });
window.addEventListener("touchmove", (e) => {
    const t = e.touches[0];
    const rect = canvas.getBoundingClientRect();
    mouseX = (t.clientX - rect.left) / SCALE;
    mouseY = (t.clientY - rect.top) / SCALE;

    if (dragging || _touchCaptured) {
        e.preventDefault();
        window.scrollTo(0, _touchStartScrollY);
    }
}, { passive: false });
window.addEventListener("touchend", (e) => {
    // use changedTouches to get last known position
    const ct = e.changedTouches && e.changedTouches[0];
    if (ct) {
        const rect = canvas.getBoundingClientRect();
        mouseX = (ct.clientX - rect.left) / SCALE;
        mouseY = (ct.clientY - rect.top) / SCALE;
    }

    // if we were dragging, stop it and prevent a tap causing a click
    if (dragging) {
        dragging = false;
        mouseDown = false;
        // ensure scroll stays where it should be
        window.scrollTo(0, _touchStartScrollY);
        _touchCaptured = false;
        e.preventDefault();
        return;
    }

    // treat touchend as a click if not dragging
    for (const b of boxes) {
        if (!b.buttons) continue;
        for (const x of b.buttons) {
            const btn = x.button;
            if (
                mouseX >=  btn.x*GRID_SIZE &&
                mouseX <= (btn.x+btn.width)*GRID_SIZE &&
                mouseY >=  btn.y*GRID_SIZE &&
                mouseY <= (btn.y+btn.height)*GRID_SIZE
            ) {
                if (typeof btn.onClick === 'function') btn.onClick();
            }
        }
    }

    mouseDown = false;
    _touchCaptured = false;
}, { passive: false });
window.addEventListener("touchcancel", (e) => {
    dragging = false;
    mouseDown = false;
    _touchCaptured = false;
}, { passive: false });

