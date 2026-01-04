Coloris({
  el: '#colour',
  theme: 'polaroid',
  themeMode: 'dark',
  alpha: false,
  lockScroll: true,
  disableSelection: true,
  onChange: (color, inputEl) => {
    //console.log(`The new color is ${color}`);
  }
});


class Tank {
    constructor(values) {
        this.type = "Tank"
        this.id = values.id
        this.x = values.x
        this.y = values.y
        this.rotation = values.rotation
        this.name = values.name
        this.colour = values.colour
        this.visible = values.visible

        this.lives = values.lives
        this.health = values.health

        this.maxHealth = values.health
        this.upgrades = {}

        this.newData = {}

        this.div = {}

        const screen = document.getElementById("screen");

        this.div.tank = document.createElement("div");
        this.div.tank.className = "Tank";
        this.div.tank.style.backgroundColor = this.colour;
        screen.appendChild(this.div.tank);

        this.div.turret = document.createElement("div");
        this.div.turret.className = "Turret";
        this.div.turret.style.backgroundColor = this.colour;
        this.div.tank.appendChild(this.div.turret);

        this.div.nameTag = document.createElement("div");
        this.div.nameTag.className = "nameTag"
        this.updateNameTag()

        screen.appendChild(this.div.nameTag);
    }

    updateNameTag() {
        this.div.nameTag.innerText = `${this.name} ${"♡".repeat(this.lives)}\n${this.health}/${this.maxHealth}hp`;
        
        // if (this.newData.upgrades) {
        //     this.div.nameTag.innerText += `\n \n \n \n \n Upgrades\n`

        //     for (const [upgrade, amount] of Object.entries(this.upgrades)) {
        //         if (amount === 0) continue;
        //         this.div.nameTag.innerText += `+${amount} ${upgrade}`
        //     }
        // }
    }

    updateDiv(interval) {
        if (this.newData.visible) {
            this.div.tank.style.visibility = "visible";
            this.div.nameTag.style.visibility = "visible";
        }
        else {
            this.div.tank.style.visibility = "hidden";
            this.div.nameTag.style.visibility = "hidden";
        }

        if (!this.newData.y) return

        this.div.tank.animate([
            { 
                transform: `rotate(${this.rotation}deg)`,
                top: `${this.y -2.5}vw`,
                left: `${this.x -2.5}vw`
            },
            {
                transform: `rotate(${this.newData.rotation}deg)`,
                top: `${this.newData.y -2.5}vw`,
                left: `${this.newData.x -2.5}vw`
            }
        ], {duration: interval, fill: "forwards"})

        this.div.nameTag.animate([
            { 
                top: `${this.y - 10}vw`,
                left: `${this.x}vw`
            },
            {
                top: `${this.newData.y - 10}vw`,
                left: `${this.newData.x}vw`
            }
        ], {duration: interval, fill: "forwards"})

        this.x = this.newData.x
        this.y = this.newData.y
        this.rotation = this.newData.rotation

        this.visible = this.newData.visible
        this.lives = this.newData.lives
        this.health = this.newData.health
        this.upgrades = this.newData.upgrades
        this.wins = this.newData.wins

        this.updateNameTag()

        this.maxHealth = Math.max(this.health, this.maxHealth)
    }
}

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
                transform: `rotate(${this.rotation}deg)`,
                top: `${this.y -0.75}vw`,
                left: `${this.x -1}vw`
            },
            {
                transform: `rotate(${this.newData.rotation}deg)`,
                top: `${this.newData.y -0.75}vw`,
                left: `${this.newData.x -1}vw`
            }
        ], {duration: interval, fill: "forwards"})

        this.x = this.newData.x
        this.y = this.newData.y
        this.rotation = this.newData.rotation
    }

}

