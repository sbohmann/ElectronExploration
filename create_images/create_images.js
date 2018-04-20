const svgjs = require('svgjs')(window);

function createImage() {
    const g = svgjs();
    g.size(120, 120);
    g
        .rect(100, 100)
        .attr({ fill: '#f06'});
    return g.toString();
}

console.info("Creating images...");

let svg = createImage();
console.info(svg);
let blob = new Blob([svg], { type: 'image/svg+xml' });
let url = URL.createObjectURL(blob);
image.src = url;
console.info(url);
