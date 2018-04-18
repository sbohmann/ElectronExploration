
electron = require('electron');

window.onload = start;

const minStepSize = 3;

function start() {
    let content = new Content();
    let repaintButton = document.getElementById('repaintButton');
    let closeButton = document.getElementById('closeButton');

    repaintButton.onclick = () => content.repaint();
    closeButton.onclick = () => electron.remote.getCurrentWindow().close();
}

class Content {
    constructor(gridWidth, gridHeight) {
        this.gridWidth = gridWidth;
        this.gridHeight = gridHeight;
        this.grid = Array(gridWidth * gridHeight);
        this.canvas = document.getElementById('content');
        window.onresize = () => { this.resized() };
        this.drawContent();
    }

    resized() {
        console.error('resized');
        this.drawContent();
    }

    repaint() {
        this.drawContent();
    }

    drawContent() {
        this.setCanvasSize();
        const w = this.canvas.width;
        const h = this.canvas.height;
        const c = this.canvas.getContext('2d');
        new ContentDrawer(c, w, h).run();
    }

    setCanvasSize() {
        this.canvas.width = this.canvas.clientWidth;
        this.canvas.height = this.canvas.clientHeight;
    }
}
