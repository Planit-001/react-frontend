import { DARK_MODE } from "../constants/actionTypes";

const initialState = {
  darkMode: false
};

function uiReducer(state = initialState, action){
    if (action.type === DARK_MODE){
        return {
            ...state,
            darkMode: action.payload
        }
    }
    return state;
}

export default uiReducer;