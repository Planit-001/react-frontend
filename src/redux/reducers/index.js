import { combineReducers } from 'redux'
import uiReducer from './ui';
import todoReducer from './todos';
import externalReducer from './external';

const rootReducer = combineReducers({
  externalReducer,
  todoReducer,
  uiReducer,
})


export default rootReducer;