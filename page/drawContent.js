
window.onload = start;

const minStepSize = 3;

function start() {
    new Content();
}

class Content {
    constructor() {
        this.canvas = document.getElementById('content');
        window.onresize = () => { this.resized() };
        this.drawContent();
    }

    resized() {
        console.error('resized');
        this.drawContent();
    }

    drawContent() {
        const before = window.performance.now();
        this.drawContentImpl();
        const after = window.performance.now();
        reportDelay(before, after, "drawContent");
    }

    drawContentImpl() {
        console.error('drawing content...');
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

class ContentDrawer {
    constructor(c, w, h) {
        this.c = c;
        this.w = w;
        this.h = h;
        this.numSteps = ContentDrawer.calculateNumberOfSteps(w, h);

    }

    run() {
        const before = window.performance.now();
        for (let index = 0; index <= this.numSteps; ++index) {
            const x = index * this.w / this.numSteps;
            const y = index * this.h / this.numSteps;
            this.c.beginPath();
            this.drawLine(this.c, x, 0, this.w, y);
            this.drawLine(this.c, x, 0, 0, this.h - y);
            this.drawLine(this.c, x, this.h, 0, y);
            this.drawLine(this.c, x, this.h, this.w, this.h - y);
            this.c.stroke();
        }
        const after = window.performance.now();
        const text = "deltaT: " + (after - before) + " ms";
        this.c.fillStyle = 'blue';
        this.c.font = '20px Helvetica';
        this.c.textAlign = 'center';
        this.c.fillText(text, this.w / 2, this.h / 2)
    }

    drawLine(c, x1, y1, x2, y2) {
        this.c.moveTo(x1, y1);
        this.c.lineTo(x2, y2);
    }

    static calculateNumberOfSteps(w, h) {
        const xSteps = Math.floor(w / minStepSize);
        const ySteps = Math.floor(h / minStepSize);
        return Math.min(xSteps, ySteps);
    }
}

function reportDelay(before, after, context) {
    console.info("deltaT for " + context + ": " + (after - before));
}
