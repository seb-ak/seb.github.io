const items = [
    {   title: "3d Renderer",
        subtitle: "",
        description: "A 3d renderer I made from scratch only using Java-   script. it can render obj files",
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
        description: "A local multiplayer pygame game with shaders to      give it a retro look",
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
        show: false,
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
        description: "A 3d horror game where you can only see dots from your flashlight",
        image: "Z-images/dots.png",
        link: {
            text: "Play now",
            url: "dots/",
        },
        index: 2,
        show: false,
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
        show: false,
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

const bg1 = '#02091aff'
const bg2 = '#01060fff'

class Box {
    constructor(x, y, width, height, content) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.content = content;

        this.border = 4

        this.colour = {
            bg: '#1f1b22ff',
            text: '#bcbfc2ff',
            outline: '#1e2949ff'
        }
    }

    draw(ctx) {
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
            this.x*GRID_SIZE + 6, this.y*GRID_SIZE + 18,
            this.content.description, 1
        )
    }

    string(x, y, str, size) {
        let dx = 0
        let dy = 0
        const height = 6
        const maxWidth = this.width*GRID_SIZE - this.border*4
        
        for (const chr of str) {
            if (dx >= maxWidth*(dy/height +1)) dy += height;
            dx += this.chr(x+dx%(maxWidth), y+dy, chr, size);
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
    new TitleBox(2, 2, 5, 3),

    new Box(0, 0, 4, 2, items[0]),
    new Box(5, 0, 4, 2, items[1]),
    new Box(3, 9, 4, 2, items[2]),
    new Box(1, 6, 4, 2, items[3]),
    new Box(5, 6, 4, 2, items[4]),
]


requestAnimationFrame(draw);
function draw() {
    WIDTH, canvas.width = Math.floor(window.innerWidth/2);
    HEIGHT, canvas.height = Math.floor(window.innerHeight);

    for (let y=0; y<WIDTH; y++) {
        for (let x=0; x<HEIGHT; x++) {
            ctx.fillStyle = (x+y)%2==0 ? bg1:bg2;
            ctx.fillRect(
                x*GRID_SIZE, y*GRID_SIZE,
                GRID_SIZE, GRID_SIZE
            );
        }
    }

    for (const b of boxes) {
        b.draw(ctx);
    }

    requestAnimationFrame(draw);
}