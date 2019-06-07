import isPlainObject from 'lodash/isPlainObject';
import * as API from '../constants/api';


const api = {
  fetch(url, token, opts) {
    const options = {
      cache: false,
      cacheDuration: Infinity,
      query: {},
      ...opts,
    };

    const body = isPlainObject(options.data)
      ? JSON.stringify(options.data)
      : options.data;

    let fullUrl = `${API.DOMAIN}${url}`;


    return fetch(fullUrl, {
      ...options,
      body,
      headers: {
        Accept: 'application/json',
        'Accept-Encoding': 'gzip',
        Authorization: `Bearer ${token}` || undefined,
        'Content-Type': 'application/json; charset=UTF-8',
        ...options.headers,
      },
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        }

        throw response;
      })
  },
};

export default api;