class Mine {
    constructor(values) {
        this.type = "Mine"
        this.id = values.id
        this.x = values.x
        this.y = values.y
        this.radius = values.radius
        this.colour = values.colour

        this.newData = {}

        const screen = document.getElementById("screen");

        this.div = document.createElement("div")
        this.div.className = "Mine";
        this.div.style.backgroundColor = this.colour;
        this.div.style.width = `${this.radius}vw`;
        this.div.style.height = `${this.radius}vw`;

        // this.div.style.transform = ``,
        this.div.style.top = `${this.y - this.radius/2}vw`,
        this.div.style.left = `${this.x - this.radius/2}vw`

        screen.appendChild(this.div);
    }

    updateDiv(interval) {}

}

class Main {
    constructor() {
        this.myId = Math.random().toString(16).slice(2);

        this.inputs;
        this.keydown = {left:false, right:false, forward:false, backward:false, primary:false, secondary:false, a:false, b:false, c:false}

        this.objects = {}
        this.map = []
        this.currentMapStr = null;

        this.hostId = undefined;
        this.gameState = "";
        this.abc = ["","",""];
        this.topText = "";

        this.name = this.myId;
        this.colour = "#050c69ff";

        this.interval = 50;
        this.screen = document.getElementById("screen");

        this.controlls = {
            game: document.getElementById("game"),
            lobby: document.getElementById("lobby"),
            text: document.getElementById("text"),
            topText: document.getElementById("topText"),
        }

        this.isPlaying = false;

        this.ws
        
        requestAnimationFrame(this.updateInputs.bind(this));
    }


    updateInputs() {
        let send = false
        for (const buttonId of ["left", "right", "forward", "backward", "primary", "secondary", "a", "b", "c"]) {
            const button = document.getElementById(buttonId);
            const r = button.getBoundingClientRect();

            button.style.opacity = 0.3;
            if (this.inputs[buttonId]!==0) {
                this.inputs[buttonId] = 0;
                send = true
            }

            for (const pointer of getPointerDownLocations()) {
                if (
                    pointer.x >= r.left &&
                    pointer.x <= r.right &&
                    pointer.y >= r.top &&
                    pointer.y <= r.bottom
                ) {
                    this.inputs[buttonId] = Date.now() + this.interval;
                    button.style.opacity = 0.5;
                    send = true
                    break;
                }
            }
        }
        
        if (send) { this.wsSendInputs(); }
        requestAnimationFrame(this.updateInputs.bind(this));
    }



    wsStart(url) {
        this.inputs = {id:this.myId, name:this.name, colour:this.colour, left:0, right:0, forward:0, backward:0, primary:0, secondary:0, a:0, b:0, c:0}

        this.ws = new WebSocket(url);
        this.ws.onopen = () => {
            this.wsSendInputs();
            setInterval(() => { this.wsSendInputs(); }, 4000);
        };
        this.ws.onmessage = async (e) => {
            const text = (typeof e.data === 'string') ? e.data : await e.data.text();
            const data = JSON.parse(text);

            this.decodeData(data);

            this.updateScreen();
        };
        this.ws.onclose = () => {
            leaveServer("Server not reachable. please try again");
        }
    }
    
    wsSendInputs() {
        if (!this.ws || this.ws.readyState !== WebSocket.OPEN) return;

        this.ws.send(JSON.stringify(this.inputs));
    }

    decodeData(data) {
        for (const [id, values] of Object.entries(data)) {
            if (id=="Main") {
                this.map = values.map
                this.hostId = values.hostId
                this.gameState = values.gameState
                this.abc = values.abc
                this.topText = values.topText
                continue;
            }

            if (values.dead) {
                if (!this.objects[id]) continue;

                const div = this.objects[id].div;
                div.parentNode.removeChild(div);

                delete this.objects[id];
                continue;
            }

            if (id == this.myId && values.afk) {
                leaveServer("You timed out. Please reconnect")
            }
            
            if (!this.objects[id]) {
                switch (values.type) {
                    case "Tank":
                        this.objects[id] = new Tank(values); break;
                    case "Projectile":
                        this.objects[id] = new Projectile(values); break;
                    case "Mine":
                        this.objects[id] = new Mine(values); break;
                    default:
                        break;
                }
            }
            this.objects[id].newData = values
        }
    }

