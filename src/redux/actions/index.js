import { 
  ADD_TODO, 
  GET_TODOS, 
  CREATE_TODO, 
  DELETE_TODO 
} from "../constants/actionTypes";

function handleErrors(response) {
  if (!response.ok) {
      throw Error(response.statusText);
  }
  return response;
}



export function getTodos() {  
  return function(dispatch){
    return fetch("/api/v1/todos")
      .then(response => response.json())
      .then(json => {
        dispatch({ type: GET_TODOS, payload: json });
      });
  }
};

export function createTodo(payload) {
  return function(dispatch){
    return fetch("/api/v1/todos", {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json",
      }
    })
    .then(handleErrors)
    .then(response => response.json())
    .then(json => {
      dispatch({ type: CREATE_TODO, payload: json })
    });
  }
};

export function deleteTodo(payload) {
  return { type: DELETE_TODO, payload }
};