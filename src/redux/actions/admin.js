import {
    GET_USERS,
    GET_SUGGESTIONS,
} from './../constants/actionTypes';

import { handleErrors, buildHeaders, apiBase } from '../../utils/apiHelpers';

function shouldFetchUsers(state){ 
    const adminReducer = state.admin
    if(!adminReducer){
      return true
    } else if (adminReducer.isFetching){
      return false; 
    } else if ((Date.now() - adminReducer.lastUpdated) >= 600000){
      return true
    } else{
      return adminReducer.didInvalidate;
    }
  }
  

export function getUsers() {  
    return function(dispatch, getState){
      const shouldFetch = shouldFetchUsers(getState());
      if(shouldFetch){
        return fetch(`${apiBase}/api/v1/users`, {
            method: "GET",
            headers: buildHeaders(getState().auth.token, true)
          })
          .then(handleErrors)
          .then(response => response.json())
          .then(json => {
            dispatch({ 
              type: GET_USERS, 
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


  export function getSuggestions() {  
    return function(dispatch, getState){
      const shouldFetch = true//shouldFetchUsers(getState());
      if(shouldFetch){
        return fetch(`${apiBase}/api/v1/suggestions`, {
            method: "GET",
            headers: buildHeaders(getState().auth.token, true)
          })
          .then(handleErrors)
          .then(response => response.json())
          .then(json => {
            dispatch({ 
              type: GET_SUGGESTIONS, 
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

