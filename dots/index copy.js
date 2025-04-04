const map = [
    [
        "#######",
        "#######",
        "#######",
        "#######",
        "#######",
        "#######",
        "#######",
    ], [
        "#######",
        "#     #",
        "#     #",
        "#     #",
        "#     #",
        "#     #",
        "#######",
    ], [
        "#######",
        "#     #",
        "#     #",
        "#     #",
        "#     #",
        "#     #",
        "#######",
    ], [
        "#######",
        "#     #",
        "#     #",
        "#     #",
        "#     #",
        "#     #",
        "#######",
    ], [
        "#######",
        "#     #",
        "#     #",
        "#     #",
        "#     #",
        "#     #",
        "#######",
    ], [
        "#######",
        "#     #",
        "#     #",
        "#     #",
        "#     #",
        "#     #",
        "#######",
    ], [
        "#######",
        "#######",
        "#######",
        "#######",
        "#######",
        "#######",
        "#######",
    ],
]

let objects = [];
let dots = [];
class object {
    constructor(x=0, y=0, z=0, colour={r:0, g:0, b:0, a:0}, name="object",size={x:1,y:1,z:1}) {
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

class camera extends object {
    constructor(x = 0, y = 0, z = 0) {
        super(x, y, z, name="camera");
    }
}

class dot extends object {
    constructor(x, y, z) {
        super(x, y, z, {r:255, g:0, b:0, a:0}, "dot", {x:0.1,y:0.1,z:0.1});
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


for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map[i].length; j++) {
        for (let k = 0; k < map[i][j].length; k++) {
            if (map[i][j][k] === "#") {
                const cube = new object(j, i, k, {r: 255, g: 255, b: 255, a: 255}, "floor");
                objects.push(cube);
            }
        }
    }
}
const player = new camera(3, 3, 3);




document.addEventListener('DOMContentLoaded', () => {
    // Create the low-resolution canvas
    const sourceCanvas = document.createElement('canvas');
    const sourceCtx = sourceCanvas.getContext('2d');
    sourceCanvas.width = 256/4;
    sourceCanvas.height = 144/4;

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
        imageData.data[index] = r;     // Red
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
            imageData.data[i] = 0;     // Red
            imageData.data[i + 1] = 0; // Green
            imageData.data[i + 2] = 0; // Blue
            imageData.data[i + 3] = 0; // Alpha
        }
    }

    function loop() {

        //INPUTS
        
        player.location.z += (keys['KeyW'] - keys['KeyS']) * 0.01
        player.location.x += (keys['KeyD'] - keys['KeyA']) * 0.01

        updateFPS();

        // fadeImage(5);
        clearImage();

        for (x = 0; x < sourceCanvas.width; x++) {
            for (y = 0; y < sourceCanvas.height; y++) {

                const hit = raycast(
                    {
                        x: player.location.x,
                        y: player.location.y,
                        z: player.location.z
                    },
                    {
                        x: player.rotation.x + (x / sourceCanvas.width - 0.5) * Math.PI,
                        y: player.rotation.y + (y / sourceCanvas.height - 0.5) * Math.PI,
                        z: player.rotation.z
                    }, 
                    dots
                );
                if (hit) {
                    setPixel(x, y, hit.object.colour.r, hit.object.colour.g, hit.object.colour.b, hit.object.distanceTo(player) * 255 / 10);
                }
            }
        }

        // Draw the updated ImageData to the source canvas
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





    // Detect mouse clicks
    displayCanvas.addEventListener('mousedown', (event) => {
        const rect = displayCanvas.getBoundingClientRect();

        const x = Math.floor((event.clientX - rect.left) / upscaleFactor);
        const y = Math.floor((event.clientY - rect.top) / upscaleFactor);
        if (event.button === 0) {
            const hit = raycast(player.location, player.rotation, objects);
            
            dots.push(new dot(hit.location.x, hit.location.y, hit.location.z));
            
            console.log("Hit:", hit.object.name, "at", hit.location.x, hit.location.y, hit.location.z);
        }
    });

    let clicking = [false,false,false];
    let lastMousePosition = { x: 0, y: 0 };

    displayCanvas.addEventListener('mousedown', (event) => {
        clicking[event.button] = true;
        lastMousePosition = { x: event.clientX, y: event.clientY };
    });
    displayCanvas.addEventListener('mouseup', (event) => {
        clicking[event.button] = false;
    });

    displayCanvas.addEventListener('mousemove', (event) => {
        if (clicking[2]) {
            const deltaX = event.clientX - lastMousePosition.x; // Change in X
            const deltaY = event.clientY - lastMousePosition.y; // Change in Y

            player.rotation.x += deltaX * 0.01; // Adjust sensitivity as needed
            player.rotation.y += deltaY * 0.01;

            player.rotation.y = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, player.rotation.y));

            lastMousePosition = { x: event.clientX, y: event.clientY };
        }
    });

    // Prevent context menu on right-click
    displayCanvas.addEventListener('contextmenu', (event) => {
        event.preventDefault();
    });


    let keys = {KeyA:false, KeyD:false, KeyW:false, KeyS:false, Space:false};
    document.addEventListener('keydown', (event) => {
        keys[event.code] = true;
    });
    document.addEventListener('keyup', (event) => {
        keys[event.code] = false;
    });

    loop(); // Start the animation
});