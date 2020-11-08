import { CssBaseline, NoSsr, ThemeProvider } from '@material-ui/core';
import * as React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import { Books } from 'views/Books/Books';
import { Welcome } from 'views/Welcome/Welcome';
import { QueryCache, ReactQueryCacheProvider } from 'react-query';
import { theme } from '../theme/index';
import { Layout } from './Layout/Layout';

const queryCache = new QueryCache();

const Application = () => (
  <>
    <CssBaseline />
    <NoSsr />
    <ReactQueryCacheProvider queryCache={queryCache}>
      <ThemeProvider theme={theme}>
        <HashRouter>
          <Switch>
            <Route path="/welcome" component={Welcome} />
            <Layout>
              <Route path="/" exact render={() => <p>test</p>} />
              <Route path="/books" exact component={Books} />
            </Layout>
          </Switch>
        </HashRouter>
      </ThemeProvider>
    </ReactQueryCacheProvider>
  </>
);

export default Application;
