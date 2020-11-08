import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { ReactQueryDevtools } from 'react-query-devtools';
import Application from './components/Application';

// Render components
const render = (Component: () => JSX.Element) => {
  ReactDOM.render(
    <>
      <Component />
      {process.env.NODE_ENV === 'development' ? <ReactQueryDevtools initialIsOpen /> : null}
    </>,
    document.querySelector('#app'),
  );
};

render(Application);

if (module.hot) {
  // @ts-ignore
  module.hot.accept('./components/Application.tsx', () => {
    // in all other cases - re-require App manually
    // eslint-disable-next-line global-require
    render(require('./components/Application.tsx'));
  });
}
