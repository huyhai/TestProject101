/* istanbul ignore file */
import axios from 'axios';

const timeout = 30000;
const instance = axios.create({
  timeout: timeout,
  baseURL: 'https://sandbox.101digital.io',
});

// instance.defaults.headers.common['device-token'] = deviceUniqueID
instance.defaults.headers.common['Content-Type'] =
  'application/x-www-form-urlencoded';
instance.defaults.headers.common.Cookie =
  'JSESSIONID=DF40708EA8440BEE9B7ADB6DED23BAC4';

instance.interceptors.response.use(
  response => {
    if (__DEV__) {
      console.log(response);
    }
    return response?.data;
  },
  error => {
    // hide timeout error
    if (__DEV__) {
      console.log(error);
    }
    if (error.message && error.message.indexOf(`${timeout}ms`) !== -1) {
      return {
        status: error.status || -1,
        message: error.message,
      };
    }
    // check if request is from vouches
    if (error.response && error.response.request) {
      return {
        status: error.status || -1,
        message: error.message,
      };
    }

    // unexpected/default

    return {
      status: error.status || -1,
      message: 'errorMessage',
      errorCode: -1,
    };
  },
);

instance.interceptors.request.use(config => {
  // console.log('request', config)
  if (!config.params) {
    config.params = {...config.params};
    // config.params['locale'] = QUERY_LANGUAGE_DEFAULT
  }
  return config;
});

export const setAuthHeader = token => {
  if (token) {
    instance.defaults.headers.common.Authorization = `Bearer ${token}`;
  }
};
export const setOrgToken = token => {
  if (token) {
    instance.defaults.headers.common['org-token'] = token;
  }
};

export const removeAuthHeader = () => {
  delete instance.defaults.headers.common.Authorization;
};

export default instance;
