import { createStore, applyMiddleware } from "redux";
import { compose } from "redux";
import logger from "redux-logger";
import thunk from 'redux-thunk';

import rootReducer from './reducers'

const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(thunk),
    applyMiddleware(logger),
  )
);

export default store;