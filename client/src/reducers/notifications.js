import { GET_NOTIFICATIONS_FULFILLED, GET_NOTIFICATIONS_PENDING, GET_NOTIFICATIONS_REJECTED } from '../constants/actionTypes';
import { FULFILLED, PENDING, REJECTED } from '../constants/storeObjectStatuses';
import globalInitialState from './initialState';

const initialState = globalInitialState.notifications;

export default function (state = initialState, action) {
  let newState;
  switch (action.type) {
    case GET_NOTIFICATIONS_FULFILLED:
      newState = Object.assign({}, state, { data: action.payload, status: FULFILLED });
      return newState;
    case GET_NOTIFICATIONS_PENDING:
      newState = Object.assign({}, initialState, { status: PENDING });
      return newState;
    case GET_NOTIFICATIONS_REJECTED:
      newState = Object.assign({}, initialState, { status: REJECTED });
      return newState;
    default:
      return state;
  }
}
