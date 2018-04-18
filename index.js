console.error(require.resolve('electron'));

const DEBUG = (process.argv[2] === "debug");

const electron = require('electron');
const path = require('path');
const url = require('url');

function createWindow() {
    let win = new electron.BrowserWindow({width: 800, height: 600});
    win.setMenu(null);

    if (DEBUG) {
        win.openDevTools();
    }

    win.loadURL(url.format({
        pathname: path.join(__dirname, 'sokoban/index.html'),
        protocol: 'file:',
        slashes: true
    }))
}

electron.app.on('ready', createWindow);
