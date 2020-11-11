import { BrowserWindow, ipcMain, session } from 'electron';
import { StringDecoder } from 'string_decoder';
import { API_ENDPOINT } from '../constants';
import { SET_NETWORK_STATUS, SAVE_DATA } from '../events';

let networkStatus: 'online' | 'offline' = 'online';

export function offlineFunctionality(win: BrowserWindow) {
  ipcMain.on(SET_NETWORK_STATUS, (_, value: boolean) => {
    networkStatus = value ? 'online' : 'offline';
  });

  // eslint-disable-next-line consistent-return
  session.defaultSession.webRequest.onBeforeRequest({ urls: [API_ENDPOINT] }, (details, callback) => {
    if (details.method === 'POST' && networkStatus === 'offline' && details.uploadData.length) {
      const decoder = new StringDecoder('utf8');
      const action = JSON.parse(decoder.write(details.uploadData[0].bytes));
      if (action.query.includes('mutation')) {
        win.webContents.send(SAVE_DATA, action.variables);
      }
      return callback({ cancel: true });
    }
    callback({ cancel: false });
  });
}
