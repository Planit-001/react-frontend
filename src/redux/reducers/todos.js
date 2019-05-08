import { GET_TODOS, CREATE_TODO, UPDATE_TODO, DELETE_TODO } from "../constants/actionTypes";

const initialState = {
  todos: [],
  isFetching: false,
  didInvalidate: false,
  lastUpdated: null
};

function todoReducer(state = initialState, action) {

  if (action.type === GET_TODOS){
    // return Object.assign({}, state, {
    //   todos: state.todos.concat(action.payload),
    //   lastUpdated: action.receivedAt
    // });
    return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        todos: action.payload,
        lastUpdated: action.receivedAt
      });
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
          ...action.payload
        }
      })
    });
  }
  return state;
}


export default todoReducer;