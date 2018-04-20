
const electron = require('electron');

window.onload = () => new App().start();

class App {
    start() {
        let closeButton = document.getElementById('closeButton');
        
        closeButton.onclick = () => electron.remote.getCurrentWindow().close();
        
        let image = document.getElementById('image');
        let svg = this.createImage(image);
        console.info(svg);
        let blob = new Blob([svg], {type: 'image/svg+xml'});
        let url = URL.createObjectURL(blob);
        image.src = url;
        console.info(url);
    }
    
    createImage(image) {
        const draw = SVG(image);
        draw.
            rect(100,100)
            .fill('#c13')
            .move(10,10);
        return draw.svg();
    }
}
