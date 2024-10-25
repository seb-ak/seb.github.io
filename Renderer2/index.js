var canvasWidth = 600;
var canvasHeight = 400;
var Theta = 5;

function matrixMultiply(value,matrix) {

    newValue = {}

    newValue.x = value.x*matrix[0][0] + value.y*matrix[1][0] + value.z*matrix[2][0] + matrix[3][0];
    newValue.y = value.x*matrix[0][1] + value.y*matrix[1][1] + value.z*matrix[2][1] + matrix[3][1];
    newValue.z = value.x*matrix[0][2] + value.y*matrix[1][2] + value.z*matrix[2][2] + matrix[3][2];
         var w = value.x*matrix[0][3] + value.y*matrix[1][3] + value.z*matrix[2][3] + matrix[3][3];

    if (w != 0) {
        newValue.x /= w;
        newValue.y /= w;
        newValue.z /= w;
    }

    return newValue
    
}


async function start() {
    Canvas.start();
    camera = new createCamera();

    let [v, f] = await loadObjFromUrl('new.obj')
    model = new createObject(0, [255,0,0], vertices=v, faces=f);

    // cube2 = new createObject(3, [0,255,0]);
    // cube3 = new createObject(-3,[0,0,255]);

    setInterval(updateCanvas, 20);
}

var Canvas = {
    canvas: document.getElementById('rendCanvas'),
    start: function() {
        this.canvas.width = canvasWidth;
        this.canvas.height = canvasHeight;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
    }
}

function drawLine(p1, p2, colour) {
    ctx = Canvas.context;
    ctx.strokeStyle = colour;
    ctx.lineWidth = 2;

    ctx.beginPath();
    ctx.moveTo(p1.x, p1.y);
    ctx.lineTo(p2.x, p2.y);
    ctx.stroke();
}

function drawTriangle(p1, p2, p3, colour) {
    let wireframe = false
    if (wireframe) {
        drawLine(p1, p2, rgb(colour));
        drawLine(p2, p3, rgb(colour));
        drawLine(p3, p1, rgb(colour));
    } else {
        // drawLine(p1, p2, "white");
        // drawLine(p2, p3, "white");
        // drawLine(p3, p1, "white");

        ctx = Canvas.context;
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.lineTo(p3.x, p3.y);
        ctx.closePath();
        ctx.fillStyle = `rgb(${colour})`;
        ctx.fill();
    }
}

function createCamera() {
    this.pos = { x: 0, y: 0, z: 0 };
    this.rot = { yaw: 0, pitch: 0, roll: 0 };
    
    var fNear = 0.1;
    var fFar = 1000;
    var ffov = 90;
    var fAspectRatio = canvasHeight / canvasWidth;
    var fFovRad = 1 / Math.tan(ffov * 0.5 / 180 * Math.PI);

    this.matProj = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ];
    this.matProj[0][0] = fAspectRatio * fFovRad;
    this.matProj[1][1] = fFovRad;
    this.matProj[2][2] = fFar / (fFar - fNear);
    this.matProj[3][2] = (-fFar * fNear) / (fFar - fNear);
    this.matProj[2][3] = 1;
    this.matProj[3][3] = 0;

    this.moveSpeed = 0.1;
    this.mouseSensitivity = 0.002;

    let keys = {};
    let rightMouseDown = false;
    let lastMouseX = 0;
    let lastMouseY = 0;

    // Handle keydown event
    window.addEventListener("keydown", function (e) {
        keys[e.code] = true;
    });

    // Handle keyup event
    window.addEventListener("keyup", function (e) {
        keys[e.code] = false;
    });

    // Handle mousedown and mouseup (right-click)
    window.addEventListener("mousedown", function (e) {
        if (e.button === 2) rightMouseDown = true; // Right-click down
    });

    window.addEventListener("mouseup", function (e) {
        if (e.button === 2) rightMouseDown = false; // Right-click up
    });

    // Handle mouse movement
    window.addEventListener("mousemove", (e) => {
        if (rightMouseDown) {
            let deltaX = e.movementX;
            let deltaY = e.movementY;

            // Adjust yaw and pitch based on mouse movement
            this.rot.yaw -= deltaX * this.mouseSensitivity;
            this.rot.pitch -= deltaY * this.mouseSensitivity;

            // Limit pitch to avoid flipping the camera
            this.rot.pitch = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, this.rot.pitch));
        }
    });

    // Movement function
    this.move = function () {
        let forward = { x: Math.sin(this.rot.yaw), y: 0, z: Math.cos(this.rot.yaw) }; // Forward vector
        let right = { x: Math.cos(this.rot.yaw), y: 0, z: -Math.sin(this.rot.yaw) }; // Right vector
        let up = { x: 0, y: 1, z: 0 }; // Up vector

        // Move forward/back (W/S)
        if (keys["KeyW"]) {
            this.pos.x += forward.x * this.moveSpeed;
            this.pos.z += forward.z * this.moveSpeed;
        }
        if (keys["KeyS"]) {
            this.pos.x -= forward.x * this.moveSpeed;
            this.pos.z -= forward.z * this.moveSpeed;
        }

        // Strafe left/right (A/D)
        if (keys["KeyA"]) {
            this.pos.x -= right.x * this.moveSpeed;
            this.pos.z -= right.z * this.moveSpeed;
        }
        if (keys["KeyD"]) {
            this.pos.x += right.x * this.moveSpeed;
            this.pos.z += right.z * this.moveSpeed;
        }

        // Move up/down (Ctrl/Space)
        if (keys["Space"]) {
            this.pos.y += this.moveSpeed;
        }
        if (keys["ControlLeft"]) {
            this.pos.y -= this.moveSpeed;
        }
    };
}

