import nock from 'nock';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import promise from 'redux-promise-middleware';
import * as actionTypes from '../constants/actionTypes';
import getNotifications from './notifications';
import * as errorMessages from '../constants/errorMessages';

const mockStore = configureMockStore([promise, thunk]);


const basePath = 'http://localhost:3010';
const path = '/notifications';

const notifications = [
  { id: 'id-1' },
  { id: 'id-2' },
];

describe('Actions::Notifications', () => {
  afterEach(() => {
    nock.cleanAll();
  });


  it('should create an action to fetch notifications feed', () => {
    nock(basePath)
      .get(path)
      .reply(200, notifications);
    const expectedActions = [
      {
        type: actionTypes.GET_NOTIFICATIONS_PENDING,
      },
      {
        type: actionTypes.GET_NOTIFICATIONS_FULFILLED,
        payload: notifications,
      },
    ];
    const store = mockStore({ notifications: {} });

    return store.dispatch(
      getNotifications(),
    )
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  it('should create an error action if the request fails', () => {
    nock(basePath)
      .get(path)
      .reply(500);

    const expectedActions = [
      {
        type: actionTypes.GET_NOTIFICATIONS_PENDING,
      },
      {
        type: actionTypes.ERROR_HTTP_INTERNAL_SERVER_ERROR,
        error: new Error(errorMessages.ERROR_HTTP_INTERNAL_SERVER_ERROR),
      },
      {
        type: actionTypes.GET_NOTIFICATIONS_REJECTED,
        error: true,
        payload: new Error(errorMessages.ERROR_HTTP_INTERNAL_SERVER_ERROR),
      },
    ];
    const store = mockStore({ notifications: {} });

    return store.dispatch(
      getNotifications(),
    )
      .catch(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });
});
