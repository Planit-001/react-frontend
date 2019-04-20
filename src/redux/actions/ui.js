import { 
    DARK_MODE
  } from "../constants/actionTypes";
  
  export function changeDarkMode(darkModeBool){
    return {
        type: DARK_MODE,
        payload: darkModeBool
    }
  }
