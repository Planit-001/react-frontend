import {
    GET_USERS,
    GET_SUGGESTIONS,
    RECEIVE_USERS,
    RECEIVE_SUGGESTIONS,
} from './../constants/actionTypes';

import { handleErrors, buildHeaders, apiBase, shouldFetchData } from '../../utils/apiHelpers';


export function getUsers() {  
    return function(dispatch, getState){
      const shouldFetch = shouldFetchData(getState(), 'admin', 'users');
      if(shouldFetch){
        return fetch(`${apiBase}/api/v1/users`, {
            method: "GET",
            headers: buildHeaders(getState().auth.token, true)
          })
          .then(handleErrors)
          .then(response => response.json())
          .then(json => {
            dispatch({ 
              type: RECEIVE_USERS, 
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
      const shouldFetch = shouldFetchData(getState(), 'admin', 'suggestions');
      if(shouldFetch){
        return fetch(`${apiBase}/api/v1/suggestions`, {
            method: "GET",
            headers: buildHeaders(getState().auth.token, true)
          })
          .then(handleErrors)
          .then(response => response.json())
          .then(json => {
            dispatch({ 
              type: RECEIVE_SUGGESTIONS, 
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

