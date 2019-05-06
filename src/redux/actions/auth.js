import {
    SET_USER,
    LOGOUT_USER,
    CREATE_USER,
} from './../constants/actionTypes';
  
import {handleErrors, apiBase} from './../../utils/apiHelpers';

export function createUser(payload){
    return function(dispatch){
        return fetch(`${apiBase}/api/v1/users`, {
            method: "POST",
            body: JSON.stringify(payload),
            headers: {
                "Content-Type": "application/json",        
            }
        })
        .then(handleErrors)
        .then(response => response.json())
        .then(json => {
            dispatch({type: CREATE_USER, payload: json});
        });
    }
}

export function signInUser(payload){
    return function(dispatch){
        return fetch(`${apiBase}/api/v1/auth/login`, {
            method: "POST",
            body: JSON.stringify(payload),
            headers: {
                "Content-Type": "application/json",        
            }
        })
        .then(handleErrors)
        .then(response => response.json())
        .then(json => {
            dispatch({type: SET_USER, payload: json});
        });
    }
}

export const logoutUser = () => ({
    type: LOGOUT_USER,
});
