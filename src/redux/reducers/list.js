import { 
    GET_LISTS, 
    CREATE_LIST, 
    UPDATE_LIST, 
    DELETE_LIST ,
    CREATE_LIST_ITEM, 
    UPDATE_LIST_ITEM, 
    DELETE_LIST_ITEM ,
  } from "../constants/actionTypes";
  
  function listItem(
    state = {
      isFetching: false,
      didInvalidate: false,
      lastUpdated: null,
      item: {}
    },
    action
  ){
    switch(action.type){
      case CREATE_LIST_ITEM:
        return Object.assign({}, state, {
          isFetching: false,
          didInvalidate: false,
          items: action.payload,
          lastUpdated: action.receivedAt
        });
      case UPDATE_LIST_ITEM:
        return Object.assign({}, state, {
          isFetching: false,
          didInvalidate: false,
          items: action.payload,
          lastUpdated: action.receivedAt
        });
      case DELETE_LIST_ITEM:
        return Object.assign({}, state, {
          isFetching: false,
          didInvalidate: false,
          items: action.payload,
          lastUpdated: action.receivedAt
        });
      default: 
        return state
    }
  }
  
  const initialState = {
    lists: [],
    isFetching: false,
    didInvalidate: false,
    lastUpdated: null,
  };
  
  function listReducer(state = initialState, action) {
  
    if (action.type === GET_LISTS){
      return Object.assign({}, state, {
          isFetching: false,
          didInvalidate: false,
          lists: action.payload,
          lastUpdated: action.receivedAt
        });
    }
  
    if (action.type === CREATE_LIST) {
      return Object.assign({}, state, {
        lists: state.lists.concat(action.payload)
      })
    }

    if(action.type === UPDATE_LIST){
        return Object.assign({}, state, {
          lists: state.lists.map((item, index) => {     
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
  
    if (action.type === DELETE_LIST){
      let newState = {...state}
      return Object.assign({}, state, {
        lists: newState.lists.filter(item => item.id !== action.payload)
      });
    }

    
    return state;
  }
  
  
  export default listReducer;