import { BrowserWindow, Menu, Tray, Notification } from 'electron';
import path from 'path';
import { autoUpdater } from 'electron-updater';

let tray: Tray;
export const iconPath = path.join(
  __dirname,
  process.env.NODE_ENV === 'development' ? '../static/icon.png' : './static/icon.png',
);

export function setTray(win: BrowserWindow) {
  tray = new Tray(iconPath);
  const contextMenu = Menu.buildFromTemplate([
    {
      label: `Check for updates...`,
      id: 'update-id',
      click() {
        autoUpdater.checkForUpdates();
        if (process.platform === 'win32') {
          tray.displayBalloon({
            iconType: 'info',
            content: 'The app is checking for updates in the background',
            title: 'Checking for updates....',
          });
        } else {
          new Notification({
            title: 'Checking for updates...',
            body: 'The app is checking for updates in the background',
            icon: iconPath,
          }).show();
        }
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
