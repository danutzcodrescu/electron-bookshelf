import { BrowserWindow, dialog, ipcMain } from 'electron';
import fs from 'fs';
import path from 'path';
import url from 'url';
import { format } from 'date-fns';
import { DATA_RENDERED, EXPORT_TO_PDF, EXPORT_TO_PDF_COMPLETED, LOAD_DATA_FOR_PDF } from '../events';
import { AuthorDetailsFragment, BookDetailsFragment } from '../renderer/generated/graphql';

let exportWindow: BrowserWindow | null;

function closePDFWindow(
  window: BrowserWindow | null,
  mainWindow: BrowserWindow,
  filePath?: string | undefined,
  status?: 'success' | 'error',
) {
  window?.close();
  // eslint-disable-next-line no-param-reassign
  window = null;
  mainWindow.webContents.send(EXPORT_TO_PDF_COMPLETED, { filePath, status });
}

function styleDOMElement() {
  const container = document.querySelector<HTMLDivElement>('#app')!;
  container.style.padding = '0 30px';
  container.style.backgroundColor = '#fff';
}

export function exportToPDF(win: BrowserWindow) {
  ipcMain.on(EXPORT_TO_PDF, async (event, data: AuthorDetailsFragment[] | BookDetailsFragment[]) => {
    exportWindow = new BrowserWindow({
      width: 1000,
      height: 660,
      webPreferences: {
        nodeIntegration: true,
      },
      show: false,
    });
    if (process.env.NODE_ENV === 'development') {
      exportWindow.loadURL(`http://localhost:2003/#/export`);
    } else {
      exportWindow.loadURL(
        url.format({
          pathname: path.join(__dirname, 'index.html'),
          protocol: 'file:',
          hash: '#/export',
          slashes: true,
        }),
      );
    }
    exportWindow.webContents.once('did-finish-load', () => {
      exportWindow?.webContents.executeJavaScript(
        `window.generateElements=${styleDOMElement};window.generateElements()`,
        true,
      );
      exportWindow!.webContents.send(LOAD_DATA_FOR_PDF, data);
    });
    exportWindow?.once('closed', () => {
      exportWindow = null;
    });
  });

  ipcMain.on(DATA_RENDERED, async (_, type: 'books' | 'authors') => {
    const resp = await dialog.showSaveDialog(exportWindow!, {
      title: 'Save as PDF',
      defaultPath: `*/${format(new Date(), 'yyyy-MM-dd')}-${type}.pdf`,
      filters: [{ name: 'PDF', extensions: ['pdf'] }],
    });
    if (!resp.canceled && resp.filePath) {
      try {
        const buffer = await exportWindow?.webContents.printToPDF({ pageSize: 'A4', printBackground: true });
        fs.writeFileSync(resp.filePath, buffer!);
        console.log(`PDF: created succesfully`);
        closePDFWindow(exportWindow, win, resp.filePath, 'success');
      } catch (e) {
        console.log(`PDF: Error creat pdf: ${JSON.stringify(e)}`);
        closePDFWindow(exportWindow, win, resp.filePath, 'error');
      }
    } else {
      closePDFWindow(exportWindow, win);
    }
  });
}
