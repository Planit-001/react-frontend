import {
    GET_LISTS,
    CREATE_LIST,
    UPDATE_LIST,
    DELETE_LIST,
} from '../constants/actionTypes'


import { handleErrors, buildHeaders, apiBase } from '../../utils/apiHelpers';

import { toastEvent, ding } from '../../utils/uiFuncs';

function shouldFetchLists(state){ 
  const listReducer = state.list
  if(!listReducer){
    return true
  } else if (listReducer.isFetching){
    return false; 
  } else if ((Date.now() - listReducer.lastUpdated) >= 600000){
    return true
  } else{
    return listReducer.didInvalidate;
  }
}

export function getLists() {  
  return function(dispatch, getState){
    if(shouldFetchLists(getState())){
      return fetch(`${apiBase}/api/v1/lists`, {
          method: "GET",
          headers: buildHeaders(getState().auth.token, true)
        })
        .then(handleErrors)
        .then(response => response.json())
        .then(json => {
          dispatch({ 
            type: GET_LISTS, 
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

export function createList(payload) {
    return function(dispatch, getState){
  
      const headers = buildHeaders(getState().auth.token)
      return fetch(`${apiBase}/api/v1/lists`, {
        method: "POST",
        body: JSON.stringify(payload),
        headers
      })
      .then(handleErrors)
      .then(response => response.json())
      .then(json => {
        dispatch({ type: CREATE_LIST, payload: json })
        ding();
        toastEvent("List created!")
      })
      .catch(err => {
        console.log(err)
      });
    }
  };
  
  export function updateList(id, payload){
    return function(dispatch, getState){
      return fetch(`${apiBase}/api/v1/lists/${id}`, {
        method: "PUT",
        body: JSON.stringify(payload),
        headers: buildHeaders(getState().auth.token)
      })
      .then(handleErrors)
      .then(response => response.json())
      .then(json => {
        dispatch({ type: UPDATE_LIST, payload: json})
        toastEvent("List updated!")
      })
      .catch(err => {
        console.log(err)
      });
    }
  }
  
  export function deleteList(id) {
    return function(dispatch, getState){
      return fetch(`${apiBase}/api/v1/lists/${id}`, {
        method: "DELETE",
        headers: {
          "Authorization": getState().auth.token
        }
      })
      .then(handleErrors)
      .then(response => {
          dispatch({ type: DELETE_LIST, payload: id })
          toastEvent("List deleted!")
      })
      .catch(err => {
        console.log(err)
      })
    }
  };