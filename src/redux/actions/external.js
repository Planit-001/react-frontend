import { 
    GET_WEATHER_CURRENT,
    GET_WEATHER_5_DAYS
  } from "../constants/actionTypes";
  

export function getWeatherCurrent() {
    return function(dispatch){
        return fetch("http://api.openweathermap.org/data/2.5/forecast/daily?q=Chicago&APPID=0cd42bcc4f754e0ef7a6ad882863c51c&units=metric&cnt=8")
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
  