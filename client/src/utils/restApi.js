import * as axios from 'axios';
import * as actionTypes from '../constants/actionTypes';
import * as errorMessages from '../constants/errorMessages';
import logger from './logger';


const knownErrors = {
  401: {
    message: errorMessages.ERROR_HTTP_UNAUTHORIZED,
    action: actionTypes.ERROR_HTTP_UNAUTHORIZED,
  },
  403: {
    message: errorMessages.ERROR_HTTP_FORBIDDEN,
    action: actionTypes.ERROR_HTTP_FORBIDDEN,
  },
  500: {
    message: errorMessages.ERROR_HTTP_INTERNAL_SERVER_ERROR,
    action: actionTypes.ERROR_HTTP_INTERNAL_SERVER_ERROR,
  },
};

const errorMapper = (err) => {
  const { response } = err;
  let type;
  let error;
  if (response && knownErrors[response.status]) {
    error = new Error(knownErrors[response.status].message);
    type = knownErrors[response.status].action;
  } else if (err.message === 'Network Error') {
    error = new Error(errorMessages.ERROR_HTTP_NETWORK);
    type = actionTypes.ERROR_HTTP_NETWORK;
  } else {
    error = new Error(`HTTP Error: error on http request: ${err}`);
    type = actionTypes.ERROR_HTTP;
  }
  logger.error(error);
  return {
    type,
    error,
  };
};

export function get(url, query) {
  const options = { params: query };
  return axios.get(url, options)
    .then(response => response.data);
}

export function post(url, body) {
  return axios.post(url, body, {})
    .then(response => response.data);
}

export function put(url, body) {
  return axios.put(url, body, {})
    .then(response => response.data);
}


export function errorHandler(dispatch) {
  return (error) => {
    const errorAction = errorMapper(error);
    dispatch(errorAction);
    throw errorAction.error;
  };
}
