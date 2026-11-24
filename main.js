const { app, BrowserWindow, Menu } = require('electron');
const path = require('path');

function crear() {
  const w = new BrowserWindow({
    width: 480, height: 860, minWidth: 360, minHeight: 600,
    backgroundColor: '#050505', title: 'Kazzly Diary', autoHideMenuBar: true,
    webPreferences: { contextIsolation: true }
  });
  if (process.platform !== 'darwin') Menu.setApplicationMenu(null);
  w.loadFile(path.join(__dirname, 'www', 'index.html'));
}

app.whenReady().then(() => {
  crear();
  app.on('activate', () => { if (!BrowserWindow.getAllWindows().length) crear(); });
});
app.on('window-all-closed', () => { if (process.platform !== 'darwin') app.quit(); });
