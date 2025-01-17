var canvasWidth = 600;
var canvasHeight = 400;
var interval = NaN
var Theta = 0;

///////////////////////
// Matrix Functions //
/////////////////////
class mat4x4 {
    constructor() {
        this.m = [
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0]
        ];
    }
}

function Matrix_MultiplyVector(m, i) {
    let v = new Vec3;
    v.x = i.x*m.m[0][0] + i.y*m.m[1][0] + i.z*m.m[2][0] + i.w * m.m[3][0];
    v.y = i.x*m.m[0][1] + i.y*m.m[1][1] + i.z*m.m[2][1] + i.w * m.m[3][1];
    v.z = i.x*m.m[0][2] + i.y*m.m[1][2] + i.z*m.m[2][2] + i.w * m.m[3][2];
    v.w = i.x*m.m[0][3] + i.y*m.m[1][3] + i.z*m.m[2][3] + i.w * m.m[3][3];
    return v;
}
function Matrix_MakeIdentity(){
    matrix = new mat4x4;
    matrix.m[0][0] = 1;
    matrix.m[1][1] = 1;
    matrix.m[2][2] = 1;
    matrix.m[3][3] = 1;
    return matrix;
}
function Matrix_MakeRotationX(AngleRad){
    let matrix = new mat4x4;
    matrix.m[0][0] = 1;
    matrix.m[1][1] = Math.cos(AngleRad);
    matrix.m[1][2] = Math.sin(AngleRad);
    matrix.m[2][1] = -Math.sin(AngleRad);
    matrix.m[2][2] = Math.cos(AngleRad);
    matrix.m[3][3] = 1;
    return matrix;
}
function Matrix_MakeRotationY(AngleRad){
    let matrix = new mat4x4;
    matrix.m[0][0] = Math.cos(AngleRad);
    matrix.m[0][2] = Math.sin(AngleRad);
    matrix.m[2][0] = -Math.sin(AngleRad);
    matrix.m[1][1] = 1;
    matrix.m[2][2] = Math.cos(AngleRad);
    matrix.m[3][3] = 1;
    return matrix;
}
function Matrix_MakeRotationZ(AngleRad){
    let matrix = new mat4x4;
    matrix.m[0][0] = Math.cos(AngleRad);
    matrix.m[0][1] = Math.sin(AngleRad);
    matrix.m[1][0] = -Math.sin(AngleRad);
    matrix.m[1][1] = Math.cos(AngleRad);
    matrix.m[2][2] = 1;
    matrix.m[3][3] = 1;
    return matrix;
}
function Matrix_MakeTranslation(x, y, z){
    let matrix = new mat4x4;
    matrix.m[0][0] = 1;
    matrix.m[1][1] = 1;
    matrix.m[2][2] = 1;
    matrix.m[3][3] = 1;
    matrix.m[3][0] = x;
    matrix.m[3][1] = y;
    matrix.m[3][2] = z;
    return matrix;
}
function Matrix_MakeProjection(FovDegrees, AspectRatio, Near, Far){
    const FovRad = 1 / Math.tan(FovDegrees * 0.5 / 180 * Math.PI);
    let matrix = new mat4x4;
    matrix.m[0][0] = AspectRatio * FovRad;
    matrix.m[1][1] = FovRad;
    matrix.m[2][2] = Far / (Far - Near);
    matrix.m[3][2] = (-Far * Near) / (Far - Near);
    matrix.m[2][3] = 1;
    matrix.m[3][3] = 0;
    return matrix;
}
function Matrix_MultiplyMatrix(m1, m2){
    let matrix = new mat4x4;
    for (let c = 0; c < 4; c++) {
        for (let r = 0; r < 4; r++) {
            matrix.m[r][c] = m1.m[r][0] * m2.m[0][c] + m1.m[r][1] * m2.m[1][c] + m1.m[r][2] * m2.m[2][c] + m1.m[r][3] * m2.m[3][c]
        }
    }
    return matrix;
}
function Matrix_PointAt(pos, target, up) {
    //calculate new forwards direction
    let newForward = Vector_Sub(target, pos);
    newForward = Vector_Normalise(newForward);

    //calculate new up direction
    let a = Vector_Mult(newForward, Vector_DotProduct(up, newForward));
    let newUp = Vector_Sub(up, a);
    newUp = Vector_Normalise(newUp);

    //calculate new right direction
    let newRight = Vector_CrossProduct(newUp, newForward);

    let matrix = new mat4x4;
    matrix.m[0][0] = newRight.x;    matrix.m[0][1] = newRight.y;    matrix.m[0][2] = newRight.z;    matrix.m[0][3] = 0;
    matrix.m[1][0] = newUp.x;       matrix.m[1][1] = newUp.y;       matrix.m[1][2] = newUp.z;       matrix.m[1][3] = 0;
    matrix.m[2][0] = newForward.x;  matrix.m[2][1] = newForward.y;  matrix.m[2][2] = newForward.z;  matrix.m[2][3] = 0;
    matrix.m[3][0] = pos.x;         matrix.m[3][1] = pos.y;         matrix.m[3][2] = pos.z;         matrix.m[3][3] = 1;
    return matrix;
}
function Matrix_QuickInverse(m) {
    let matrix = new mat4x4;
    matrix.m[0][0] = m.m[0][0]; matrix.m[0][1] = m.m[1][0]; matrix.m[0][2] = m.m[2][0]; matrix.m[0][3] = 0;
    matrix.m[1][0] = m.m[0][1]; matrix.m[1][1] = m.m[1][1]; matrix.m[1][2] = m.m[2][1]; matrix.m[1][3] = 0;
    matrix.m[2][0] = m.m[0][2]; matrix.m[2][1] = m.m[1][2]; matrix.m[2][2] = m.m[2][2]; matrix.m[2][3] = 0;
    matrix.m[3][0] = -(m.m[3][0] * matrix.m[0][0] + m.m[3][1] * matrix.m[1][0] + m.m[3][2] * matrix.m[2][0]);
    matrix.m[3][1] = -(m.m[3][0] * matrix.m[0][1] + m.m[3][1] * matrix.m[1][1] + m.m[3][2] * matrix.m[2][1]);
    matrix.m[3][2] = -(m.m[3][0] * matrix.m[0][2] + m.m[3][1] * matrix.m[1][2] + m.m[3][2] * matrix.m[2][2]);
    matrix.m[3][3] = 1;
    return matrix;
}

