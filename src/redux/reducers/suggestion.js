import { 
    CREATE_SUGGESTION
  } from "../constants/actionTypes";
  
  const initialState = {
    suggestions: []
  };
  
  function suggestionReducer(state = initialState, action) {
  
    if (action.type === CREATE_SUGGESTION) {
      return Object.assign({}, state, {
        suggestions: state.suggestions.concat(action.payload)
      })
    }
    return state;
  }
  
  
  export default suggestionReducer;