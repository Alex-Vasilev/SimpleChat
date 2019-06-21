import React from 'react';
import { Provider } from 'react-redux';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import App from './screens';
import configureStore from './store';
import { configureSocket } from './store/socket';


const store = configureStore();
configureSocket(store);
const persistor = persistStore(store);

// persistor.purge();

const Root = () => (
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
);

export default Root;
