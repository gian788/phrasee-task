import nock from 'nock';
import * as actionTypes from '../constants/actionTypes';
import * as errorMessages from '../constants/errorMessages';
import * as restApi from './restApi';


const basePath = 'http://server.com';
const path = '/endpoint';
const url = `${basePath}${path}`;

describe('Utils::restApi', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  describe('GET', () => {
    it('should make a GET request', () => {
      const query = { a: 1 };
      const expectedData = { ok: true };
      nock(basePath, { reqheaders: {} })
        .get(path)
        .query(query)
        .reply(200, expectedData);
      return restApi.get(url, query, false)
        .then(data => expect(data).toEqual(expectedData));
    });

    it('should handle a 500 GET request', () => {
      nock(basePath)
        .get(path)
        .reply(500, { });
      return restApi.get(url)
        .catch(error => expect(error).toBeInstanceOf(Error));
    });
  });

  describe('POST', () => {
    it('should make a POST request', () => {
      const body = { a: 1 };
      const expectedData = { ok: true };
      nock(basePath, { reqheaders: {} })
        .post(path, body)
        .reply(200, expectedData);
      return restApi.post(url, body, false)
        .then(data => expect(data).toEqual(expectedData));
    });

    it('should handle a 500 POST request', () => {
      const body = { a: 1 };
      nock(basePath)
        .post(path, body)
        .reply(500, {});
      return restApi.post(url, body)
        .catch(error => expect(error).toBeInstanceOf(Error));
    });
  });

  describe('PUT', () => {
    it('should make a PUT request', () => {
      const body = { a: 1 };
      const expectedData = { ok: true };
      nock(basePath, { reqheaders: {} })
        .put(path, body)
        .reply(200, expectedData);
      return restApi.put(url, body, false)
        .then(data => expect(data).toEqual(expectedData));
    });

    it('should handle a 500 POST request', () => {
      const body = { a: 1 };
      nock(basePath)
        .put(path, body)
        .reply(500, {});
      return restApi.put(url, body)
        .catch(error => expect(error).toBeInstanceOf(Error));
    });
  });

  describe('errorhandler', () => {
    it('should handle a generic error', () => {
      const dispatch = jest.fn();
      const error = new Error(errorMessages.ERROR_HTTP);
      const expected = {
        type: actionTypes.ERROR_HTTP,
        error: new Error(`HTTP Error: error on http request: ${error}`),
      };
      expect(() => {
        restApi.errorHandler(dispatch)(error);
      }).toThrow(expected.error);
      expect(dispatch).toHaveBeenCalledWith(expected);
    });

    it('should handle a connection error', () => {
      const dispatch = jest.fn();
      const error = new Error();
      error.message = 'Network Error';
      const expected = {
        type: actionTypes.ERROR_HTTP_NETWORK,
        error: new Error(errorMessages.ERROR_HTTP_NETWORK),
      };
      expect(() => {
        restApi.errorHandler(dispatch)(error);
      }).toThrow(expected.error);
      expect(dispatch).toHaveBeenCalledWith(expected);
    });

    it('should handle a generic http error', () => {
      const dispatch = jest.fn();
      const error = new Error();
      error.response = { status: 512 };
      const expected = {
        type: actionTypes.ERROR_HTTP,
        error: new Error(`HTTP Error: error on http request: ${error}`),
      };
      expect(() => {
        restApi.errorHandler(dispatch)(error);
      }).toThrow(expected.error);
      expect(dispatch).toHaveBeenCalledWith(expected);
    });

    it('should handle a 401 http unauthorized error', () => {
      const dispatch = jest.fn();
      const error = new Error(errorMessages.ERROR_HTTP_UNAUTHORIZED);
      error.response = { status: 401 };
      const expected = {
        type: actionTypes.ERROR_HTTP_UNAUTHORIZED,
        error,
      };
      expect(() => {
        restApi.errorHandler(dispatch)(error);
      }).toThrow(expected.error);
      expect(dispatch).toHaveBeenCalledWith(expected);
    });

    it('should handle a 403 http forbidden error', () => {
      const dispatch = jest.fn();
      const error = new Error(errorMessages.ERROR_HTTP_FORBIDDEN);
      error.response = { status: 403 };
      const expected = {
        type: actionTypes.ERROR_HTTP_FORBIDDEN,
        error,
      };
      expect(() => {
        restApi.errorHandler(dispatch)(error);
      }).toThrow(expected.error);
      expect(dispatch).toHaveBeenCalledWith(expected);
    });

    it('should handle a http 500 internal server error', () => {
      const dispatch = jest.fn();
      const error = new Error(errorMessages.ERROR_HTTP_INTERNAL_SERVER_ERROR);
      error.response = { status: 500 };
      const expected = {
        type: actionTypes.ERROR_HTTP_INTERNAL_SERVER_ERROR,
        error,
      };
      expect(() => {
        restApi.errorHandler(dispatch)(error);
      }).toThrow(expected.error);
      expect(dispatch).toHaveBeenCalledWith(expected);
    });
  });
});
