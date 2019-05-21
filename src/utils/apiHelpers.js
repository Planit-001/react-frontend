import { logoutUser} from './../redux/actions/auth';
import store from './../redux/store';
import {devMode } from './constants';

export function handleErrors(response) {
    if (!response.ok) {
        if(response.status === 401){
            const state = store.getState()
            if(state.auth && state.auth.user){
                store.dispatch(logoutUser())
            }
        }
        throw Error(response.statusText);
    }

    return response;
}

export function buildHeaders(token, tokenOnly=false){
    if(tokenOnly){
        return {
            "Authorization": token
        }    
    }
    return {
        "Content-Type": "application/json",
        "Authorization": token
    }
}

export const apiBase = devMode ? "http://localhost:3000" : "http://134.209.153.124";