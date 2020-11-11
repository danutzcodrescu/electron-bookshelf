import { app, BrowserWindow } from 'electron';
import * as path from 'path';
import * as url from 'url';
import { checkForUpdates } from './autoUpdater';
import { bootstrap } from './db';
import { exportToPDF } from './exportToPDF';
import { offlineFunctionality } from './network-status';
import { setTray } from './tray';

let win: BrowserWindow | null;

const installExtensions = async () => {
  const installer = require('electron-devtools-installer');
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
  const extensions = ['REACT_DEVELOPER_TOOLS'];

  return Promise.all(extensions.map((name) => installer.default(installer[name], forceDownload))).catch(console.log);
};

const createWindow = async () => {
  if (process.env.NODE_ENV !== 'production') {
    await installExtensions();
  }

  win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: { nodeIntegration: true, preload: path.join(__dirname, 'inject.js') },
  });

  if (process.env.NODE_ENV !== 'production') {
    process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = '1'; // eslint-disable-line require-atomic-updates
    win.loadURL(`http://localhost:2003/#/books`);
  } else {
    win.loadURL(
      url.format({
        pathname: path.join(__dirname, 'index.html'),
        protocol: 'file:',
        slashes: true,
        hash: '#/books',
      }),
    );
  }

  if (process.env.NODE_ENV !== 'production') {
    // Open DevTools, see https://github.com/electron/electron/issues/12438 for why we wait for dom-ready
    win.webContents.once('dom-ready', () => {
      win!.webContents.openDevTools();
    });
  }

  win.on('closed', () => {
    win = null;
  });
  exportToPDF(win);
  const { tray, contextMenu } = setTray(win);
  offlineFunctionality(win);
  if (process.env.NODE_ENV === 'production') checkForUpdates(tray, contextMenu);
};

app.on('ready', () => {
  // for windows 10 notifications
  app.setAppUserModelId(process.execPath);
  createWindow();
  bootstrap();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (win === null) {
    createWindow();
  }
});
