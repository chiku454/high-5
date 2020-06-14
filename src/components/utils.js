import axios from 'axios';
import { BASEURL } from '../config';
import history from '../history';

const getConfig = (apiParam, data) => ({
  params: apiParam,
  data: data || {},
  responseType: 'json',
});
// HTTP GET Request - Returns Resolved or Rejected Promise
export const get = (url, params, data) =>
  new Promise((resolve, reject) => {
    axios
      .get(BASEURL + url, getConfig(params, data))
      .then(response => {
        resolve(handleSuccess(response));
      })
      .catch(error => {
        reject(handleError(error.response || {
            status: 0,
            statusText: error.stack,
            data: { res_str: error.message },
          },
        ));
      });
  });
export const post = (url, params, data) =>
  new Promise((resolve, reject) => {
    axios
      .post(BASEURL + url, data, {
        config: { headers: { 'Content-Type': 'multipart/form-data' } },
      })
      .then(response => {
        // console.log(response)
        resolve(handleSuccess(response));
      })
      .catch(error => {
        reject(handleError(error.response || {
            status: 0,
            statusText: error.stack,
            data: { res_str: error.message },
          },
        ));
      });
  });
export const callApi = (url, apiMethod, query) =>
  new Promise((resolve, reject) => {
    axios({
      method: apiMethod,
      url: BASEURL + url, // Api URL
      data: apiMethod === 'POST' || apiMethod === 'post' ? query : undefined, // API post parameters,
      params: apiMethod === 'GET' || apiMethod === 'get' ? query : undefined, // API get params
    })
      .then(response => {
        resolve(handleSuccess(response));
      })
      .catch(error => {
        if (error.response && error.response.status === 401) {
          history.push(`/`);
          const errRes = { ...error };
          errRes.logout = true;
          errRes.data = {};
          errRes.data.res_str = 'Your session has expired.';
          reject(errRes);
        } else {
          reject(handleError(error.response || {
              status: 0,
              statusText: error.stack,
              data: { res_str: error.message },
            },
          ));
        }
      });
  });
const handleSuccess = response => {
  // const header = response.headers;
  // const responseData = response.data;
  const { data, headers } = response;
  if (data && headers && headers.cid && headers.token) {
    data.headers = headers;
  }
  console.log('data', data)
  return data;
};

const handleError = error => {
  // const message = error.data ? error.data.res_str : 'API failed';
  const { status, statusText, data } = error;
  const errRes = {
    status,
    logout: false,
    statusText,
    data,
  };

  switch (status) {
    case 401: // do something when you're unauthenticated
      errRes.logout = true;
      errRes.data = {};
      errRes.data.res_str = 'Your session has expired.';
      // localStorage.clear();
      // cookieLib.clearAllCookies();
      history.push(`/`);
      break;
    case 403:
      // do something when you're unauthorized to access a resourceerrRes.logout = false;
      errRes.logout = true;
      break;
    case 500:
      errRes.logout = false;
      break;
    default:
      // handle normal errors with some alert or whatever
      errRes.logout = false;
      break;
  }

  return errRes; // message; // I like to get my error message back
};
