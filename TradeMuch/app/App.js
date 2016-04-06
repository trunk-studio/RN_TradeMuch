import React, { Platform } from 'react-native';
import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import promise from 'redux-promise';
import createDevTools from 'remote-redux-devtools';

import * as reducers from './reducers';

const logger = createLogger();
const devTools = createDevTools({
  name: Platform.OS,
  hostname: 'localhost',
  port: 5678,
});
const createStoreWithMiddleware = compose(
  applyMiddleware(thunk, promise, logger), devTools)(createStore);
const reducer = combineReducers(reducers);
const store = createStoreWithMiddleware(reducer);


import AppRoutes from './routes';

export default function App() {
  return (
    <Provider store={store}>
      <AppRoutes />
    </Provider>
  );
}
