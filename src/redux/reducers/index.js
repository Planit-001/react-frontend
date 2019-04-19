import { GET_TODOS, CREATE_TODO, UPDATE_TODO, DELETE_TODO } from "../constants/actionTypes";

const initialState = {
  todos: []
};

function rootReducer(state = initialState, action) {

  if (action.type === GET_TODOS){
    return Object.assign({}, state, {
      todos: state.todos.concat(action.payload)
    })
  }

  if (action.type === CREATE_TODO) {
    return Object.assign({}, state, {
      todos: state.todos.concat(action.payload)
    })
  }

  if (action.type === DELETE_TODO){
    let newState = {...state}
    return Object.assign({}, state, {
      todos: newState.todos.filter(item => item.id !== action.payload)
    });
  }

  if(action.type === UPDATE_TODO){
    return Object.assign({}, state, {
      todos: state.todos.map((item, index) => {
        
        if(item.id !== action.payload.id){
          return item
        }
        return {
          ...item,
          ... action.payload
        }
      })
    })

  }

  return state;
}

export default rootReducer;