import { ipcRenderer } from 'electron';
import { OFFLINE_SEARCH } from '../../../../events';

export async function offlineSearch(type: 'books' | 'authors', query: string) {
  const data = await ipcRenderer.invoke(OFFLINE_SEARCH, type, query);
  return data;
}
