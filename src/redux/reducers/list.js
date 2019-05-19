import { 
    GET_LISTS, 
    CREATE_LIST, 
    UPDATE_LIST, 
    DELETE_LIST ,
    CREATE_LIST_ITEM, 
    UPDATE_LIST_ITEM, 
    DELETE_LIST_ITEM ,
  } from "../constants/actionTypes";
  
  function listItem( state, action ){
    
    switch(action.type){
      case CREATE_LIST_ITEM:
          const { payload, listId } = action

          // const list = state.list.find((item => item.id === listId));
          
          const newState = {
            ...state,
            lists: state.lists.map((list) => {
              if(list.id === listId){
                const items = list.list_items ? [...list.list_items] : []
                return {
                  ...list,
                  list_items: items.concat(payload)
                }
              }else{
                return list
              }
            })
          }
          return newState
        // return Object.assign({}, state, {
        //   items: state.items.concat(action.payload),
        // });
      case UPDATE_LIST_ITEM:
          return Object.assign({}, state, {
            items: state.items.map((item) => {     
              if(item.id !== action.payload.id){
                return item
              }
              return {
                ...item,
                ...action.payload
              }
            })
          });
      case DELETE_LIST_ITEM: {
        let newState = {...state}
        return Object.assign({}, state, {
          items: newState.items.filter(item => item.id !== action.payload)
        });
      }
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


    if([CREATE_LIST_ITEM, UPDATE_LIST_ITEM, DELETE_LIST_ITEM].includes(action.type)){
      return listItem(state, action);
    }
    
    return state;
  }
  
  
  export default listReducer;