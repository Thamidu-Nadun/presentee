const { app, BrowserWindow, Menu, globalShortcut } = require('electron');
const path = require('path');

const createWindow = () => {
    const window = new BrowserWindow({
        show: false,
        fullscreen: true,
        transparent: true,
        alwaysOnTop: true,
        frame: false,
        movable: false,
        resizable: false,
        icon: path.join(__dirname, '../public/icon.png'),
    });
    window.maximize();
    window.show();

    window.loadFile(path.join(__dirname, 'ui/index.html'));
}

app.whenReady().then(() => {
    createWindow();

    globalShortcut.register('Alt+Shift+W', () => {
        if (window) {
            if (window.isMinimized()) {
                window.restore();
                window.focus();
            } else {
                window.minimize();
            }
        }
    });

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    });
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
});

app.on('will-quit', () => {
    globalShortcut.unregisterAll();
});