///////////////////////
// Vector Functions //
/////////////////////
class Vec3 {
    constructor(x=0,y=0,z=0,w=1) {
        this.x = x
        this.y = y
        this.z = z
        this.w = w
    }
}

function Vector_Add(v1, v2) {
    return new Vec3(
        v1.x + v2.x,
        v1.y + v2.y,
        v1.z + v2.z
    );
}
function Vector_Sub(v1, v2) {
    return new Vec3(
        v1.x - v2.x,
        v1.y - v2.y,
        v1.z - v2.z
    );
}
function Vector_Mult(v1, k) {
    return new Vec3(
        v1.x * k,
        v1.y * k,
        v1.z * k
    );
}
function Vector_Div(v1, k) {
    return new Vec3(
        v1.x / k,
        v1.y / k,
        v1.z / k
    );
}
function Vector_DotProduct(v1, v2) {
    return v1.x * v2.x + v1.y * v2.y + v1.z * v2.z;
}
function Vector_Length(v) {
    return Math.sqrt(Vector_DotProduct(v, v));
}
function Vector_Normalise(v) {
    const l = Vector_Length(v);
    return Vector_Div(v, l);
}
function Vector_CrossProduct(v1, v2) {
    let v = new Vec3;
    v.x = v1.y * v2.z - v1.z * v2.y;
    v.y = v1.z * v2.x - v1.x * v2.z;
    v.z = v1.x * v2.y - v1.y * v2.x;
    return v;
}


