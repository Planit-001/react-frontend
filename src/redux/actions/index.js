import { 
  GET_TODOS, 
  CREATE_TODO, 
  UPDATE_TODO,
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

export function updateTodo(id, payload){
  return function(dispatch){
    return fetch(`/api/v1/todos/${id}`, {
      method: "PUT",
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json",
      }
    })
    .then(handleErrors)
    .then(response => response.json())
    .then(json => {
      dispatch({ type: UPDATE_TODO, payload: json})
    });
  }
}

export function deleteTodo(id) {
  return function(dispatch){
    return fetch(`/api/v1/todos/${id}`, {
      method: "DELETE"
    })
    .then(handleErrors)
    .then(response => {
        dispatch({ type: DELETE_TODO, payload: id })
    })
  }
};