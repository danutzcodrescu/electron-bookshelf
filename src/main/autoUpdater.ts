import { Menu, Tray, Notification } from 'electron';
import { autoUpdater } from 'electron-updater';

interface ProgressInfo {
  bytesPerSecond: string;
  percent: string;
  total: string;
  transferred: string;
}

export async function checkForUpdates(tray: Tray, menu: Menu) {
  autoUpdater.checkForUpdatesAndNotify();
  const item = menu.items.find((menuItem) => menuItem.id === 'update-id');
  const restartItem = menu.items.find((menuItem) => menuItem.id === 'restart');

  autoUpdater.on('checking-for-update', () => {
    console.log('Checking for update...');
  });

  autoUpdater.on('update-available', () => {
    console.log('Update available.');
    if (item) {
      item.enabled = false;
      item.label = 'Downloading update...';
      // you need to create a new menu if you change the label of a MenuItem. It updates itself if you change enabled/visibility of the item, but not for the item. Documented in https://github.com/electron/electron/issues/2717 and https://github.com/electron/electron/issues/12633
      tray.setContextMenu(Menu.buildFromTemplate(menu.items));
    }
  });
  autoUpdater.on('update-not-available', () => {
    console.log('Update not available.');
  });

  autoUpdater.on('error', (err) => {
    console.log(`Error in auto-updater. ${err}`);
  });

  autoUpdater.on('update-downloaded', () => {
    console.log('Update succesfully downloaded');
    if (item) {
      item.visible = false;
    }
    if (restartItem) {
      restartItem.visible = true;
    }
    tray.displayBalloon({
      iconType: 'info',
      content: 'Please restart the app to apply the update',
      title: 'Complete update',
    });
    new Notification({ title: 'Complete the update', body: 'Please restart the app to apply the update' }).show();
  });

  autoUpdater.on('download-progress', (progressObj: ProgressInfo) => {
    console.log(
      `Downloaded ${progressObj.percent}% -> ${parseFloat(progressObj.transferred) * Math.pow(10, 6)}/${
        parseFloat(progressObj.total) * Math.pow(10, 6)
      } at ${parseFloat(progressObj.bytesPerSecond) * Math.pow(10, 6)}`,
    );
  });
}
