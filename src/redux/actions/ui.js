import { 
    DARK_MODE,
    GET_COORDINATES
  } from "../constants/actionTypes";

  export function changeDarkMode(darkModeBool){
    return {
        type: DARK_MODE,
        payload: darkModeBool
    }
  }

  function shouldFetchCoordinates(state){
    const uiReducer = state.ui
    if(!uiReducer || !uiReducer.coordinates || !uiReducer.coordinates.lat || !uiReducer.coordinates.lng){
      return true
    } else if (uiReducer.coordinates.isFetching){
      return false; 
    } else if ((Date.now() - uiReducer.coordinates.lastUpdated) >= 600000){
      return true
    } else{
      return uiReducer.coordinates.didInvalidate;
    }
  }
  
  export function getCurrentCoordinates(){
    return function(dispatch, getState){
      if(shouldFetchCoordinates(getState())){
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position) {
            const lat = position.coords.latitude; 
            const lng = position.coords.longitude;
            return dispatch({
              type: GET_COORDINATES,
              payload: {
                lat,
                lng
              },
              receivedAt: Date.now()
            });
          });
        } else {
          console.log("Geolocation is not supported by this browser.");
        }

      }
    }
  }
