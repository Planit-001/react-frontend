import { combineReducers } from 'redux'
import uiReducer from './ui';
import todo from './todos';
import externalReducer from './external';
import authReducer from './auth';

const rootReducer = combineReducers({
  external: externalReducer,
  todo,
  ui: uiReducer,
  auth: authReducer
})


export default rootReducer;