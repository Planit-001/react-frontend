import { logoutUser} from './../redux/actions/auth';
import store from './../redux/store';
import {devMode } from './constants';
import moment from 'moment';
import _ from 'lodash';

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
    const expiry = state.settings.items.expiry || [];
    try {
      const item = state[reducer][itemFromState];
      const expSetting = expiry.find(exp => exp.name === _.snakeCase(itemFromState) && exp.group_name === _.snakeCase(reducer)) || {};
      const timeToExpire = expSetting.value || 0
  
      if (!item || _.isEmpty(item)) {
        return true;
      } else if (item.isFetching) {
        return false;
      } else if (timeToExpire) {
        const expiration = moment(item.lastUpdated).add(timeToExpire, 'ms');
        return moment().isAfter(expiration);
      } else if (expiry.lenth === 0 || !timeToExpire) {
        return true;
      } else {
        return item.didInvalidate;
      }
    } catch (err) {
      console.log(err);
    }
  }

  
export const apiBase = devMode ? "http://localhost:3000" : "http://134.209.153.124";