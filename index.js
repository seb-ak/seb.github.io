document.addEventListener('DOMContentLoaded', () => {
    const gridItems = document.querySelectorAll('.grid-item');

    const containerWidth = 90
    const containerHeight = 40

    const selectedWidth = 30;
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

    gridItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            const rowIndex = Math.floor(index / columns);
            const colIndex = index % columns;

            gridItems.forEach((i, idx) => {
                const iRowIndex = Math.floor(idx / columns);
                const iColIndex = idx % columns;

                

                i.style.height = (iRowIndex === rowIndex) ? `${selectedHeight}vw` : `${normalHeight}vw`;
                i.style.width = (iColIndex === colIndex) ? `${selectedWidth}vw` : `${normalWidth}vw`;

                i.classList.remove('clicked');
            });

            item.classList.add('clicked');
        });
    });

    document.querySelectorAll('.grid-item')[5].click();
});

