import { 
    GET_CALEVENTS,
    CREATE_CALEVENT,
    UPDATE_CALEVENT,
    DELETE_CALEVENT
  } from "../constants/actionTypes";
  
  import { handleErrors, buildHeaders, apiBase } from '../../utils/apiHelpers';
  
  import { toastEvent, ding } from '../../utils/uiFuncs';
  
  function shouldFetchCalEvents(state){ 
    const calEventReducer = state.calEvent
    if(!calEventReducer){
      return true
    } else if (calEventReducer.isFetching){
      return false; 
    } else if ((Date.now() - calEventReducer.lastUpdated) >= 600000){
      return true
    } else{
      return calEventReducer.didInvalidate;
    }
  }
  
  export function getCalEvents() {  
    return function(dispatch, getState){
      if(shouldFetchCalEvents(getState())){
        return fetch(`${apiBase}/api/v1/events`, {
            method: "GET",
            headers: buildHeaders(getState().auth.token, true)
          })
          .then(handleErrors)
          .then(response => response.json())
          .then(json => {
            dispatch({ 
              type: GET_CALEVENTS, 
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
    
  export function createCalEvent(payload) {
    return function(dispatch, getState){
  
      const headers = buildHeaders(getState().auth.token)
      return fetch(`${apiBase}/api/v1/events`, {
        method: "POST",
        body: JSON.stringify(payload),
        headers
      })
      .then(handleErrors)
      .then(response => response.json())
      .then(json => {
        dispatch({ type: CREATE_CALEVENT, payload: json })
        ding();
        toastEvent("Calendar event created!")
      })
      .catch(err => {
        console.log(err)
      });
    }
  };
  
  export function updateCalEvent(id, payload){
    return function(dispatch, getState){
      return fetch(`${apiBase}/api/v1/events/${id}`, {
        method: "PUT",
        body: JSON.stringify(payload),
        headers: buildHeaders(getState().auth.token)
      })
      .then(handleErrors)
      .then(response => response.json())
      .then(json => {
        dispatch({ type: UPDATE_CALEVENT, payload: json})
        toastEvent("Calendar Event updated!")
      })
      .catch(err => {
        console.log(err)
      });
    }
  }
  
  export function deleteCalEvent(id) {
    return function(dispatch, getState){
      return fetch(`${apiBase}/api/v1/events/${id}`, {
        method: "DELETE",
        headers: {
          "Authorization": getState().auth.token
        }
      })
      .then(handleErrors)
      .then(response => {
          dispatch({ type: DELETE_CALEVENT, payload: id })
          toastEvent("Calendar Event deleted!")
      })
      .catch(err => {
        console.log(err)
      })
    }
  };