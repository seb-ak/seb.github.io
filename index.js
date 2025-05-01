
let Vertical = false
let originalOrder = [];
let newOrder = [];


function switchVertical() {
    const gridContainer = document.querySelector('.grid-container');
    const body = document.querySelector(`body`)
    if (Vertical) {
        gridContainer.style.display = "block";
        newOrder.forEach(item => gridContainer.appendChild(item));
        body.style.overflowY = `visible`

    } else {
        gridContainer.style.display = "grid";
        originalOrder.forEach(item => gridContainer.appendChild(item));
        body.style.overflowY = `hidden`

    }
}
function trySwitchVertical() {
    const aspectRatio = window.innerWidth / window.innerHeight

    if (Vertical != aspectRatio<1.8) {
        Vertical = aspectRatio<1.8
        switchVertical()
        document.querySelectorAll('.grid-item')[Vertical? 0:5].click();
    }
}


document.addEventListener('DOMContentLoaded', () => {
    const gridContainer = document.querySelector('.grid-container');
    
    originalOrder = Array.from(gridContainer.children);
    newOrder = Array.from(gridContainer.children)
        .map(item => {
            if (!item.id) item.id = 100;
            return item;
        })
        .sort((a, b) => parseInt(a.id) - parseInt(b.id));

    const aspectRatio = window.innerWidth / window.innerHeight
    Vertical = aspectRatio<1.8


    window.addEventListener('resize', () => {
        trySwitchVertical()
    });

    const gridItems = document.querySelectorAll('.grid-item');

    const containerWidth = 90
    const containerHeight = 40

    const selectedWidth = 40;
    const selectedHeight = 20;
    const borderWidth = 1;
    const gapWidth = 1;
    const gapHeight = 1;

    const columns = 4;
    const rows = 4;

    const totalBorderWidth = borderWidth * 2 * columns;
    const totalGapWidth = gapWidth * (columns - 1);
    const totalBorderHeight = borderWidth * 2 * rows;
    const totalGapHeight = gapHeight * (rows - 1);

    const normalWidth = (containerWidth - selectedWidth - totalBorderWidth - totalGapWidth) / (columns - 1);
    const normalHeight = (containerHeight - selectedHeight - totalBorderHeight - totalGapHeight) / (rows - 1);

    boop()

    gridItems.forEach((item, index) => {
        item.addEventListener('click', () => {

            const rowIndex = Math.floor(index / columns);
            const colIndex = index % columns;

            const clicked = item.classList.contains("clicked")

            gridItems.forEach((i, idx) => {
                const iRowIndex = Math.floor(idx / columns);
                const iColIndex = idx % columns;

                const img = i.querySelector('img');

                if (Vertical) {
                    i.style.height = (item === i) ? `${selectedHeight}vw` : `${normalHeight}vw`;
                    i.style.width = `${84/2}vw`;
                    i.style.transform = "scale(2)"
                    i.style.marginBottom = (item === i) ? `24vw` : `7vw`;

                    if (item !== i) {
                        if (img) img.classList.add('hidden');
                    } else {
                        if (img) img.classList.remove('hidden');
                    }
                } else {
                    if (i.classList.contains("qrcode")) {
                        i.style.height = (iRowIndex === rowIndex) ? `${selectedHeight+2}vw` : `${normalHeight+2}vw`;
                        i.style.width = (iColIndex === colIndex) ? `${selectedWidth+2}vw` : `${normalWidth+2}vw`;
                    } else {
                        i.style.height = (iRowIndex === rowIndex) ? `${selectedHeight}vw` : `${normalHeight}vw`;
                        i.style.width = (iColIndex === colIndex) ? `${selectedWidth}vw` : `${normalWidth}vw`;
                    }
                    i.style.transform = "scale(1)"
                    i.style.marginBottom = 0;

                    if (iRowIndex != rowIndex) {
                        if (img) img.classList.add('hidden');
                    } else {
                        if (img) img.classList.remove('hidden');
                    }
                }

                i.classList.remove('clicked');
            });
            
            item.classList.add('clicked');
            
            if (clicked) return

            boop()
            newOffset()
            moveTriangles(lastX, lastY);

        });
    });

    switchVertical()
    document.querySelectorAll('.grid-item')[Vertical? 0:5].click();

});

function move(x,y) {
    let i = 0

    const gridItems = document.querySelectorAll('.grid-item');
    gridItems.forEach((item, index) => {
        if (item.classList.contains("clicked")) {
            i = index
        }
    });

    if (Vertical) {
        playClick()
        document.querySelectorAll('.grid-item')[i+x+y].click();

    } else {
        if ((i%4==0 && x==-1) || (i%4==3 && x==1)) {
            x=0
            playClick()
        }
        if ((i+x+(y*4))<0 || (i+x+(y*4))>15) {
            playClick()
        }
        document.querySelectorAll('.grid-item')[(i+x+(y*4))].click();
    }

}

document.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'ArrowUp':
            move(0,-1);
            break;
        case 'ArrowDown':
            move(0,1);
            break;
        case 'ArrowLeft':
            move(-1,0);
            break;
        case 'ArrowRight':
            move(1,0);
            break;
    }
});





const triangles = document.querySelectorAll('.triangle');


let offsetX = []
let offsetY = []
function newOffset() {
    offsetX = [Math.random()-0.5,Math.random()-0.5,Math.random()-0.5]
    offsetY = [Math.random()-0.5,Math.random()-0.5,Math.random()-0.5]
}


let lastX = 0
let lastY = 0
function moveTriangles(mouseX, mouseY) {
    let x = (mouseX - window.innerWidth/2)/window.innerWidth*5;
    let y = (mouseY - window.innerHeight/2)/window.innerHeight*5;
    if (Vertical) {
        [x, y] = [y, x];
    }

    triangles.forEach((triangle, i) => {

        triangle.style.zIndex = Math.floor(-1 - (offsetX[i]+1)*10);

        let translateX = (x*2+offsetX[i]*5)*(1+offsetY[i]) + [-30, 0, 30][i];
        let translateY = (y*10+offsetY[i]*20)*(1+offsetX[i])

        if (Vertical) {
            [translateX, translateY] = [translateY, translateX];
        }

        const rotate = x*1/offsetY[i] + offsetX[i]*20;
        const scale = 3.5+offsetX[i]*offsetX[i]*offsetX[i]*20;

        triangle.animate({
            transform: `translate(${translateX}vw, ${translateY}vw) rotate(${rotate}deg) scale(${scale})`,
            
        }, {
            duration: 5000*(offsetX[i]+1),
            easing: 'ease-in-out',
            fill: 'forwards'
        });
    });
}



document.addEventListener('mousemove', (event) => {

    moveTriangles(event.clientX, event.clientY);

    lastX = event.clientX
    lastY = event.clientY

});

















const audioContext = new (window.AudioContext || window.webkitAudioContext)();

function playSwoosh() {
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(100, audioContext.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(200, audioContext.currentTime + 0.3); // Quicker swoosh

    gainNode.gain.setValueAtTime(0.4, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3); // Quicker fade out

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.start();
    oscillator.stop(audioContext.currentTime + 0.3);
}

function playClick() {
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(200, audioContext.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(1, audioContext.currentTime + 0.3); // Quicker swoosh

    gainNode.gain.setValueAtTime(0.4, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3); // Quicker fade out

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.start();
    oscillator.stop(audioContext.currentTime + 0.3);
}

function boop() {
    playSwoosh();
    setTimeout(playClick, 300);
}