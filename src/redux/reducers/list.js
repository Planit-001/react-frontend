import _ from 'lodash';

import { 
    GET_LISTS, 
    CREATE_LIST, 
    UPDATE_LIST, 
    DELETE_LIST ,
    CREATE_LIST_ITEM, 
    UPDATE_LIST_ITEM, 
    DELETE_LIST_ITEM ,
  } from "../constants/actionTypes";

  import update from 'immutability-helper';

  function listItem( state, action ){
    
    switch(action.type){
      case CREATE_LIST_ITEM:
          const { payload, listId } = action
          return {
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
          
      case UPDATE_LIST_ITEM:{
        const _payload = action.payload
        const listItemId = action.listItemId
        const _list = state.lists.find(list => list.id === action.listId);
        const _listIndex = state.lists.findIndex(list => list.id === action.listId);

        const _listItemIndex = _list.list_items.findIndex(item => item.id === listItemId);

        return update(state, {
          lists: {
            [_listIndex]: {
              list_items: {
                [_listItemIndex]: {$merge: _payload}
              }
            }
          }
        })
      }
      case DELETE_LIST_ITEM: {
        // let newState = {...state}
        const listIndex = state.lists.findIndex(list => list.id === action.listId);
        const listItemIndex = state.lists[listIndex].list_items.findIndex(listItem => listItem.id === action.listItemId);

        // let newList = _.cloneDeep(state.lists[listIndex])
        // newList.list_items = newList.list_items.filter(item => item.id !== action.listItemId)
        // newState.lists[listIndex].list_items = newState.lists[listIndex].list_items.filter(item => item.id !== action.listItemId);
        
        return update(state, {
          lists: {
            [listIndex]: {
              list_items: {$splice: [[listItemIndex, 1]]}
            }
          }
        })
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
          lists: state.lists.map((item) => {     
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