async function start() {
    Canvas.start();
    camera = new createCamera();
    
    let [tv, tf] = await loadObjFromUrl('teapot.obj')
    model = new createObject(0, [0,0,255], vertices=tv, faces=tf);

    let [av, af] = await loadObjFromUrl('axis.obj')
    axis = new createObject(0, [255,255,255], vertices=av, faces=af);

    interval = setInterval(updateCanvas, 20);
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
    ctx.lineWidth = 1;

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
    this.pos = new Vec3;
    this.lookDir = new Vec3;
    this.Yaw = 0;
    
    this.matProj = Matrix_MakeProjection(90, canvasHeight/canvasWidth, 0.1, 1000);

    this.move = function(keys) {
        if (keys.includes("arrowup")) {this.pos.y += 0.1 * interval}
        if (keys.includes("arrowdown")) {this.pos.y -= 0.1 * interval}
        if (keys.includes("arrowleft")) {this.pos.x -= 0.1 * interval}
        if (keys.includes("arrowright")) {this.pos.x += 0.1 * interval}

        let Forward = Vector_Mult(this.lookDir, 0.08 * interval)
        if (keys.includes("w")) {this.pos = Vector_Add(this.pos, Forward)}
        if (keys.includes("s")) {this.pos = Vector_Sub(this.pos, Forward)}

        if (keys.includes("a")) {this.Yaw += 0.01 * interval}
        if (keys.includes("d")) {this.Yaw -= 0.01 * interval}
    }
}

// cubeVert=[
//     {v1:0,v2:1,v3:2},
//     {v1:0,v2:2,v3:3},

//     {v1:3,v2:2,v3:5},
//     {v1:3,v2:4,v3:4},

//     {v1:4,v2:5,v3:6},
//     {v1:4,v2:6,v3:7},

//     {v1:7,v2:6,v3:1},
//     {v1:7,v2:1,v3:0},

//     {v1:1,v2:6,v3:5},
//     {v1:1,v2:5,v3:2},
    
//     {v1:0,v2:7,v3:4},
//     {v1:0,v2:4,v3:3},
// ]
// cubeFace=[
//     {v1:0,v2:1,v3:2},
//     {v1:0,v2:2,v3:3},

//     {v1:3,v2:2,v3:5},
//     {v1:3,v2:4,v3:4},

//     {v1:4,v2:5,v3:6},
//     {v1:4,v2:6,v3:7},

//     {v1:7,v2:6,v3:1},
//     {v1:7,v2:1,v3:0},

//     {v1:1,v2:6,v3:5},
//     {v1:1,v2:5,v3:2},
    
//     {v1:0,v2:7,v3:4},
//     {v1:0,v2:4,v3:3},
// ]

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
                    vertices.push( new Vec3(
                        parseFloat(parts[1]),
                        parseFloat(parts[2]),
                        parseFloat(parts[3])
                    ));
                } else if (parts[0] === 'f') {
                    faces.push([
                        parseInt(parts[1]-1),
                        parseInt(parts[2]-1),
                        parseInt(parts[3]-1)
                    ]);
                }
            });

            return [ vertices, faces ];
        })
}


