import { CssBaseline, NoSsr, ThemeProvider } from '@material-ui/core';
import * as React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import { Books } from 'views/Books/Books';
import { Welcome } from 'views/Welcome/Welcome';
import { QueryCache, ReactQueryCacheProvider } from 'react-query';
import { NewBook } from 'views/Books/NewBook';
import { NewAuthor } from 'views/Authors/NewAuthor';
import { Authors } from 'views/Authors/Authors';
import { ExportToPDF } from 'views/export/ExportToPDF';
import { theme } from '../theme/index';
import { Layout } from './Layout/Layout';
import { NetworkStatusProvider } from '../context/network-status';
import { ElectronNetworkStatus } from './ElectronNetworkStatus/ElectronNetworkStatus';

const queryCache = new QueryCache({ defaultConfig: { queries: { refetchOnWindowFocus: false, retry: 0 } } });

const Application = () => (
  <>
    <CssBaseline />
    <NoSsr />
    <ReactQueryCacheProvider queryCache={queryCache}>
      <ThemeProvider theme={theme}>
        <NetworkStatusProvider>
          {/* @ts-ignore */}
          <ElectronNetworkStatus>
            <HashRouter>
              <Switch>
                <Route path="/welcome" component={Welcome} />
                <Route path="/export" component={ExportToPDF} />
                <Layout>
                  <Route path="/books" exact component={Books} />
                  <Route path="/books/new" component={NewBook} />
                  <Route path="/authors" exact component={Authors} />
                  <Route path="/authors/new" component={NewAuthor} />
                </Layout>
              </Switch>
            </HashRouter>
          </ElectronNetworkStatus>
        </NetworkStatusProvider>
      </ThemeProvider>
    </ReactQueryCacheProvider>
  </>
);

export default Application;
