import { 
    GET_WEATHER_CURRENT,
    GET_WEATHER_5_DAYS
 } from "../constants/actionTypes";

const initialState = {
  currentWeather: {},
  weather5Days: {}
};

function externalReducer(state = initialState, action) {

  if (action.type === GET_WEATHER_CURRENT){
    return Object.assign({}, state, {
      currentWeather: action.payload
    })
  }

  if (action.type === GET_WEATHER_5_DAYS) {
        return Object.assign({}, state, {
            weather5Days: state.weather5Days.concat(action.payload)
        })
  }

  return state;
}


export default externalReducer;