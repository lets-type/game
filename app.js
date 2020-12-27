const { app, BrowserWindow, Menu } = require('electron')
const fs = require("fs")

function createWindow() {
    const win = new BrowserWindow({
        width: 1024,
        height: 720,
        title: "Let's TYPE!",
        icon: "icon.ico",
        webPreferences: {
            nodeIntegration: true
        },
        backgroundColor: "#8bc34a",
        minWidth: 640,
        minHeight: 480
    })

    win.setMenu(null)
    win.loadFile(`${__dirname}/view/index.html`)
    win.openDevTools()
}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow()
    }
})
