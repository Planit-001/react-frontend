import { combineReducers } from 'redux'
import uiReducer from './ui';
import todoReducer from './todos';

const rootReducer = combineReducers({
  todoReducer,
  uiReducer,
})


export default rootReducer;