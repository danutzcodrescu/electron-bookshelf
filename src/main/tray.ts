import { BrowserWindow, Menu, Tray } from 'electron';
import path from 'path';
import { autoUpdater } from 'electron-updater';

let tray: Tray;

export function setTray(win: BrowserWindow) {
  tray = new Tray(
    path.join(__dirname, process.env.NODE_ENV === 'development' ? '../static/icon.png' : './static/icon.png'),
  );
  const contextMenu = Menu.buildFromTemplate([
    {
      label: `Check for updates...`,
      id: 'update-id',
      click() {
        autoUpdater.checkForUpdates();
      },
    },
    {
      label: 'Restart to apply update',
      id: 'restart',
      click() {
        autoUpdater.quitAndInstall();
      },
      visible: false,
    },
    {
      label: 'Exit',
      role: 'quit',
    },
  ]);
  tray.setToolTip('Bookshelf application');
  tray.setContextMenu(contextMenu);
  tray.on('click', () => {
    win.show();
  });
  return { tray, contextMenu };
}
