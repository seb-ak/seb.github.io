import { Camera } from './projectionModule.js';
import { mapObjects } from './map.js';

const WIDTH = 256 / 1;
const HEIGHT = 144 / 1;

let objects = [];
let dots = [];
class object {
    constructor(x = 0, y = 0, z = 0, colour = { r: 0, g: 0, b: 0, a: 0 }, name = "object", size = { x: 1, y: 1, z: 1 }) {
        this.location = {
            x: x,
            y: y,
            z: z
        }
        this.rotation = {
            x: 0,
            y: 0,
            z: 0
        }
        this.size = size
        this.colour = colour
        this.name = name
    }

    distanceTo(other) {
        return Math.sqrt(
            Math.pow(this.location.x - other.location.x, 2) +
            Math.pow(this.location.y - other.location.y, 2) +
            Math.pow(this.location.z - other.location.z, 2)
        );
    }
}


class dot extends object {
    constructor(x, y, z) {
        super(x, y, z, { r: 255, g: 0, b: 0, a: 0 }, "dot", { x: 0.1, y: 0.1, z: 0.1 });
    }
}

function raycast(origin, rotation, objects) {

    const direction = {
        x: Math.cos(rotation.y) * Math.cos(rotation.x),
        y: Math.sin(rotation.x),
        z: Math.sin(rotation.y) * Math.cos(rotation.x)
    };

    let closestHit = null;
    let closestDistance = Infinity;

    objects.forEach((obj) => {
        // Check if the ray intersects with the cube
        const hit = intersectRayWithCube(origin, direction, obj);

        if (hit) {
            const distance = Math.sqrt(
                Math.pow(hit.x - origin.x, 2) +
                Math.pow(hit.y - origin.y, 2) +
                Math.pow(hit.z - origin.z, 2)
            );

            if (distance < closestDistance) {
                closestDistance = distance;
                closestHit = { object: obj, location: hit };
            }
        }
    });

    return closestHit;
}

function intersectRayWithCube(origin, direction, cube) {
    const tMin = {
        x: (cube.location.x - origin.x) / direction.x,
        y: (cube.location.y - origin.y) / direction.y,
        z: (cube.location.z - origin.z) / direction.z,
    };

    const tMax = {
        x: (cube.location.x + cube.size.x - origin.x) / direction.x,
        y: (cube.location.y + cube.size.y - origin.y) / direction.y,
        z: (cube.location.z + cube.size.z - origin.z) / direction.z,
    };

    const t1 = {
        x: Math.min(tMin.x, tMax.x),
        y: Math.min(tMin.y, tMax.y),
        z: Math.min(tMin.z, tMax.z),
    };

    const t2 = {
        x: Math.max(tMin.x, tMax.x),
        y: Math.max(tMin.y, tMax.y),
        z: Math.max(tMin.z, tMax.z),
    };

    const tNear = Math.max(t1.x, t1.y, t1.z);
    const tFar = Math.min(t2.x, t2.y, t2.z);

    if (tNear > tFar || tFar < 0) {
        return null; // No intersection
    }

    // Calculate the intersection point
    return {
        x: origin.x + tNear * direction.x,
        y: origin.y + tNear * direction.y,
        z: origin.z + tNear * direction.z,
    };
}

// CREATE MAP
mapObjects.forEach(obj => {
    const size =  {
        x: obj.size[0],
        y: obj.size[1],
        z: obj.size[2]
    }
    const cube = new object(
        obj.position[0],
        obj.position[1],
        obj.position[2], { r: 255, g: 255, b: 255, a: 255 },
        "floor",
        size
    );
    objects.push(cube);
})

const camera = new Camera(WIDTH, HEIGHT, 3, 1, 3);
camera.velocity = { x: 0, y: 0, z: 0 }

function playerColliding(camera, map) {
    const player = {
        size: {
            x: 0.7,
            y: camera.offset.y,
            z: 0.7
        },
        location: {
            x: camera.location.x - 0.7 / 2,
            y: camera.location.y,
            z: camera.location.z - 0.7 / 2
        },
    };

    for (const cube of map) {
        if (cubeCollideCube(player, cube)) {
            return true;
        }
    }

    return false;
}

