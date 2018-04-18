electron = require('electron');

window.onload = start;

const cellWidth = 50;
const cellHeight = 50;

function start() {
    let content = new Content();
    let repaintButton = document.getElementById('repaintButton');
    let closeButton = document.getElementById('closeButton');
    
    repaintButton.onclick = () => content.repaint();
    closeButton.onclick = () => electron.remote.getCurrentWindow().close();
}

class Grid {
    constructor(width, height) {
        this.width = width;
        this.height = height;
        this.data = new Int8Array(width * height);
    }
    
    get(x, y) {
        this.checkCoordinates(x, y);
        return this.data[y * this.width + x];
    }
    
    set(x, y, value) {
        this.checkCoordinates(x, y);
        this.data[y * this.width + x] = value;
    }
    
    checkCoordinates(x, y) {
        if (x < 0 || y < 0 || x >= this.width || y >= this.height) {
            throw new RangeError("Coordinates out of bounds - x: " + x + ", y: " + y + ", width: " + this.width + ", height: " + this.height);
        }
    }
}

class Content {
    constructor(gridWidth, gridHeight) {
        this.grid = new Grid(gridWidth, gridHeight);
        this.canvas = document.getElementById('content');
        window.onresize = () => {
            this.resized()
        };
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
        new DrawGrid(c, w, h, grid).run();
    }
    
    setCanvasSize() {
        this.canvas.width = this.canvas.clientWidth;
        this.canvas.height = this.canvas.clientHeight;
    }
}

class DrawGrid {
    constructor(c, width, height, grid) {
        this.c = c;
        this.width = width;
        this.height = height;
        this.grid = grid;
        this.setOffsets();
    }
    
    setOffsets() {
        const gridWidthInPixels = this.grid.width * cellWidth;
        const gridHeightInPixels = this.grid.height * cellHeight;
        this.xOffset = (width - gridWidthInPixels) / 2;
        this.yOffset = (height - gridHeightInPixels) / 2;
    }
    
    run() {
        for (let y = 0; y < this.h; ++y) {
            for (let x = 0; x < this.w; ++x) {
            
            }
        }
    }
}
