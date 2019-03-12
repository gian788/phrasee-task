import * as restApi from '../utils/restApi';
import { GET_NOTIFICATIONS } from '../constants/actionTypes';

const url = 'http://localhost:3010/notifications';

export default function getFeed() {
  return dispatch => dispatch({
    type: GET_NOTIFICATIONS,
    payload: restApi.get(url)
      .catch(restApi.errorHandler(dispatch)),
  });
}
