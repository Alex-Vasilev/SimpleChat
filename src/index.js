import React, { PureComponent } from 'react';
import { Provider } from 'react-redux';

import App from './screens';
import configureStore from './store';

const store = configureStore();

// import configureLocalization, { fetchLocalization } from './localization';

// configureLocalization();
// fetchLocalization();

export default class Root extends PureComponent {

  render() {
    return (
      <Provider store={store}>
        <App />
      </Provider>
    );
  }
}
