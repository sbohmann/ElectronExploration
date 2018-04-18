electron = require('electron');

window.onload = () => new App().start();

const cellWidth = 50;
const cellHeight = 50;

const cellImages = {};

class App {
    start() {
        this.content = new Content(20, 20);
        this.repaintButton = document.getElementById('repaintButton');
        this.closeButton = document.getElementById('closeButton');
        
        this.loadCellImages();
        
        this.repaintButton.onclick = () => this.content.repaint();
        this.closeButton.onclick = () => electron.remote.getCurrentWindow().close();
    }
    
    loadCellImages()
    {
        cellImages[1] = this.loadImage("wall.png");
    }
    
    loadImage(path)
    {
        const result = new Image();
        result.src = path;
        result.onload = () => this.content.repaint();
        return result;
    }
}

class Grid {
    constructor(width, height) {
        this.width = width;
        this.height = height;
        this.data = new Int8Array(width * height);
        
        this.dummyInit();
    }
    
    dummyInit() {
        const xCenter = this.width / 2;
        const yCenter = this.width / 2;
        for (let x = 0; x < this.width; ++x) {
            for (let y = 0; y < this.height; ++y) {
                const deltaX = x - xCenter;
                const deltaY = y - yCenter;
                const distanceSquared = deltaX ** 2 + deltaY ** 2;
                console.info(distanceSquared);
                if (distanceSquared > 5 && distanceSquared < 15) {
                    this.set(x, y, 1);
                }
            }
        }
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
        new DrawGrid(c, w, h, this.grid).run();
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
        this.xOffset = (this.width - gridWidthInPixels - cellWidth) / 2;
        this.yOffset = (this.height - gridHeightInPixels - cellHeight) / 2;
    }
    
    run() {
        for (let gridY = 0; gridY < this.grid.height; ++gridY) {
            for (let gridX = 0; gridX < this.grid.width; ++gridX) {
                this.drawCell(gridX, gridY);
            }
        }
    }
    
    drawCell(gridX, gridY) {
        const x = this.xOffset + cellWidth * gridX;
        const y = this.yOffset + cellHeight * gridY;
        this.drawCellImage(x, y, this.grid.get(gridX, gridY));
    }
    
    drawCellImage(x, y, cellType) {
        const cellImage = cellImages[cellType];
        if (cellImage != null) {
            this.c.drawImage(cellImage, x, y);
        }
    }
}
