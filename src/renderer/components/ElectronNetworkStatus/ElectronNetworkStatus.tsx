import { ipcRenderer } from 'electron';
import * as React from 'react';
import { InsertAuthorMutationVariables, InsertBookMutationVariables } from 'src/renderer/generated/graphql';
import { useInsertAuthors } from 'views/Authors/queries/mutations';
import { useInsertBooks } from 'views/Books/queries/mutations';
import { saveDataLocally } from '../../utils/save-request';
import { SAVE_DATA, SET_NETWORK_STATUS } from '../../../events';
import { useNetworkStatus } from '../../context/network-status';
import { useInsertOfflineData } from './utils/insertOfflineData';

interface Props {
  children: React.ReactNode[] | React.ReactNode;
}

export function ElectronNetworkStatus({ children }: Props) {
  const networkStatus = useNetworkStatus();
  const [insertAuthors] = useInsertAuthors();
  const [insertBooks] = useInsertBooks();

  React.useEffect(() => {
    ipcRenderer.send(SET_NETWORK_STATUS, networkStatus);
  }, [networkStatus]);

  useInsertOfflineData(networkStatus, insertBooks, insertAuthors);

  async function saveData(_: any, data: InsertBookMutationVariables | InsertAuthorMutationVariables) {
    await saveDataLocally(data);
  }

  React.useEffect(() => {
    ipcRenderer.on(SAVE_DATA, saveData);
    return () => {
      ipcRenderer.off(SAVE_DATA, saveData);
    };
  }, []);
  return children;
}