cubeVert=[
    {v1:0,v2:1,v3:2},
    {v1:0,v2:2,v3:3},

    {v1:3,v2:2,v3:5},
    {v1:3,v2:4,v3:4},

    {v1:4,v2:5,v3:6},
    {v1:4,v2:6,v3:7},

    {v1:7,v2:6,v3:1},
    {v1:7,v2:1,v3:0},

    {v1:1,v2:6,v3:5},
    {v1:1,v2:5,v3:2},
    
    {v1:0,v2:7,v3:4},
    {v1:0,v2:4,v3:3},
]
cubeFace=[
    {v1:0,v2:1,v3:2},
    {v1:0,v2:2,v3:3},

    {v1:3,v2:2,v3:5},
    {v1:3,v2:4,v3:4},

    {v1:4,v2:5,v3:6},
    {v1:4,v2:6,v3:7},

    {v1:7,v2:6,v3:1},
    {v1:7,v2:1,v3:0},

    {v1:1,v2:6,v3:5},
    {v1:1,v2:5,v3:2},
    
    {v1:0,v2:7,v3:4},
    {v1:0,v2:4,v3:3},
]

function loadObjFromUrl(url) {
    return fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.text(); // Return the text data
        })
        .then(data => {

            const lines = data.split('\n');
            const vertices = [];
            const faces = [];

            lines.forEach(line => {
                const parts = line.trim().split(' ');

                if (parts[0] === 'v') {
                    vertices.push({
                        x:parseFloat(parts[1]),
                        y:parseFloat(parts[2]),
                        z:parseFloat(parts[3])
                });
                } else if (parts[0] === 'f') {
                    faces.push([
                        parseInt(parts[1]-1),
                        parseInt(parts[2]-1),
                        parseInt(parts[3]-1)
                    ]);
                }
            });

            // console.log('Vertices:', vertices);
            // console.log('Faces:', faces);

            return [ vertices, faces ]; // Use an object to return both arrays
        })
        .catch(error => {
            console.error("Error loading OBJ:", error);
            return null; // Handle error as needed
        });
}


