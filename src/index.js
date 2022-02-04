import React, { Suspense, lazy } from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { store, persistor } from './app/store';
import { Provider } from 'react-redux';
// import * as serviceWorker from './serviceWorker';

import { PersistGate } from 'redux-persist/integration/react'
// const App = lazy(() => import('./App'));

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        {/* <Suspense fallback={<div className="loader" />}> */}
        <App />
        {/* </Suspense> */}
      </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
