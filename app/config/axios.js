import axios from 'axios';

const timeout = 30000;
const instance = axios.create({
  timeout: timeout,
  baseURL: 'https://sandbox.101digital.io',
});

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
    if (__DEV__) {
      console.log(error);
    }
    // unexpected/default

    return {
      status: error.response.status || -1,
      message: error.response.data.errors[0].message,
      errorCode: error.response.data.errors[0].code,
    };
  },
);

instance.interceptors.request.use(config => {
  if (!config.params) {
    config.params = {...config.params};
    // custom params here ...
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