function createObject(offset, colour, vertices=cubeVert, faces=cubeFace) {
    this.colour = colour
    this.vertexList=vertices
    this.faceList=faces

    this.draw = function() {

        Theta +=0.005;

        let matRotZ = [
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 1, 0],
            [0, 0, 0, 1]
        ];
        matRotZ[0][0] = Math.cos(Theta);
        matRotZ[0][1] = Math.sin(Theta);
        matRotZ[1][0] = -Math.sin(Theta);
        matRotZ[1][1] = Math.cos(Theta);

        let matRotX = [
            [1, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 1]
        ];
        matRotX[1][1] = Math.cos(Theta * 0.5);
        matRotX[1][2] = Math.sin(Theta * 0.5);
        matRotX[2][1] = -Math.sin(Theta * 0.5);
        matRotX[2][2] = Math.cos(Theta * 0.5);

        TrianglesToRaster = []

        for (const triangle of this.faceList) {

            let v1RotatedZ = matrixMultiply(this.vertexList[triangle[0]], matRotZ);
            let v2RotatedZ = matrixMultiply(this.vertexList[triangle[1]], matRotZ);
            let v3RotatedZ = matrixMultiply(this.vertexList[triangle[2]], matRotZ);

            let v1RotatedZX = matrixMultiply(v1RotatedZ, matRotX);
            let v2RotatedZX = matrixMultiply(v2RotatedZ, matRotX);
            let v3RotatedZX = matrixMultiply(v3RotatedZ, matRotX);

            //translate vertecies away from camera
            let v1Translated = v1RotatedZX;
            let v2Translated = v2RotatedZX;
            let v3Translated = v3RotatedZX;
            v1Translated.z += 2;
            v2Translated.z += 2;
            v3Translated.z += 2;

            let line1 = {};
            line1.x = v2Translated.x - v1Translated.x;
            line1.y = v2Translated.y - v1Translated.y;
            line1.z = v2Translated.z - v1Translated.z;
            let line2 = {};
            line2.x = v3Translated.x - v1Translated.x;
            line2.y = v3Translated.y - v1Translated.y;
            line2.z = v3Translated.z - v1Translated.z;

            //dot product
            let normal = {};
            normal.x = line1.y * line2.z - line1.z * line2.y;
            normal.y = line1.z * line2.x - line1.x * line2.z;
            normal.z = line1.x * line2.y - line1.y * line2.x;

            //normalise normal
            let normalLen = Math.sqrt(normal.x*normal.x + normal.y*normal.y + normal.z*normal.z);
            normal.x /= normalLen; normal.y /= normalLen; normal.z /= normalLen;

            // if (true) {
            if (normal.x * (v1Translated.x - camera.pos.x) +
                normal.y * (v1Translated.y - camera.pos.y) +
                normal.z * (v1Translated.z - camera.pos.z) < 0) {

                //lighting
                let light_direction = {x:0, y:0, z:-1}
                let Len = Math.sqrt(light_direction.x*light_direction.x + light_direction.y*light_direction.y + light_direction.z*light_direction.z);
                light_direction.x /= Len;
                light_direction.y /= Len;
                light_direction.z /= Len;

                let dot_product = normal.x * light_direction.x + normal.y * light_direction.y + normal.z * light_direction.z;
                dot_product = Math.max(0, Math.min(1, dot_product));

                let face_colour = [
                    this.colour[0] * dot_product,
                    this.colour[1] * dot_product,
                    this.colour[2] * dot_product
                ];

                //project from 3d to 2d
                let p1 = matrixMultiply(v1Translated, camera.matProj);
                let p2 = matrixMultiply(v2Translated, camera.matProj);
                let p3 = matrixMultiply(v3Translated, camera.matProj);
                
                //scale into view
                p1.x += 1; p1.y += 1;
                p2.x += 1; p2.y += 1;
                p3.x += 1; p3.y += 1;


                p1.x *= 0.5*canvasWidth; p1.y *= 0.5*canvasHeight;
                p2.x *= 0.5*canvasWidth; p2.y *= 0.5*canvasHeight;
                p3.x *= 0.5*canvasWidth; p3.y *= 0.5*canvasHeight;
                
                // console.log(p1.z,p2.z,p3.z)
                TrianglesToRaster.push([p1,p2,p3,face_colour])
            }
        }

        TrianglesToRaster.sort((t1, t2) => {
            const z1 = (t1[0].z + t1[1].z + t1[2].z) / 3;
            const z2 = (t2[0].z + t2[1].z + t2[2].z) / 3;
            return z1 < z2
        });
        
        for (const [p1,p2,p3,face_colour] of TrianglesToRaster) {
            
            drawTriangle(p1, p2, p3, face_colour)
        }

    }

}


function createLabel(x, y) {
    this.text = "";
    this.x = x;
    this.y = y;
    this.draw = function() {
        ctx = Canvas.context;
        ctx.font = "25px Marker Felt";
        ctx.fillStyle = "black";
        ctx.fillText(this.text, this.x, this.y);
    }
}

function updateCanvas() {
    
    ctx = Canvas.context;
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);
    
    model.draw();
    // cube2.draw();
    // cube3.draw();
    if ( spaceDown ) { Theta+=0.1 }
}

spaceDown = false

document.body.onkeydown = function(e) {
    if (e.keyCode == 32) {
        spaceDown = true
    }
}

document.body.onkeyup = function(e) {
    if (e.keyCode == 32) {
        spaceDown = false
    }
}