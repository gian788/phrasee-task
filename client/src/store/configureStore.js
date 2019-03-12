/* global process */
import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import promise from 'redux-promise-middleware';
import createRootReducer from '../reducers';


export default function configureStoreProd(initialState) {
  const middlewares = [
    promise,
    thunk,
  ];

  return createStore(
    createRootReducer,
    initialState,
    compose(applyMiddleware(...middlewares)),
  );
}
