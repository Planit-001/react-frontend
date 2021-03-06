import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "../reducers/index";
import thunk from "redux-thunk";
import { loadState } from './../../utils/localStorage';

import {devMode} from './../../utils/constants';
import logger from 'redux-logger'

const storeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const persistedState = loadState();

const store = createStore(
    rootReducer,
    persistedState,
    storeEnhancers( devMode ? applyMiddleware(thunk, logger) : applyMiddleware(thunk))
  );
  

// const store = createStore(
//     rootReducer,
//     window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
// );

export default store;