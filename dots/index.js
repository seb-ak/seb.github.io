import { Camera } from './projectionModule.js';
import { mapObjects } from './map.js';

const WIDTH = 256 / 2;
const HEIGHT = 144 / 2;

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

function raycast(origin, direction, objects) {
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
        x: (cube.location.x - cube.size.x / 2 - origin.x) / direction.x,
        y: (cube.location.y - cube.size.y / 2 - origin.y) / direction.y,
        z: (cube.location.z - cube.size.z / 2 - origin.z) / direction.z,
    };

    const tMax = {
        x: (cube.location.x + cube.size.x / 2 - origin.x) / direction.x,
        y: (cube.location.y + cube.size.y / 2 - origin.y) / direction.y,
        z: (cube.location.z + cube.size.z / 2 - origin.z) / direction.z,
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
    const cube = new object(
        obj.position[0],
        obj.position[1],
        obj.position[2], { r: 255, g: 255, b: 255, a: 255 },
        "floor",
        size = {
            x: obj.size[0],
            y: obj.size[1],
            z: obj.size[2]
        }
    );
    objects.push(cube);
})

const camera = new Camera(WIDTH, HEIGHT, 3, 3, 3);
camera.velocity = { x: 0, y: 0, z: 0 }



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
            fpsDisplay.textContent = `FPS: ${fps}`;
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
        const movementSpeed = 0.01;

        const forward = keys['KeyW'] - keys['KeyS'];
        const strafe = keys['KeyD'] - keys['KeyA'];
        const sin = Math.sin(camera.rotation.y);
        const cos = Math.cos(camera.rotation.y);

        camera.location.x += (forward * sin + strafe * cos) * movementSpeed;
        camera.location.z += (forward * cos - strafe * sin) * movementSpeed;

        console.log(camera.rotation.y * (180 / Math.PI))

        if (clicking[0]) {
            const dotSpread = 10
            let rotation = {...camera.rotation }
            rotation.x += (Math.random() - 0.5) * dotSpread
            rotation.y += (Math.random() - 0.5) * dotSpread

            const hit = raycast(camera.location, rotation, objects);

            dots.push(new dot(hit.location.x, hit.location.y, hit.location.z));
        }

        updateFPS();

        fadeImage(50);
        // clearImage();
        const dotsToRender = [...objects, ...dots]

        const dots3d = dotsToRender.map((d) => d.location);
        const dots2d = camera.projectPoints(dots3d)

        for (const d of dots2d) {
            if (!d.render) continue;
            const i = dots2d.indexOf(d)
            const dist = dotsToRender[i].distanceTo(camera) * 100
            setPixel(parseInt(d.x), parseInt(d.y), 255, 255, 255, dist);
        }

        sourceCtx.putImageData(imageData, 0, 0);

        // Upscale the source canvas to the display canvas
        displayCtx.clearRect(0, 0, displayCanvas.width, displayCanvas.height);
        displayCtx.drawImage(
            sourceCanvas,
            0, 0, sourceCanvas.width, sourceCanvas.height, // Source dimensions
            0, 0, displayCanvas.width, displayCanvas.height // Destination dimensions
        );

        // console.log("----")
        requestAnimationFrame(loop); // Loop the animation

    }





    // // Detect mouse clicks
    // displayCanvas.addEventListener('mousedown', (event) => {
    //     const rect = displayCanvas.getBoundingClientRect();

    //     const x = Math.floor((event.clientX - rect.left) / upscaleFactor);
    //     const y = Math.floor((event.clientY - rect.top) / upscaleFactor);
    //     if (event.button === 0) {
    //         const hit = raycast(camera.location, camera.rotation, objects);

    //         dots.push(new dot(hit.location.x, hit.location.y, hit.location.z));

    //         console.log("Hit:", hit.object.name, "at", hit.location.x, hit.location.y, hit.location.z);
    //     }
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
            const deltaX = event.movementX; // Relative movement in X
            const deltaY = event.movementY; // Relative movement in Y

            camera.rotation.y += deltaX * 0.01; // Adjust sensitivity as needed
            camera.rotation.x += deltaY * 0.01;

            // camera.rotation.x = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, camera.rotation.x));
        }
    });



    // Prevent context menu on right-click
    displayCanvas.addEventListener('contextmenu', (event) => {
        event.preventDefault();
    });


    let keys = { KeyA: false, KeyD: false, KeyW: false, KeyS: false, Space: false };
    document.addEventListener('keydown', (event) => {
        keys[event.code] = true;
    });
    document.addEventListener('keyup', (event) => {
        keys[event.code] = false;
    });

    loop();
});