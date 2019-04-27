
import { 
    SET_USER,
    LOGOUT_USER,
    CREATE_USER
   } from './../constants/actionTypes';
  
  const initialState = {
    user: null,
    token: null
  }
  
  const authReducer = (state = initialState, action) => {
    switch (action.type){
      case CREATE_USER: 
        return {
          ...state, 
          user: Object.assign({}, state.user, action.payload.user),
          token: action.payload.token
        };
      case SET_USER:
        return {
          ...state, 
          user: Object.assign({}, state.user, action.payload.user),
          token: action.payload.token
        };
      case LOGOUT_USER: 
        return {...state, user: null, token: null};
      default: 
        return state;
    }
  };
  
  export default authReducer;