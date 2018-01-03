import { applyMiddleware, createStore } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import reducer from './reducers';
import { isDevelopment } from './utils';

const middleWare = [thunk];

if (isDevelopment) {
  middleWare.push(logger);
}

export default createStore(reducer, applyMiddleware(...middleWare));
