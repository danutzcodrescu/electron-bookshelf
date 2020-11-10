import { Menu, Tray } from 'electron';
import path from 'path';

export function setTray() {
  const tray = new Tray(path.resolve(__dirname, './build/icon.png'));
  const contextMenu = Menu.buildFromTemplate([{ label: 'Exit', role: 'quit' }]);
  tray.setToolTip('Bookshelf application');
  tray.setContextMenu(contextMenu);
}
