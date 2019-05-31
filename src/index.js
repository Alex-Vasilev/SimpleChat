import React, { PureComponent } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { persistStore } from 'redux-persist';
import App from './screens';
import configureStore from './store';
import { configureSocket } from './store/socket'
// import configureLocalization, { fetchLocalization } from './localization';

// configureLocalization();
// fetchLocalization();

const store = configureStore();
configureSocket(store);
const persistor = persistStore(store);

export default class Root extends PureComponent {

  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <App />
        </PersistGate>
      </Provider>
    );
  }
}