    setABC(text) {
        for (const i of [0,1,2]) {
            this.controlls.lobby.children[i].textContent = text[i]
            this.controlls.lobby.children[i].style.visibility = text[i]===""? "hidden":"inherit"
        }
    }

    updateScreen() {

        // move objects
        for (const obj of Object.values(this.objects)) {
            obj.updateDiv(this.interval);
        }

        // move screen
        if (this.map.length > 20 || this.map[0].length > 20) {
            this.screen.animate([
                {
                    top: this.screen.style.top,
                    left: this.screen.style.left
                },
                {
                    top:  `${50 - this.objects[this.myId].y}vw`,
                    left: `${50 - this.objects[this.myId].x}vw`
                }
            ], {duration: this.interval, fill: "forwards"})
        } else {
            this.screen.style.top = "0"
            this.screen.style.left = "0"
        }

        // update map
        const mapStr = JSON.stringify(this.map);
        if (mapStr !== this.currentMapStr) {
            this.createMap();
            this.currentMapStr = mapStr;
        }

        // update controlls
        // a b c buttons
        if (
            this.gameState === "lobby" || 
            (this.gameState === "shop" && !this.objects[this.myId].newData.gotUpgrade && this.abc[0]!=="")
        ) {
            this.controlls.lobby.style.visibility = "visible"

            if (this.gameState === "shop") { this.setABC(this.abc); }
            else {
                if (this.hostId == this.myId) { this.setABC(["","Start Game",""]); }
                else { this.setABC(["","waiting for host",""]); }
            }
        }
        else { this.controlls.lobby.style.visibility = "hidden" }

        // tank movement controlls
        if (this.gameState === "game") { this.controlls.game.style.visibility = "visible" }
        else { this.controlls.game.style.visibility = "hidden" }

        // text
        if (
            (this.gameState === "game" && this.objects[this.myId].lives <= 0) || 
            (this.gameState === "shop" && this.objects[this.myId].newData.gotUpgrade)
        ) {
            this.controlls.text.style.visibility = "visible"
            if (this.gameState === "game" && this.objects[this.myId].lives <= 0) {
                this.controlls.text.innerText = "you died\nwaiting for round to end"
            } else if (this.gameState === "shop" && this.objects[this.myId].newData.gotUpgrade) {
                this.controlls.text.innerText = `Your wins: ${this.objects[this.myId].wins}\nYour Upgrades:\n`

                for (const [upgrade, amount] of Object.entries(this.objects[this.myId].upgrades)) {
                    if (amount === 0) continue;
                    this.controlls.text.innerText += `+${amount} ${upgrade}\n`
                }
            }

        }
        else { this.controlls.text.style.visibility = "hidden" }

        // toptext
        this.controlls.topText.innerText = this.topText
    }

    createMap() {
        const walls = document.getElementsByClassName("Wall");
        while (walls.length > 0) {
            walls[0].parentNode.removeChild(walls[0]);
        }
        console.log("Creating map");
        const wallContainer = document.getElementById("wallContainer")
        for (let y = 0; y < this.map.length; y++) {
            for (let x = 0; x < this.map[y].length; x++) {
                const tile = this.map[y][x];
                if (tile !== "#") continue;
                
                const div = document.createElement("div");
                div.className = "Wall";
                div.style.top = `${y*5}vw`;
                div.style.left = `${x*5}vw`;
                wallContainer.appendChild(div);
            }
        }
    }
}

let main

