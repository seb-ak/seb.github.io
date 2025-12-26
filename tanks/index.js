class Projectile {
    constructor(values) {
        this.type = "Projectile"
        this.id = values.id
        this.x = values.x
        this.y = values.y
        this.rotation = values.rotation
        this.colour = values.colour

        this.newData = {}

        const screen = document.getElementById("screen");

        this.div = document.createElement("div")
        this.div.className = "Projectile";
        this.div.style.backgroundColor = this.colour;
        screen.appendChild(this.div);
    }

    updateDiv(interval) {
        this.div.animate([
            { 
                transform: `translate(-1vw, -1vw) rotate(${this.rotation}deg)`,
                top: `${this.y}vw`,
                left: `${this.x}vw`
            },
            {
                transform: `translate(-1vw, -1vw) rotate(${this.newData.rotation}deg)`,
                top: `${this.newData.y}vw`,
                left: `${this.newData.x}vw`
            }
        ], {duration: interval, fill: "forwards"})
        
        this.x = this.newData.x
        this.y = this.newData.y
        this.rotation = this.newData.rotation
    }

}

class Tank {
    constructor(values) {
        this.type = "Tank"
        this.id = values.id
        this.x = values.x
        this.y = values.y
        this.rotation = values.rotation
        this.name = values.name
        this.colour = values.colour
        
        this.newData = {}

        this.div = {}

        const screen = document.getElementById("screen");

        this.div.tank = document.createElement("div")
        this.div.tank.className = "Tank";
        this.div.tank.style.backgroundColor = this.colour;
        this.div.tank.innerText = this.name;
        screen.appendChild(this.div.tank);

        this.div.turret = document.createElement("div")
        this.div.turret.className = "Turret";
        this.div.turret.style.backgroundColor = this.colour;
        this.div.tank.appendChild(this.div.turret);
    }

    updateDiv(interval) {
        this.div.tank.animate([
            { 
                transform: `translate(-2.5vw, -2.5vw) rotate(${this.rotation}deg)`,
                top: `${this.y}vw`,
                left: `${this.x}vw`
            },
            {
                transform: `translate(-2.5vw, -2.5vw) rotate(${this.newData.rotation}deg)`,
                top: `${this.newData.y}vw`,
                left: `${this.newData.x}vw`
            }
        ], {duration: interval, fill: "forwards"})

        this.x = this.newData.x
        this.y = this.newData.y
        this.rotation = this.newData.rotation
    }
}

class Main {
    constructor() {
        this.myId = Math.random().toString(16).slice(2);

        this.iputs;
        this.keydown = {left:false, right:false, forward:false, backward:false, primary:false, secondary:false}

        this.objects = {}
        this.map = []
        this.currentMap = null;

        this.name = this.myId;
        this.colour = "#050c69ff";

        this.interval = 50;
        this.screen = document.getElementById("screen");

        this.isPlaying = false;

        function bindInput(element, key) {
            const down = (e) => {
                // e.preventDefault();
                this.inputs[key] = Date.now() + 1000*60*60;
                this.keydown[key] = true;
                this.wsSendInputs();
            };
            
            const up = () => {
                if (!this.keydown[key]) return;
                this.inputs[key] = Date.now() + this.interval;
                this.keydown[key] = false;
                this.wsSendInputs();
            };
            
            element.addEventListener("pointerdown", down);
            element.addEventListener("pointerup", up);
            element.addEventListener("pointerleave", up);
            element.addEventListener("pointercancel", up);

            window.addEventListener("keydown", (e) => {
                if (e.repeat) return;
                if (key === "left" && (e.key === "ArrowLeft" || e.key === "a")) down(e);
                if (key === "right" && (e.key === "ArrowRight" || e.key === "d")) down(e);
                if (key === "forward" && (e.key === "ArrowUp" || e.key === "w")) down(e);
                if (key === "backward" && (e.key === "ArrowDown" || e.key === "s")) down(e);
                if (key === "primary" && e.key === " ") down(e);
                if (key === "secondary" && e.key === "Shift") down(e);
            });

            window.addEventListener("keyup", (e) => {
                if (key === "left" && (e.key === "ArrowLeft" || e.key === "a")) up();
                if (key === "right" && (e.key === "ArrowRight" || e.key === "d")) up();
                if (key === "forward" && (e.key === "ArrowUp" || e.key === "w")) up();
                if (key === "backward" && (e.key === "ArrowDown" || e.key === "s")) up();
                if (key === "primary" && e.key === " ") up();
                if (key === "secondary" && e.key === "Shift") up();
            });
        }
        for (const btn of ["left", "right", "forward", "backward", "primary", "secondary"]) {
            bindInput.call(this, document.getElementById(btn), btn);
        }

        this.ws
    }

    wsStart(url) {
        this.inputs = {id:this.myId, name:this.name, colour:this.colour, left:0, right:0, forward:0, backward:0, primary:0, secondary:0}

        this.ws = new WebSocket(url);
        this.ws.onopen = () => {
            this.wsSendInputs();
        };
        this.ws.onmessage = async (e) => {
            const text = (typeof e.data === 'string') ? e.data : await e.data.text();
            const data = JSON.parse(text);

            this.decodeData(data);

            this.updateScreen();
        };
    }
    
    wsSendInputs() {
        if (!this.ws || this.ws.readyState !== WebSocket.OPEN) return;

        this.ws.send(JSON.stringify(this.inputs));
    }

    decodeData(data) {
        for (const [id, values] of Object.entries(data)) {
            if (id=="Main") {
                this.map = values["map"]
                continue;
            }

            if (values.dead) {
                if (!this.objects[id]) continue;

                const div = this.objects[id].div;
                div.parentNode.removeChild(div);

                delete this.objects[id];
                continue;
            }

            if (!this.objects[id]) {
                if (values["type"]=="Tank") { this.objects[id] = new Tank(values) }
                else if (values["type"]=="Projectile") { this.objects[id] = new Projectile(values) }
            }
            this.objects[id].newData = values
        }
    }

    updateScreen() {
        for (const obj of Object.values(this.objects)) {
            obj.updateDiv(this.interval);
        }
        if (this.map != this.currentMap) {
            this.createMap();
            this.currentMap = this.map;
        }
    }

    createMap() {
        const walls = document.getElementsByClassName("Wall");
        while (walls.length > 0) {
            walls[0].parentNode.removeChild(walls[0]);
        }
        console.log("Creating map");
        for (let y = 0; y < this.map.length; y++) {
            for (let x = 0; x < this.map[y].length; x++) {
                const tile = this.map[y][x];
                if (tile !== "#") continue;
                
                const div = document.createElement("div");
                div.className = "Wall";
                div.style.top = `${y*5}vw`;
                div.style.left = `${x*5}vw`;
                this.screen.appendChild(div);
            }
        }
    }
}

let main

const joinForm = document.getElementById('joinForm');
joinForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const nameInput = document.getElementById('name');
    const wsInput = document.getElementById('ws');
    const url = (wsInput && wsInput.value) ? wsInput.value.trim() : '';
    const name = (nameInput && nameInput.value) ? nameInput.value.trim() : '';
    if (!url) { alert('Please enter a server URL'); return; }

    main = new Main();
    main.name = name
    main.colour = "#" + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0');
    main.isPlaying = true;
    main.wsStart(url);

    const menu = document.getElementById('menu');
    if (menu) menu.style.display = 'none';
});

