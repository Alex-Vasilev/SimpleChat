import React, { PureComponent } from 'react';
import { Provider } from 'react-redux';

import App from './screens';
import configureStore from './store';
import { configureSocket } from './store/socket'
// import configureLocalization, { fetchLocalization } from './localization';

// configureLocalization();
// fetchLocalization();

const store = configureStore();
configureSocket(store);

export default class Root extends PureComponent {

  render() {
    return (
      <Provider store={store}>
        <App />
      </Provider>
    );
  }
}
