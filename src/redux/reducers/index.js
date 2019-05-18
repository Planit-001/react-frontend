import { combineReducers } from 'redux'
import uiReducer from './ui';
import todo from './todos';
import externalReducer from './external';
import authReducer from './auth';
import suggestion from './suggestion';
import pipeline from './pipeline';
import list from './list';
import calEvent from './calEvent';

const rootReducer = combineReducers({
  external: externalReducer,
  todo,
  suggestion,
  pipeline,
  list,
  calEvent,
  ui: uiReducer,
  auth: authReducer
})


export default rootReducer;