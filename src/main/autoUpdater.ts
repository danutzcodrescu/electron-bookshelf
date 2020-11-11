import { autoUpdater } from 'electron-updater';

interface ProgressInfo {
  bytesPerSecond: string;
  percent: string;
  total: string;
  transferred: string;
}

export function checkForUpdates() {
  autoUpdater.checkForUpdatesAndNotify();
}

autoUpdater.on('checking-for-update', () => {
  console.log('Checking for update...');
});

autoUpdater.on('update-available', () => {
  console.log('Update available.');
});
autoUpdater.on('update-not-available', () => {
  console.log('Update not available.');
});

autoUpdater.on('error', (err) => {
  console.log(`Error in auto-updater. ${err}`);
});

autoUpdater.on('update-downloaded', () => {
  console.log('Update succesfully downloaded');
});

autoUpdater.on('download-progress', (progressObj: ProgressInfo) => {
  console.log(
    `Downloaded ${progressObj.percent}% -> ${parseFloat(progressObj.transferred) * Math.pow(10, 6)}/${
      parseFloat(progressObj.total) * Math.pow(10, 6)
    } at ${parseFloat(progressObj.bytesPerSecond) * Math.pow(10, 6)}`,
  );
});

autoUpdater.on('update-downloaded', () => {
  console.log('Update downloaded');
});