function cubeCollideCube(a, b) {
    // X
    const xOverlap = a.location.x < b.location.x + b.size.x &&
                     a.location.x + a.size.x > b.location.x;

    // Y
    const yOverlap = a.location.y < b.location.y + b.size.y &&
                     a.location.y + a.size.y > b.location.y;

    // Z
    const zOverlap = a.location.z < b.location.z + b.size.z &&
                     a.location.z + a.size.z > b.location.z;

    return xOverlap && yOverlap && zOverlap;
}

document.addEventListener('DOMContentLoaded', () => {
    // Create the low-resolution canvas
    const sourceCanvas = document.createElement('canvas');
    const sourceCtx = sourceCanvas.getContext('2d');
    sourceCanvas.width = WIDTH;
    sourceCanvas.height = HEIGHT;

    // Get the high-resolution display canvas
    const displayCanvas = document.getElementById('screen');
    const displayCtx = displayCanvas.getContext('2d');
    const upscaleFactor = 10; // Scale by 10x
    displayCanvas.width = sourceCanvas.width * upscaleFactor;
    displayCanvas.height = sourceCanvas.height * upscaleFactor;
    displayCtx.imageSmoothingEnabled = false;


    // FPS
    const fpsDisplay = document.getElementById('fpsDisplay');
    let lastTime = performance.now();
    let frameCount = 0;
    let fps = 0;

    function updateFPS() {
        const currentTime = performance.now();
        frameCount++;
        if (currentTime - lastTime >= 1000) {
            fps = frameCount;
            frameCount = 0;
            lastTime = currentTime;
            fpsDisplay.textContent = `FPS: ${fps} dots: ${dots.length}`;
        }
    }

    // IMAGE
    const imageData = sourceCtx.createImageData(sourceCanvas.width, sourceCanvas.height);

    function setPixel(x, y, r, g, b, a) {
        const index = (y * sourceCanvas.width + x) * 4; // Calculate pixel index
        imageData.data[index] = r; // Red
        imageData.data[index + 1] = g; // Green
        imageData.data[index + 2] = b; // Blue
        imageData.data[index + 3] = a; // Alpha
    }

    function fadeImage(amount) {
        for (let i = 0; i < imageData.data.length; i += 4) {
            imageData.data[i + 3] -= amount; // Alpha
        }
    }

    function clearImage() {
        for (let i = 0; i < imageData.data.length; i += 4) {
            imageData.data[i] = 0; // Red
            imageData.data[i + 1] = 0; // Green
            imageData.data[i + 2] = 0; // Blue
            imageData.data[i + 3] = 0; // Alpha
        }
    }

    function loop() {
        //INPUTS
        const baseMovementSpeed = 0.005;
        let friction = 0.8
        if (!camera.isOnFloor) {
            friction = 0.6
        }
        const gravity = 0.001

        let movementSpeed = baseMovementSpeed 
        if (keys[`ShiftLeft`]) {
            movementSpeed *= 0.2
            camera.offset.y = 0.7
        } else {
            camera.offset.y = 2
        }
        if (keys[`Space`] && camera.isOnFloor && !keys[`ShiftLeft`]) {
            camera.velocity.y = 0.06
        }

        const forward = keys['KeyW'] - keys['KeyS'];
        const strafe = keys['KeyD'] - keys['KeyA'];
        const sin = Math.sin(camera.rotation.y);
        const cos = Math.cos(camera.rotation.y);

        camera.velocity.x += (forward * sin + strafe * cos) * movementSpeed;
        camera.velocity.z += (forward * cos - strafe * sin) * movementSpeed;

        camera.velocity.x *= friction
        camera.velocity.y -= gravity
        camera.velocity.z *= friction

        // MOVE
        camera.location.x += camera.velocity.x
        if (playerColliding(camera, objects)) {
            camera.location.x -= camera.velocity.x
            camera.velocity.x = 0
        }

        camera.location.y += camera.velocity.y
        if (playerColliding(camera, objects)) {
            camera.location.y -= camera.velocity.y
            camera.velocity.y = 0

            camera.isOnFloor = true
        } else camera.isOnFloor = false

        camera.location.z += camera.velocity.z
        if (playerColliding(camera, objects)) {
            camera.location.z -= camera.velocity.z
            camera.velocity.z = 0
        }

        // SPAWN DOTS
        if (clicking[2]) {
            const dotSpread = 50 / (180 / Math.PI)
            let rotation = {}
            rotation.x = -camera.rotation.x + ((Math.random() - 0.5) * dotSpread)
            rotation.y = 90/(180 / Math.PI) - camera.rotation.y + ((Math.random() - 0.5) * dotSpread)

            const loc = {
                x: camera.location.x + camera.offset.x,
                y: camera.location.y + camera.offset.y,
                z: camera.location.z + camera.offset.z
            }

            const hit = raycast( loc, rotation, objects );
            if (hit) dots.push(new dot(hit.location.x, hit.location.y, hit.location.z));
        }

        // SPAWN LOTS OF DOTS
        if (keys[`KeyE`]) {
            for (let i=0; i<30; i++) {
                const dotSpread = 360 / (180 / Math.PI)
                let rotation = {}
                rotation.x = -camera.rotation.x + ((Math.random() - 0.5) * dotSpread)
                rotation.y = 90/(180 / Math.PI) - camera.rotation.y + ((Math.random() - 0.5) * dotSpread)

                const loc = {
                    x: camera.location.x + camera.offset.x,
                    y: camera.location.y + camera.offset.y,
                    z: camera.location.z + camera.offset.z
                }

                const hit = raycast( loc, rotation, objects );
                if (hit) dots.push(new dot(hit.location.x, hit.location.y, hit.location.z));
            }
        }

        updateFPS();
        fadeImage(50);
        // clearImage();

        // render 3d
        const dotsToRender = [ ...dots]

        const dots3d = dotsToRender.map((d) => d.location);
        const dots2d = camera.projectPoints(dots3d)

        for (const d of dots2d) {
            if (!d.render || d.x < 0 || d.x >= WIDTH || d.y < 0 || d.y >= HEIGHT) {
                continue;
            }

            const i = dots2d.indexOf(d)
            const dist = 20 - dotsToRender[i].distanceTo(camera)
            setPixel(Math.floor(d.x), Math.floor(d.y), 255, 255, 255, dist*30 + 10);
        }


        // render hud
        setPixel(WIDTH/2, HEIGHT/2, 255, 255, 255, 255);



        // PUT IMAGE ON CANVAS
        sourceCtx.putImageData(imageData, 0, 0);

        // Upscale the source canvas to the display canvas
        displayCtx.clearRect(0, 0, displayCanvas.width, displayCanvas.height);
        displayCtx.drawImage(
            sourceCanvas,
            0, 0, sourceCanvas.width, sourceCanvas.height, // Source dimensions
            0, 0, displayCanvas.width, displayCanvas.height // Destination dimensions
        );

        requestAnimationFrame(loop); // Loop the animation
    }


    // window.addEventListener('beforeunload', (event) => {
    //     event.preventDefault();
    //     event.returnValue = ''; // Display a confirmation dialog
    // });



    let clicking = [false, false, false];
    displayCanvas.addEventListener('mousedown', (event) => {
        clicking[event.button] = true;
    });
    displayCanvas.addEventListener('mouseup', (event) => {
        clicking[event.button] = false;
    });

    // Request pointer lock when the canvas is clicked
    displayCanvas.addEventListener('click', () => {
        displayCanvas.requestPointerLock();
    });

    // Listen for pointer lock changes
    document.addEventListener('pointerlockchange', () => {
        if (document.pointerLockElement === displayCanvas) {
            console.log("Pointer locked");
        } else {
            console.log("Pointer unlocked");
        }
    });

    // Update mouse movement handling to use relative movement when pointer is locked
    displayCanvas.addEventListener('mousemove', (event) => {
        if (document.pointerLockElement === displayCanvas) {
            const deltaX = event.movementX;
            const deltaY = event.movementY;

            camera.rotation.y += deltaX * 0.01;
            camera.rotation.x += deltaY * 0.01;

            camera.rotation.x = Math.max(-Math.PI / 2 +0.01, Math.min(Math.PI / 2 -0.01, camera.rotation.x));
        }
    });



    // Prevent context menu on right-click
    displayCanvas.addEventListener('contextmenu', (event) => {
        event.preventDefault();
    });


    let keys = { KeyA:false, KeyD:false, KeyW:false, KeyS:false, Space:false, ShiftLeft:false, ControlLeft:false, KeyE:false};
    document.addEventListener('keydown', (event) => {
        keys[event.code] = true;
        if (event.ctrlKey) {
            event.preventDefault();
        }
    });
    document.addEventListener('keyup', (event) => {
        keys[event.code] = false;
    });

    loop();
});