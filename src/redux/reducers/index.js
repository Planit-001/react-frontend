import { combineReducers } from 'redux'
import uiReducer from './ui';
import todo from './todos';
import externalReducer from './external';
import authReducer from './auth';
import suggestion from './suggestion';
import pipeline from './pipeline';
import list from './list';
import admin from './admin';
import calEvent from './calEvent';
import {
  LOGOUT_USER
} from './../../redux/constants/actionTypes'; 

const rootReducer = combineReducers({
  external: externalReducer,
  todo,
  suggestion,
  pipeline,
  list,
  calEvent,
  admin,
  ui: uiReducer,
  auth: authReducer
})


export default (state, action) => (
  action.type === LOGOUT_USER
      ? rootReducer(undefined, action)
      : rootReducer(state, action)
)


