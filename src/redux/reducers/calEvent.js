import { 
    GET_CALEVENTS,
    CREATE_CALEVENT,
    UPDATE_CALEVENT,
    DELETE_CALEVENT
  } from "../constants/actionTypes";
  
  const initialState = {
    calEvents: [],
    isFetching: false,
    didInvalidate: false,
    lastUpdated: null,
    todosArchived: {}
  };
  
  function calEventReducer(state = initialState, action) {
  
    if (action.type === GET_CALEVENTS){
      // return Object.assign({}, state, {
      //   calEvents: state.todos.concat(action.payload),
      //   lastUpdated: action.receivedAt
      // });
      return Object.assign({}, state, {
          isFetching: false,
          didInvalidate: false,
          calEvents: action.payload,
          lastUpdated: action.receivedAt
        });
    }
  
    if (action.type === CREATE_CALEVENT) {
      return Object.assign({}, state, {
        calEvents: state.calEvents.concat(action.payload)
      })
    }
  
    if (action.type === DELETE_CALEVENT){
      let newState = {...state}
      return Object.assign({}, state, {
        calEvents: newState.calEvents.filter(item => item.id !== action.payload)
      });
    }
  
    if(action.type === UPDATE_CALEVENT){
      return Object.assign({}, state, {
        calEvents: state.calEvents.map((item, index) => {     
          if(item.id !== action.payload.id){
            return item
          }
          return {
            ...item,
            ...action.payload
          }
        })
      });
    }
    return state;
  }
  
  
  export default calEventReducer;