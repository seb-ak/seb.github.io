document.addEventListener('DOMContentLoaded', () => {
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

            gridItems.forEach((i, idx) => {
                const iRowIndex = Math.floor(idx / columns);
                const iColIndex = idx % columns;

                const xRow = Math.abs(rowIndex-iRowIndex)
                const xCol = Math.abs(colIndex-iColIndex)

                i.style.height = (iRowIndex === rowIndex) ? `${selectedHeight}vw` : `${normalHeight}vw`;
                i.style.width = (iColIndex === colIndex) ? `${selectedWidth}vw` : `${normalWidth}vw`;

                i.classList.remove('clicked');
            });

            item.classList.add('clicked');
            boop()

        });
    });

    document.querySelectorAll('.grid-item')[5].click();
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
    setTimeout(playClick, 300); // Adjusted delay for quicker swoosh
}