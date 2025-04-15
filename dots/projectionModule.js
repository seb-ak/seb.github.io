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

////////////////////////
// FRUSTUM FUNCTIONS //
//////////////////////
function extractFrustumPlanes(mat) {
    let planes = [];

    for (let i = 0; i < 6; i++) planes.push({ normal: new Vec3(), d: 0 });

    // Left
    planes[0].normal.x = mat.m[0][3] + mat.m[0][0];
    planes[0].normal.y = mat.m[1][3] + mat.m[1][0];
    planes[0].normal.z = mat.m[2][3] + mat.m[2][0];
    planes[0].d        = mat.m[3][3] + mat.m[3][0];

    // Right
    planes[1].normal.x = mat.m[0][3] - mat.m[0][0];
    planes[1].normal.y = mat.m[1][3] - mat.m[1][0];
    planes[1].normal.z = mat.m[2][3] - mat.m[2][0];
    planes[1].d        = mat.m[3][3] - mat.m[3][0];

    // Bottom
    planes[2].normal.x = mat.m[0][3] + mat.m[0][1];
    planes[2].normal.y = mat.m[1][3] + mat.m[1][1];
    planes[2].normal.z = mat.m[2][3] + mat.m[2][1];
    planes[2].d        = mat.m[3][3] + mat.m[3][1];

    // Top
    planes[3].normal.x = mat.m[0][3] - mat.m[0][1];
    planes[3].normal.y = mat.m[1][3] - mat.m[1][1];
    planes[3].normal.z = mat.m[2][3] - mat.m[2][1];
    planes[3].d        = mat.m[3][3] - mat.m[3][1];

    // Near
    planes[4].normal.x = mat.m[0][3] + mat.m[0][2];
    planes[4].normal.y = mat.m[1][3] + mat.m[1][2];
    planes[4].normal.z = mat.m[2][3] + mat.m[2][2];
    planes[4].d        = mat.m[3][3] + mat.m[3][2];

    // Far
    planes[5].normal.x = mat.m[0][3] - mat.m[0][2];
    planes[5].normal.y = mat.m[1][3] - mat.m[1][2];
    planes[5].normal.z = mat.m[2][3] - mat.m[2][2];
    planes[5].d        = mat.m[3][3] - mat.m[3][2];

    // Normalize planes
    for (let p of planes) {
        const len = Vector_Length(p.normal);
        p.normal = Vector_Div(p.normal, len);
        p.d /= len;
    }

    return planes;
}
function isSphereInFrustum(planes, center, radius) {
    for (let p of planes) {
        const distance = Vector_DotProduct(p.normal, center) + p.d;
        if (distance < -radius) {
            return false;
        }
    }
    return true;
}


export class Camera {
    constructor(canvasWidth, canvasHeight, x, y, z) {
        const near = 0.1;
        const far = 1000;
        const fov = 90;
        const aspectRatio = canvasHeight / canvasWidth;
        
        this.matProj = Matrix_MakeProjection(fov, aspectRatio, near, far);
        this.location = new Vec3(x, y, z);
        this.lookDir = new Vec3();
        this.rotation = new Vec3();
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        this.offset = new Vec3(0, 2, 0)
    }

    projectPoints(points3d) {
        let points2d = [];

        // Define the up vector and target vector
        let vUp = new Vec3(0, 1, 0);
        let vTarget = new Vec3(0, 0, 1);

        // Create rotation matrices for X (pitch), Y (yaw), and Z (roll)
        let matCameraRotX = Matrix_MakeRotationX(this.rotation.x);
        let matCameraRotY = Matrix_MakeRotationY(-this.rotation.y);
        let matCameraRotZ = Matrix_MakeRotationZ(this.rotation.z);

        // Combine the rotation matrices
        let matCameraRot = Matrix_MultiplyMatrix(matCameraRotX, matCameraRotY);
        matCameraRot = Matrix_MultiplyMatrix(matCameraRot, matCameraRotZ);

        // Update the camera's look direction
        this.lookDir = Matrix_MultiplyVector(matCameraRot, vTarget);

        const loc = Vector_Add(this.location, this.offset)
        // Calculate the target location based on the look direction
        vTarget = Vector_Add(loc, this.lookDir);

        // Create the camera's view matrix
        let matCamera = Matrix_PointAt(loc, vTarget, vUp);
        let matView = Matrix_QuickInverse(matCamera);

        // Extract the frustum planes from the view-projection matrix
        let matViewProj = Matrix_MultiplyMatrix(matView, this.matProj);
        let frustumPlanes = extractFrustumPlanes(matViewProj);

        // console.log('Frustum Planes:', frustumPlanes);

        for (const point of points3d) {
            point.w = 1;

            // Frustum culling test
            const radius = 0.1; // Adjust per object if needed
            if (!isSphereInFrustum(frustumPlanes, point, radius)) {
                // console.log('Culled by frustum:', point);
                points2d.push({ x: 0, y: 0, render: false });
                continue;
            }

            // Transform the point from world space to view space
            const pointView = Matrix_MultiplyVector(matView, point);

            // console.log('Point in View Space:', pointView);

            // Skip points behind the camera (near plane)
            if (pointView.z <= 0) {
                // console.log('Culled by near plane:', pointView);
                points2d.push({ x: 0, y: 0, render: false });
                continue;
            }

            // Project the point from 3D to 2D
            const pointProjected = Matrix_MultiplyVector(this.matProj, pointView);

            // console.log('Point Projected:', pointProjected);

            // Normalize the projected point
            const normalizedX = (pointProjected.x / pointProjected.w + 1) * 0.5 * this.canvasWidth;
            const normalizedY = (1 - pointProjected.y / pointProjected.w) * 0.5 * this.canvasHeight;

            points2d.push({ x: normalizedX, y: normalizedY, render: true });
        }

        return points2d;
    }
}


