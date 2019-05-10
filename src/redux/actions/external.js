import { 
    GET_WEATHER_CURRENT,
    // GET_WEATHER_5_DAYS
  } from "../constants/actionTypes";
  
const appID = "0cd42bcc4f754e0ef7a6ad882863c51c"
export function getWeatherCurrent(lat, long) {

    const url = `http://api.openweathermap.org/data/2.5/forecast/daily?lat=${lat}&lon=${long}&APPID=${appID}&units=metric&cnt=8`
    // const daily = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${appID}&units=metric`
    return function(dispatch){
        return fetch(url)
            .then(response => response.json())
            .then(json => {
            dispatch({ type: GET_WEATHER_CURRENT, payload: json });
        });
    }
};

// export function getWeather5Days() {
//     return function(dispatch){
//         return fetch("")
//             .then(response => response.json())
//             .then(json => {
//             dispatch({ type: GET_WEATHER_5_DAYS, payload: json });
//         });
//     }
// };
  