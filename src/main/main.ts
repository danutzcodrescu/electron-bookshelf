import { app, BrowserWindow } from 'electron';
import * as path from 'path';
import * as url from 'url';
import log from 'electron-log';
import Store from 'electron-store';
import debounce from 'lodash.debounce';
import { checkForUpdates } from './autoUpdater';
import { bootstrap } from './db';
import { exportToPDF } from './exportToPDF';
import { offlineFunctionality } from './network-status';
import { setTray } from './tray';

const store = new Store();

if (process.env.NODE_ENV === 'development') {
  log.transports.file.level = false;
}

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
  const sizes: any = store.get('size');
  win = new BrowserWindow({
    width: sizes?.[0] || 800,
    height: sizes?.[1] || 600,
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

  if (process.platform === 'win32') {
    // for windows 10 notifications
    app.setAppUserModelId(
      process.env.NODE_ENV === 'development' ? process.execPath : process.env.npm_package_build_appId!,
    );
  }

  win.on(
    'resize',
    debounce((e: any) => {
      store.set('size', (e.sender as BrowserWindow).getSize());
    }, 500),
  );
};

app.on('ready', async () => {
  await bootstrap();
  createWindow();
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

app.on('web-contents-created', (_, contents) => {
  // security feature -> prevent navigation to other domains
  contents.on('will-navigate', (e) => {
    e.preventDefault();
  });
});
