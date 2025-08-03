class Console {
    constructor() {
        this.camera = {
            x: 0,
            y: 0,
            targetx: 0,
            targety: 0,
            shake: 0,
            zoom: 0.7,
        };
        this.screen = {
            width: 320,
            height: 240,
            world: [],
            ui: [],
        };

        this.button = {
            a: false,
            b: false,
            select: false,
            start: false,
            arrowup: false,
            arrowdown: false,
            arrowleft: false,
            arrowright: false,
        };

        this.joystick = {
            rotation: 0,
            w: false, a: false, s: false, d: false,
        };

        this.#chars = {
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

        this.canvas = document.getElementById("gameCanvas");
        this.ctx = this.canvas.getContext("2d");

        this.setupControls();

        window.addEventListener("resize", this.resizeCanvas);
        this.resizeCanvas();
    }

    #chars
    Text(text, x, y, fontSize=5, center=false) {
        if (center) x -= text.length * fontSize*1.5 / 2
        if (center) y -= fontSize / 2

        let ret = []

        for (let char of text.toUpperCase()) {
            
            if (!this.#chars[char]) char=" "

            let cRet = []

            for (const point of this.#chars[char]) {
                cRet.push({x:x + point.x*fontSize, y:y - point.y*fontSize})
            }

            ret.push(cRet)

            x+=fontSize*1.5
        }
        return ret
    }
    Path(x, y, points, closed = true) {
        const path = [];
        for (const point of points) {
            path.push({ x: x + point.x, y: y + point.y });
        }
        if (closed) {
            path.push({ x: x + points[0].x, y: y + points[0].y });
        }
        return path;
    }
    Triangle(x, y, radius, rotation) {
        const rad = (rotation+0.001) * Math.PI / 180;

        const tip = {
            x: x + Math.cos(rad) * radius,
            y: y + Math.sin(rad) * radius
        };
        const left = {
            x: x + Math.cos(rad + Math.PI * 3 / 4) * radius,
            y: y + Math.sin(rad + Math.PI * 3 / 4) * radius
        };
        const right = {
            x: x + Math.cos(rad - Math.PI * 3 / 4) * radius,
            y: y + Math.sin(rad - Math.PI * 3 / 4) * radius
        };

        return [tip, left, right, tip, right]
    }

    clearScreen() {
        this.ctx.fillStyle = "#A4B334";
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.screen.world = []
        this.screen.ui = []
    }

    drawUI() {
        const scale = this.canvas.width / this.screen.width;

        for (const line of this.screen.ui) {
            this.ctx.beginPath();

            for (const point of line) {
                if (line.indexOf(point)===0) {
                    this.ctx.moveTo(
                        point.x * scale,
                        point.y * scale
                    );
                } else {
                    this.ctx.lineTo(
                        point.x * scale,
                        point.y * scale
                    );
                }
            }

            this.ctx.strokeStyle = "#2E5624";
            this.ctx.lineWidth = scale;
            this.ctx.stroke();
        }
    }
    drawWorld() {
        const scale = this.canvas.width / this.screen.width;

        for (const line of this.screen.world) {
            this.ctx.beginPath();

            for (const point of line) {
                if (line.indexOf(point)===0) {
                    this.ctx.moveTo(
                        this.worldToScreen(point.x, undefined) * scale,
                        this.worldToScreen(undefined, point.y) * scale
                    );
                } else {
                    this.ctx.lineTo(
                        this.worldToScreen(point.x, undefined) * scale,
                        this.worldToScreen(undefined, point.y) * scale
                    );
                }
            }

            this.ctx.strokeStyle = "#2E5624";
            this.ctx.lineWidth = scale;
            this.ctx.stroke();
        }
    }

    worldToScreen(px, py) {
        if (px) return (px - this.camera.x) * this.camera.zoom + this.screen.width/2;
        if (py) return (py - this.camera.y) * this.camera.zoom + this.screen.height/2;
    }



    playSound(name, pitchMin = 1, pitchMax = 1) {
        const audio = new Audio(`sounds/${name}.wav`);
        audio.currentTime = 0;
        audio.playbackRate = pitchMin + Math.random() * (pitchMax - pitchMin);
        audio.play();
    }
    resizeCanvas = () => {
        const width = window.innerWidth * 0.9;
        const height = Math.round(width * 0.75);
        this.canvas.style.width = width + "px";
        this.canvas.style.height = height + "px";
        this.canvas.width = width;
        this.canvas.height = height;
    }

    #joystick;
    #knob;
    #joyActive = false;
    joyMove = (e) => {
        if ((e.dx==undefined || e.dy==undefined) && !this.#joyActive) return;
        let touch = e.touches ? e.touches[0] : e;
        let rect = this.#joystick.getBoundingClientRect();
        let dx = touch.clientX - (rect.left + rect.width / 2);
        let dy = touch.clientY - (rect.top + rect.height / 2);
        
        if (e.dx || e.dy) {
            dx = e.dx
            dy = e.dy
        }

        const joySize = rect.width;
        const knobSize = this.#knob.offsetWidth;
        const maxDist = (joySize - knobSize) / 2;

        let dist = Math.min(Math.sqrt(dx * dx + dy * dy), maxDist);
        let angle = Math.atan2(dy, dx);
        let knobX = Math.cos(angle) * dist;
        let knobY = Math.sin(angle) * dist;

        this.#knob.style.left = ((joySize - knobSize) / 2 + knobX) + "px";
        this.#knob.style.top = ((joySize - knobSize) / 2 + knobY) + "px";

        this.joystick.rotation = angle * 180/Math.PI;
    }
    resetVirtualKeys = () => {
        this.joystick.rotation = NaN;
    }
    setupControls() {
        this.#joystick = document.getElementById("joystick");
        this.#knob = document.getElementById("joystick-knob");

        // Joystick Events
        this.#joystick.addEventListener("touchstart", e => { this.#joyActive = true; this.joyMove(e); this.vibrate(10); }, { passive: false });
        this.#joystick.addEventListener("touchmove", this.joyMove, { passive: false });
        this.#joystick.addEventListener("touchend", e => {
            this.#joyActive = false;
            this.#knob.style.left = "8vw";
            this.#knob.style.top = "8vw";
            this.resetVirtualKeys();
        }, { passive: false });

        this.#joystick.addEventListener("mousedown", e => { this.#joyActive = true; this.joyMove(e); this.vibrate(10); });
        window.addEventListener("mousemove", e => { if (this.#joyActive) this.joyMove(e); });
        window.addEventListener("mouseup", e => {
            if (this.#joyActive) {
                this.#joyActive = false;
                this.#knob.style.left = "8vw";
                this.#knob.style.top = "8vw";
                this.resetVirtualKeys();
            }
        });

        // A button
        const btnA = document.getElementById("btnA");
        btnA.addEventListener("touchstart", e => { this.button.a = true; this.vibrate(10); }, { passive: false });
        btnA.addEventListener("touchend", e => { this.button.a = false; }, { passive: false });
        btnA.addEventListener("mousedown", e => { this.button.a = true; this.vibrate(10); });
        btnA.addEventListener("mouseup", e => { this.button.a = false; });

        // B button
        const btnB = document.getElementById("btnB");
        btnB.addEventListener("touchstart", e => { this.button.b = true; this.vibrate(10); }, { passive: false });
        btnB.addEventListener("touchend", e => { this.button.b = false; }, { passive: false });
        btnB.addEventListener("mousedown", e => { this.button.b = true; this.vibrate(10); });
        btnB.addEventListener("mouseup", e => { this.button.b = false; });

        // SELECT
        const btnSelect = document.getElementById("select");
        btnSelect.addEventListener("touchstart", e => { this.button.select = true; this.vibrate(10); }, { passive: false });
        btnSelect.addEventListener("touchend", e => { this.button.select = false; }, { passive: false });
        btnSelect.addEventListener("mousedown", e => { this.button.select = true; this.vibrate(10); });
        btnSelect.addEventListener("mouseup", e => { this.button.select = false; });

        // START
        const btnStart = document.getElementById("start");
        btnStart.addEventListener("touchstart", e => { this.button.start = true; this.vibrate(10); }, { passive: false });
        btnStart.addEventListener("touchend", e => { this.button.start = false; }, { passive: false });
        btnStart.addEventListener("mousedown", e => { this.button.start = true; this.vibrate(10); });
        btnStart.addEventListener("mouseup", e => { this.button.start = false; });

        // Keyboard
        const keyboardInput = {
            "5": "b",
            "6": "a",
            "1": "select",
            "2": "start",
            "arrowup": "arrowup",
            "arrowdown": "arrowdown",
            "arrowleft": "arrowleft",
            "arrowright": "arrowright",
        }
        document.addEventListener("keydown", (e) => {
            const key = e.key.toLowerCase();
            if (keyboardInput[key] !== undefined) {
                this.button[keyboardInput[key]] = true;
            }
            this.updateArrowJoystick();
        });
        document.addEventListener("keyup", (e) => {
            const key = e.key.toLowerCase();
            if (keyboardInput[key] !== undefined) {
                this.button[keyboardInput[key]] = false;
            }
            this.updateArrowJoystick();
        });

    }

    updateArrowJoystick() {
        const dx = (this.button.arrowright ? 1 : 0) - (this.button.arrowleft ? 1 : 0);
        const dy = (this.button.arrowdown ? 1 : 0) - (this.button.arrowup ? 1 : 0);

        if (dx === 0 && dy === 0) {
            this.resetVirtualKeys();
            this.#knob.style.left = "8vw";
            this.#knob.style.top = "8vw";
            return;
        }

        this.joyMove({ dx: dx*100, dy: dy*100 });
    }

    vibrate(time) {
        // Uncomment if you want to enable vibration
        // if (navigator.vibrate) navigator.vibrate(time);
    }
}
export const gb = new Console();