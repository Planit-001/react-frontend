import { combineReducers } from 'redux'
import uiReducer from './ui';
import todoReducer from './todos';
import externalReducer from './external';
import authReducer from './auth';

const rootReducer = combineReducers({
  externalReducer,
  todoReducer,
  uiReducer,
  auth: authReducer
})


export default rootReducer;