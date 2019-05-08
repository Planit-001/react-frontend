import { 
  GET_TODOS, 
  CREATE_TODO, 
  UPDATE_TODO,
  DELETE_TODO 
} from "../constants/actionTypes";

import { handleErrors, buildHeaders, apiBase } from './../../utils/apiHelpers';

import { toastEvent, ding } from './../../utils/uiFuncs';


function shouldFetchTodos(state){ 
  const todoReducer = state.todoReducer
  if(!todoReducer){
    return true
  } else if (todoReducer.isFetching){
    return false; 
  } else if ((Date.now() - todoReducer.lastUpdated) >= 600000){
    return true
  } else{
    return todoReducer.didInvalidate;
  }
}

export function getTodos() {  
  return function(dispatch, getState){
    if(shouldFetchTodos(getState())){
      return fetch(`${apiBase}/api/v1/todos`, {
          method: "GET",
          headers: buildHeaders(getState().auth.token, true)
        })
        .then(response => response.json())
        .then(json => {
          dispatch({ 
            type: GET_TODOS, 
            payload: json,
            receivedAt: Date.now()
          });
        })
        .catch(err => {
          console.log(err)
        });
    }else{
      Promise.resolve();
    }
  }

};

export function createTodo(payload) {
  return function(dispatch, getState){

    const headers = buildHeaders(getState().auth.token)
    return fetch(`${apiBase}/api/v1/todos`, {
      method: "POST",
      body: JSON.stringify(payload),
      headers
    })
    .then(handleErrors)
    .then(response => response.json())
    .then(json => {
      dispatch({ type: CREATE_TODO, payload: json })
      ding();
      toastEvent("To-do created!")
    })
    .catch(err => {
      console.log(err)
    });
  }
};

export function updateTodo(id, payload){
  return function(dispatch, getState){
    return fetch(`${apiBase}/api/v1/todos/${id}`, {
      method: "PUT",
      body: JSON.stringify(payload),
      headers: buildHeaders(getState().auth.token)
    })
    .then(handleErrors)
    .then(response => response.json())
    .then(json => {
      dispatch({ type: UPDATE_TODO, payload: json})
      toastEvent("To-do updated!")
    })
    .catch(err => {
      console.log(err)
    });
  }
}

export function deleteTodo(id) {
  return function(dispatch, getState){
    return fetch(`${apiBase}/api/v1/todos/${id}`, {
      method: "DELETE",
      headers: {
        "Authorization": getState().auth.token
      }
    })
    .then(handleErrors)
    .then(response => {
        dispatch({ type: DELETE_TODO, payload: id })
        toastEvent("To-do deleted!")
    })
    .catch(err => {
      console.log(err)
    })
  }
};