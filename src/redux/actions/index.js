import { 
  GET_TODOS, 
  CREATE_TODO, 
  UPDATE_TODO,
  DELETE_TODO 
} from "../constants/actionTypes";

import { handleErrors, buildHeaders } from './../../utils/apiHelpers';

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
  return function(dispatch, getState){

    const headers = buildHeaders(getState().auth.token)
    return fetch("/api/v1/todos", {
      method: "POST",
      body: JSON.stringify(payload),
      headers
    })
    .then(handleErrors)
    .then(response => response.json())
    .then(json => {
      dispatch({ type: CREATE_TODO, payload: json })
    })
    .catch(err => {
      console.log(err)
    });
  }
};

export function updateTodo(id, payload){
  return function(dispatch, getState){
    return fetch(`/api/v1/todos/${id}`, {
      method: "PUT",
      body: JSON.stringify(payload),
      headers: buildHeaders(getState().auth.token)
    })
    .then(handleErrors)
    .then(response => response.json())
    .then(json => {
      dispatch({ type: UPDATE_TODO, payload: json})
    })
    .catch(err => {
      console.log(err)
    });
  }
}

export function deleteTodo(id) {
  return function(dispatch, getState){
    return fetch(`/api/v1/todos/${id}`, {
      method: "DELETE",
      headers: {
        "Authorization": getState().auth.token
      }
    })
    .then(handleErrors)
    .then(response => {
        dispatch({ type: DELETE_TODO, payload: id })
    })
    .catch(err => {
      console.log(err)
    })
  }
};