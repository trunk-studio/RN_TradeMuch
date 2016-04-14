import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import promise from 'redux-promise';
import rootReducer from '../reducers';

const createStoreWithMiddleware = applyMiddleware(thunk, promise)(createStore);
// const store = createStoreWithMiddleware(rootReducer);

export default function configureStore(initialState) {
  return createStoreWithMiddleware(rootReducer, initialState);
}
