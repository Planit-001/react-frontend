import { 
  GET_TODOS, 
  GET_TODOS_ARCHIVED,
  CREATE_TODO, 
  UPDATE_TODO, 
  DELETE_TODO 
} from "../constants/actionTypes";

function todosArchived(
  state = {
    isFetching: false,
    didInvalidate: false,
    lastUpdated: null,
    items: []
  },
  action
){
  switch(action.type){
    // case INVALIDATE_TODOS_ARCHIVED:
    //   return Object.assign({}, state, {
    //     didInvalidate: true
    //   });
    // case REQUEST_TODOS_ARCHIVED:
    //   return Object.assign({}, state, {
    //     isFetching: true,
    //     didInvalidate: false
    //   });
    case GET_TODOS_ARCHIVED:
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        items: action.payload,
        lastUpdated: action.receivedAt
      });
    default: 
      return state
  }
}

const initialState = {
  todos: [],
  isFetching: false,
  didInvalidate: false,
  lastUpdated: null,
  todosArchived: {}
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

  if(action.type === GET_TODOS_ARCHIVED){
    return Object.assign({}, state, {
      todosArchived: {
        // ...state.todosArchived,
        ...todosArchived(state.todosArchived, action)
      }
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