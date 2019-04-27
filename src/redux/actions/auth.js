import {
    SET_USER,
    LOGOUT_USER,
    CREATE_USER,
    SET_TOKEN,
} from './../constants/actionTypes';
  
import {handleErrors} from './../../utils/apiHelpers';

export function createUser(payload){
    return function(dispatch){
        return fetch("/api/v1/users", {
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
        return fetch("/api/v1/auth/login", {
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

export const setUser = user => ({
    type: SET_USER,
    user
})

export const logoutUser = () => ({
    type: LOGOUT_USER,
})

export const setToken = token => ({
    type: SET_TOKEN,
    payload: token
});