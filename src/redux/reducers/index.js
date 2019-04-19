import { ADD_ARTICLE, ADD_TODO } from "../constants/actionTypes";

const initialState = {
  todos: []
};

function rootReducer(state = initialState, action) {
  if (action.type === ADD_TODO) {
      return Object.assign({}, state, {
          todos: state.todos.concat(action.payload)
      });
  }
  return state;
}

export default rootReducer;