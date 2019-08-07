import { logoutUser} from './../redux/actions/auth';
import store from './../redux/store';
import {devMode } from './constants';
import moment from 'moment';
import _ from 'lodash';
import expiry from './apiExpiry';

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

export function shouldFetchData(state, reducer, itemFromState) {
    try {
      const item = state[reducer][itemFromState];
      const expTime = expiry[reducer][itemFromState] 
      if (!item || _.isEmpty(item)) {
        return true;
      } else if (item.isFetching) {
        return false;
      } else if (expTime) {
        const expiration = moment(item.lastUpdated).add(expTime, 'ms');
        // debugger;
        return moment().isAfter(expiration);
      } else if (!expTime) {
        return true;
      } else {
        return item.didInvalidate;
      }
    } catch (err) {
      console.log(err);
    }
  }

  
export const apiBase = devMode ? "http://localhost:3000" : "https://api.planit.best";