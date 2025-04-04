
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
    let matrix = new mat4x4;
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



export class Camera {
    constructor(canvasWidth, canvasHeight, x,y,z) {
        this.matProj = Matrix_MakeProjection(90, canvasHeight/canvasWidth, 0.1, 1000);
        this.pos = new Vec3(x,y,z);
        this.lookDir = new Vec3;
        this.rotation = new Vec3;
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
    }
    
    projectPoints(points3d) {
        let points2d = [];

        // Define the up vector and target vector
        let vUp = new Vec3(0, 1, 0);
        let vTarget = new Vec3(0, 0, 1);

        // Create rotation matrices for X (pitch), Y (yaw), and Z (roll)
        let matCameraRotX = Matrix_MakeRotationX(this.rotation.x); // Pitch (up/down)
        let matCameraRotY = Matrix_MakeRotationY(-this.rotation.y); // Yaw (left/right)
        let matCameraRotZ = Matrix_MakeRotationZ(this.rotation.z); // Roll (optional)

        // Combine the rotation matrices
        let matCameraRot = Matrix_MultiplyMatrix(matCameraRotY, matCameraRotX); // Apply yaw first, then pitch
        matCameraRot = Matrix_MultiplyMatrix(matCameraRot, matCameraRotZ); // Apply roll if needed

        // Update the camera's look direction
        this.lookDir = Matrix_MultiplyVector(matCameraRot, vTarget);

        // Calculate the target position based on the look direction
        vTarget = Vector_Add(this.pos, this.lookDir);

        // Create the camera's view matrix
        let matCamera = Matrix_PointAt(this.pos, vTarget, vUp);
        let matView = Matrix_QuickInverse(matCamera);

        for (const point of points3d) {
            point.w = 1;

            // Transform the point from world space to view space
            const pointView = Matrix_MultiplyVector(matView, point);
            
            if (pointView.z >= 0) {
                points2d.push({ x: 0, y: 0 , render: false});
                continue; // Skip this point
            }

            // Project the point from 3D to 2D
            const pointProjected = Matrix_MultiplyVector(this.matProj, pointView);
            
            const normalizedX = (pointProjected.x / pointProjected.w + 1) * 0.5 * this.canvasWidth;
            const normalizedY = (1 - pointProjected.y / pointProjected.w) * 0.5 * this.canvasHeight;
            
            points2d.push({ x: normalizedX, y: normalizedY , render: true});
        }
    
        return points2d;
    }
}