function createObject(pos= new Vec3(0,0,0), colour, vertices=cubeVert, faces=cubeFace) {
    this.pos = pos
    this.colour = colour
    this.vertexList=vertices
    this.faceList=faces

    this.draw = function(theta=0) {

        let Theta = theta;
        
        let matRotZ = Matrix_MakeRotationZ(Theta);
        let matRotX = Matrix_MakeRotationX(Theta);

        let matTrans = Matrix_MakeTranslation(0,0,5);

        let matWorld = Matrix_MakeIdentity();
        matWorld = Matrix_MultiplyMatrix(matRotZ, matRotX);
        matWorld = Matrix_MultiplyMatrix(matWorld, matTrans);
        
        let vUp = new Vec3(0,1,0);
        let vTarget = new Vec3(0,0,1);
        let matCameraRot = Matrix_MakeRotationY(camera.Yaw);
        camera.lookDir = Matrix_MultiplyVector(matCameraRot, vTarget)
        vTarget = Vector_Add(camera.pos, camera.lookDir)
        let matCamera = Matrix_PointAt(camera.pos, vTarget, vUp);


        let matView = Matrix_QuickInverse(matCamera);

        TrianglesToRaster = [];

        for (const triangle of this.faceList) {

            let v1Transformed = Matrix_MultiplyVector(matWorld, this.vertexList[triangle[0]]);
            let v2Transformed = Matrix_MultiplyVector(matWorld, this.vertexList[triangle[1]]);
            let v3Transformed = Matrix_MultiplyVector(matWorld, this.vertexList[triangle[2]]);

            let line1 = Vector_Sub(v2Transformed, v1Transformed);
            let line2 = Vector_Sub(v3Transformed, v1Transformed);

            let normal = Vector_CrossProduct(line1, line2);
            normal = Vector_Normalise(normal);


            let CameraRay = Vector_Sub(v1Transformed, camera.pos);

            // if the normal is not facing the camera dont render it
            if (Vector_DotProduct(normal, CameraRay) < 0) {

                //lighting
                let light_direction = new Vec3(0, 0, -1);
                light_direction = Vector_Normalise(light_direction);

                let dot_product = Math.max(0.1, Math.min(1, Vector_DotProduct(light_direction, normal)));

                let face_colour = [
                    this.colour[0] * dot_product,
                    this.colour[1] * dot_product,
                    this.colour[2] * dot_product
                ];

                // convert World Space --> View Space
                let pViewed1 = Matrix_MultiplyVector(matView, v1Transformed);
                let pViewed2 = Matrix_MultiplyVector(matView, v2Transformed);
                let pViewed3 = Matrix_MultiplyVector(matView, v3Transformed);

                // Project triangles from 3D --> 2D
                let pProjected1 = Matrix_MultiplyVector(camera.matProj, pViewed1);
                let pProjected2 = Matrix_MultiplyVector(camera.matProj, pViewed2);
                let pProjected3 = Matrix_MultiplyVector(camera.matProj, pViewed3);
                
                //normalise
                let p1 = Vector_Div(pProjected1, pProjected1.w);
                let p2 = Vector_Div(pProjected2, pProjected2.w);
                let p3 = Vector_Div(pProjected3, pProjected3.w);
                
                //scale into view
                p1.x += 1; p1.y = -p1.y + 1;
                p2.x += 1; p2.y = -p2.y + 1;
                p3.x += 1; p3.y = -p3.y + 1;


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
            if (p1.x <0 || p1.x > canvasWidth) continue
            if (p2.x <0 || p2.x > canvasWidth) continue
            if (p3.x <0 || p3.x > canvasWidth) continue

            if (p1.y <0 || p1.y > canvasHeight) continue
            if (p2.y <0 || p2.y > canvasHeight) continue
            if (p3.y <0 || p3.y > canvasHeight) continue

            drawTriangle(p1, p2, p3, face_colour)
        }

    }

}


// function createLabel(x, y) {
//     this.text = "";
//     this.x = x;
//     this.y = y;
//     this.draw = function() {
//         ctx = Canvas.context;
//         ctx.font = "25px Marker Felt";
//         ctx.fillStyle = "black";
//         ctx.fillText(this.text, this.x, this.y);
//     }
// }

function updateCanvas() {
    
    ctx = Canvas.context;
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);

    Theta += 0.01

    camera.move(keys);
    // console.log(keys);

    model.draw(Theta);
    axis.draw();

}

keys = []
document.body.onkeydown = function(event) {
    if (keys.includes(event.key.toLowerCase())) return
    keys.push(event.key.toLowerCase())
}
document.body.onkeyup = function(event) {
    keys = keys.filter(i => i !== event.key.toLowerCase());
}