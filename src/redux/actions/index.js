import { 
  ADD_TODO, 
  GET_TODOS, 
  CREATE_TODO, 
  DELETE_TODO 
} from "../constants/actionTypes";

export function getTodos() {
  
  return function(dispatch){
    return fetch("/api/v1/todos")
      .then(response => response.json())
      .then(json => {
        console.log('fetched: ', json);
        dispatch({ type: GET_TODOS, payload: json });
      });
  }

};

export function addTodo(payload) {
    return { type: ADD_TODO, payload }
};

export function createTodo(payload) {
  return { type: CREATE_TODO, payload }
};

export function deleteTodo(payload) {
  return { type: DELETE_TODO, payload }
};