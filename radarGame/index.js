


let dots = [
    {size: 1, rot:45, distance: 50},
    {size: 0.5, rot:90, distance: 85},
];

var radarRot = 0;
var radarRotateSpeed = 1;
var radarSize = 45;
var radarReverse = false;
var radarDir =1;

var dotFadeSpeed = 0.02;

var knobRotation = 0;




dots.forEach(e => {
    e.dot = createDot();
});

function createDot() {
    let dot = document.createElement('div');
    dot.classList.add('dot');
    document.querySelector('.screen').appendChild(dot);
    return dot;
}



let scanSpeedSlider = document.getElementById('scanSpeed');
scanSpeedSlider.addEventListener('input', function() {
    radarRotateSpeed = parseFloat(scanSpeedSlider.value);
});

let reverseButton = document.getElementById('reverse');
reverseButton.addEventListener('click', function() {
    radarReverse = !radarReverse;
    screenShake(100, 1);
});

let shoot = document.getElementById('shoot');
shoot.addEventListener('click', function() {
    screenShake(300, 3);
    new Audio('sounds/soundsnap/BUTTON_heavy_clunk.mp3').play();
    new Audio('sounds/soundsnap/BUTTON_reverb_long.mp3').play();
});

let bigshoot = document.getElementById('bigshoot');
bigshoot.addEventListener('click', function() {
    new Audio('sounds/soundsnap/BUTTON_heavy_clunk.mp3').play();

    screenShake(400, 4);
    setTimeout(() => {
        screenShake(1000, 7);
    }, 400);
    setTimeout(() => {
        screenShake(2000, 2);
    }, 400+1000);

    let audio = new Audio('sounds/soundsnap/FIRE_torpedo.mp3');
    audio.volume = 0.5;
    audio.play();

});


let loopedAudioPlaying = false;
function update() {

    if (loopedAudioPlaying == false) {
        let loopAudio = new Audio('sounds/soundsnap/LOOP_Movement_through_Water.mp3');
        loopAudio.volume = 0.2;
        loopAudio.loop = true;
        loopedAudioPlaying = true;
        loopAudio.play().catch(error => {
            loopedAudioPlaying = false;
        });
    }




    if (radarReverse) {
        radarDir -= radarRotateSpeed * 0.02;
    } else {
        radarDir += radarRotateSpeed * 0.02;
    }
    radarDir = Math.min(1, Math.max(-1, radarDir));

    radarRot+=radarRotateSpeed * radarDir;
    
    let scan = document.querySelector('.scan')
    scan.style.transform = `rotate(${radarRot}deg)`;

    if (radarDir < 0) {
        scan.style.backgroundImage = `conic-gradient(
            from 0deg,
            rgba(0, 255, 0, 0.500) 1deg,
            transparent ${radarSize*Math.abs(radarDir)}deg,
            transparent 360deg
        )`;
    } else if (radarDir > 0) {
        scan.style.backgroundImage = `conic-gradient(
            from 0deg,
            transparent 2deg,
            transparent ${360-radarSize*Math.abs(radarDir)}deg,
            rgba(0, 255, 0, 0.500) 359deg
        )`;
    }

    dots.forEach(e => {
        let dot = e.dot
        
        dot.style.transform = `translate(5.5%, 5.5%) rotate(${e.rot}deg) translateY(-${e.distance/2}%) scale(${e.size})`;
        dot.style.opacity -= dotFadeSpeed;
        
        if (Math.abs(e.rot - radarRot % 360) < 3) {
            setTimeout(() => {
                dot.style.opacity = 1;

                let audio = new Audio('sounds/soundsnap/PING_single.mp3');
                audio.volume = 0.4 * e.size;
                audio.play();
            }, e.distance * 10);
        }

    });


}

setInterval(update, 1000 / 60);








const knob = document.querySelector('.knob');
const indicator = document.querySelector('.knob-indicator');
let isDragging = false;
let startAngle = 0;

knob.addEventListener('mousedown', (e) => {
    isDragging = true;
    startAngle = getAngle(e.clientX, e.clientY) - knobRotation;
});
document.addEventListener('mouseup', () => {
    isDragging = false;
});

document.addEventListener('mousemove', (e) => {
    if (isDragging) {
        const currentAngle = getAngle(e.clientX, e.clientY);
        knobRotation = currentAngle - startAngle;
        indicator.style.transform = `rotate(${knobRotation}deg)`;
        
        if (Math.round(knobRotation) % 10 == 0) {
            new Audio('sounds/click2.mp3').play();
        }
    }
});

function getAngle(x, y) {
    const rect = knob.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const deltaX = x - centerX;
    const deltaY = y - centerY;
    return Math.atan2(deltaY, deltaX) * (180 / Math.PI);
}




function screenShake(duration, intensity) {
    let start = Date.now();
    let originalStyle = document.body.style.cssText;

    function shake() {
        let elapsed = Date.now() - start;
        if (elapsed < duration) {
            let x = (Math.random() - 0.5) * intensity;
            let y = (Math.random() - 0.5) * intensity;
            document.body.style.transform = `translate(${x}px, ${y}px)`;
            requestAnimationFrame(shake);
        } else {
            document.body.style.cssText = originalStyle;
        }
    }

    shake();
}




function alarm(flashes) {
    const light = document.querySelector('.light');
    const switchContainer = document.querySelector('.switch-container');

    light.style.animation = "scaleLight 30s infinite, alarmLight 1s infinite";
    switchContainer.classList.add('alarm-active');
    
    for (let i = 0; i < flashes; i++) {
        setTimeout(() => {
            let audio = new Audio('sounds/soundsnap/ALARM_Weapon_Charge.mp3');
            audio.volume = 0.7;
            audio.play();
        }, 1000 * i);
    }

    setTimeout(() => {
        light.style.animation = "scaleLight 30s infinite";
        switchContainer.classList.remove('alarm-active');
    }, flashes * 1000);

}


const alarmSwitch = document.getElementById('alarmSwitch');
alarmSwitch.addEventListener('change', function() {
    if (alarmSwitch.checked) {
        alarm(3); // Start the alarm with 3 flashes
    } else {
        stopAlarm(); // Stop the alarm
    }
});

