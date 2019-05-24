import isPlainObject from 'lodash/isPlainObject';


const DOMAIN = 'http://localhost:5000';

const cachedResponses = {};

const api = {
  token: null,

  //TODO: change the way of setting token
  setToken(newToken) {
    this.token = newToken;
  },
  fetch(url, opts) {
    const options = {
      cache: false,
      cacheDuration: Infinity,
      query: {},
      ...opts,
    };

    const body = isPlainObject(options.data)
      ? JSON.stringify(options.data)
      : options.data;

    let fullUrl = DOMAIN + url;


    return fetch(fullUrl, {
      ...options,
      body,
      headers: {
        Accept: 'application/json',
        'Accept-Encoding': 'gzip',
        Authorization: `Bearer ${this.token}` || undefined,
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
