import { Platform } from 'react-native';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import promise from 'redux-promise';
import createDevTools from 'remote-redux-devtools';
import rootReducer from '../reducers';

import { SWITCH_MINIMAL_UI_MODE } from '../actions/UIStatusActions';

const actionExcludeList = [
  SWITCH_MINIMAL_UI_MODE,
  'BEFORE_ROUTER_ROUTE',
  'BEFORE_ROUTER_FOCUS',
  'AFTER_ROUTER_ROUTE',
  'AFTER_ROUTER_FOCUS',
  'BEFORE_ROUTER_POP',
  'AFTER_ROUTER_POP',
];

const logger = createLogger({
  // options
  predicate: (getState, action) => actionExcludeList.indexOf(action.type) === -1,
});
// const devTools = createDevTools({
//   name: Platform.OS,
//   hostname: 'localhost',
//   port: 5678,
// });

// const createStoreWithMiddleware = compose(
//   applyMiddleware(thunk, promise, logger)//, devTools
// )(createStore);
const createStoreWithMiddleware = applyMiddleware(thunk, promise, logger)(createStore);

export default function configureStore(initialState) {
  return createStoreWithMiddleware(rootReducer, initialState);
}
