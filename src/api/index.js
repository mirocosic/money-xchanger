import axios from 'axios'

const backendURL = "https://api.exchangeratesapi.io"

axios.interceptors.request.use(
  config => {
    return config;
  },
  error => {
    return Promise.reject(error);
  }
)

axios.interceptors.response.use(
  response => {
    return response;
  },

  error => {
    return Promise.reject(error);
  }
)

const apiCall = (method, endpoint, data) => {

    return axios({
      method,
      url: backendURL + endpoint,
      data
    })
    .then( response => {
      return response
        ? { success: true, data: response.data, headers: response.headers }
        : { success: false, data: null, errorMsg: 'Unknown error', errorCode: 0};
    })
    .catch( error => {
      if ( error.response ) {
        return { success: false, data: null, errorCode: error.response.data.code || error.response.data.status, errorMsg: error.response.data.error_message || error.response.data.error};
      } else {
        return { success: false, data: null, errorCode: 0, errorMsg: 'Unknown error'}
      }

    })
  }

export default {

  getRates: ( primaryCurrency ) => {
    return apiCall('get', '/latest?base='+primaryCurrency);
  },

}
