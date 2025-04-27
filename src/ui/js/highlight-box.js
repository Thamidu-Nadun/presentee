const colors = [
    'linear-gradient(45deg, #ff00cc, #3333ff) 1',
    'linear-gradient(45deg, #50c9c3, #96deda) 1',
    'linear-gradient(45deg, #c21500, #ffc500) 1',
    'linear-gradient(45deg, #4b6cb7, #182848) 1',
    'linear-gradient(45deg, #fc354c, #0abfbc) 1',
];

const fade_time = 5 * 1000;
let isSelecting = false;
let startX = 0;
let startY = 0;
let hideTimeout;

const selectionBox = document.getElementById('selectionBox');

window.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.shiftKey && e.key === '1') {
        hideSelectionBox();
    }
});

// Start selection
window.addEventListener('mousedown', (e) => {
    if (e.ctrlKey && e.shiftKey) {
        document.body.style.cursor = 'crosshair';
        isSelecting = true;
        startX = e.clientX;
        startY = e.clientY;
        selectionBox.style.left = `${startX}px`;
        selectionBox.style.top = `${startY}px`;
        selectionBox.style.width = '0px';
        selectionBox.style.height = '0px';
        selectionBox.style.display = 'block';
        selectionBox.style.opacity = '1';
        selectionBox.style.animation = 'none';
        selectionBox.style.borderRadius = '25px';
        var color = getColor();
        selectionBox.style.borderImage = color;
        void selectionBox.offsetWidth;
        selectionBox.style.animation = '';
        clearTimeout(hideTimeout);
    }
});
// Resize box as mouse moves
window.addEventListener('mousemove', (e) => {
    if (!isSelecting) return;
    const currentX = e.clientX;
    const currentY = e.clientY;
    const width = Math.abs(currentX - startX);
    const height = Math.abs(currentY - startY);
    selectionBox.style.width = `${width}px`;
    selectionBox.style.height = `${height}px`;
    selectionBox.style.left = `${Math.min(startX, currentX)}px`;
    selectionBox.style.top = `${Math.min(startY, currentY)}px`;
});

// Finish selection
window.addEventListener('mouseup', (e) => {
    if (isSelecting) {
        isSelecting = false;
        document.body.style.cursor = 'default';
        hideTimeout = setTimeout(() => {
            startFadeOut();
        }, fade_time);
    }
});

// Start fade out
function startFadeOut() {
    selectionBox.style.animation = 'fade-out 1s ease forwards';
    setTimeout(() => {
        selectionBox.style.display = 'none';
    }, 1000);
}

// Manual hide
function hideSelectionBox() {
    clearTimeout(hideTimeout);
    startFadeOut();
}


let item = 0;
const getColor = () => {
    const color = colors[item];
    item++;
    if (item >= colors.length) {
        item = 0;
    }
    return color;
}