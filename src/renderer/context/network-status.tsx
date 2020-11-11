import * as React from 'react';

const NetworkStatus = React.createContext<boolean>(true);

interface Props {
  children: React.ReactNode | React.ReactNode[];
}

export function NetworkStatusProvider({ children }: Props) {
  const [networkStatus, setNetworkStatus] = React.useState(() => navigator.onLine);
  function setOffline() {
    setNetworkStatus(false);
  }
  function setOnline() {
    setNetworkStatus(true);
  }

  React.useEffect(() => {
    window.addEventListener('online', setOnline);
    window.addEventListener('offline', setOffline);
    return () => {
      window.removeEventListener('online', setOnline);
      window.removeEventListener('offline', setOffline);
    };
  }, []);
  return <NetworkStatus.Provider value={networkStatus}>{children}</NetworkStatus.Provider>;
}

export function useNetworkStatus() {
  const networkStatus: boolean = React.useContext(NetworkStatus);

  return networkStatus;
}