const joinForm = document.getElementById('joinForm');
joinForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const nameInput = document.getElementById('name');
    const colInput = document.getElementById('colour');
    const wsInput = document.getElementById('ws');
    const url = (wsInput && wsInput.value) ? wsInput.value.trim() : '';
    const name = (nameInput && nameInput.value) ? nameInput.value.trim() : '';
    const colour = (colInput && colInput.value) ? colInput.value.trim() : "#" + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0');
    
    if (!url) { alert('Please enter a server URL'); return; }

    checkWebSocket(url)
    .then(() => {
        joinServer(url, name, colour);
    })
    .catch(() => {
        leaveServer("Server not reachable");
    });
});

function joinServer(url, name, colour) {
    main = new Main();
    main.name = name;       localStorage.setItem('name', name);
    main.colour = colour;   localStorage.setItem('colour', colour);
    main.isPlaying = true;  
    main.wsStart(url);      localStorage.setItem('url', url);

    document.getElementById('menu').style.visibility = "hidden";
    document.getElementById('menuContainer').style.visibility = "hidden";
    document.getElementById('error').innerText = ""

    activePointers = new Map();

    const thisurl = new URL(location.href);
    thisurl.searchParams.set("s", url);
    history.replaceState(null, "", thisurl);
}

function checkWebSocket(url, timeout = 3000) {
    return new Promise((resolve, reject) => {
        let done = false;
        const ws = new WebSocket(url);

        const timer = setTimeout(() => {
            if (done) return;
            done = true;
            ws.close();
            reject(new Error("Timeout"));
        }, timeout);

        ws.onopen = () => {
            if (done) return;
            done = true;
            clearTimeout(timer);
            ws.close();
            resolve(true);
        };

        ws.onerror = () => {
            if (done) return;
            done = true;
            clearTimeout(timer);
            reject(new Error("Connection failed"));
        };
    });
}

function leaveServer(reason) {
    document.getElementById('error').innerText = reason
    
    document.getElementById('menu').style.visibility = "visible";
    document.getElementById('menuContainer').style.visibility = "visible";
    main = undefined

    document.getElementById('screen').innerHTML = '<div id="wallContainer"></div>'
    document.getElementById("topText").innerText = ""

    // alert(reason);
}

{
    const name = localStorage.getItem('name');
    const colour = localStorage.getItem('colour');
    let url = localStorage.getItem('url');
    
    const thisurl = new URL(location.href);
    const s = thisurl.searchParams.get("s");
    if (s) { url = s; }
    
    if (name) { document.getElementById('name').value = name; }
    if (colour) { document.getElementById('colour').value = colour; }
    else { document.getElementById('colour').value = `#${Math.floor(Math.random() * 0xffffff).toString(16).padStart(6, "0")}`; }
    if (url) { document.getElementById('ws').value = url; }
}

let clicking = false




let activePointers = new Map();

window.addEventListener("pointerdown", e => {
    if (!main) return
    e.preventDefault()
    activePointers.set(e.pointerId, {
        x: e.clientX,
        y: e.clientY,
        type: e.pointerType
    });
});

window.addEventListener("pointermove", e => {
    if (!main) return
    e.preventDefault()
    if (activePointers.has(e.pointerId)) {
        activePointers.set(e.pointerId, {
            x: e.clientX,
            y: e.clientY,
            type: e.pointerType
        });
    }
});

window.addEventListener("pointerup", removePointer);
window.addEventListener("pointercancel", removePointer);

function removePointer(e) {
    if (!main) return
    e.preventDefault()
    activePointers.delete(e.pointerId);
}

/* Get list of all current down locations */
function getPointerDownLocations() {
    return Array.from(activePointers.values());
}


document.addEventListener('gesturestart', function(e) {
    if (!main) return
    e.preventDefault();
});

document.addEventListener('touchmove', function(e) {
    if (!main) return
    e.preventDefault();
}, { passive: false });

// Prevent context menu / long-press menu while playing (mobile)
window.addEventListener('contextmenu', function(e) {
    if (!main) return;
    e.preventDefault();
});
