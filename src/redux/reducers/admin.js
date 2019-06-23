import { 
    GET_USERS, 
    INVALIDATE_USERS,
    REQUEST_USERS,
    RECEIVE_USERS,
    INVALIDATE_SUGGESTIONS,
    REQUEST_SUGGESTIONS,
    RECEIVE_SUGGESTIONS,
    GET_SUGGESTIONS,
} from "../constants/actionTypes";

function users(
    state = {
      isFetching: false,
      didInvalidate: false,
      lastUpdated: null,
      items: []
    },
    action
  ) {
    switch (action.type) {
      case INVALIDATE_USERS:
        return Object.assign({}, state, {
          didInvalidate: true
        });
      case REQUEST_USERS:
        return Object.assign({}, state, {
          isFetching: true,
          didInvalidate: false
        });
      case RECEIVE_USERS:
        return Object.assign({}, state, {
          isFetching: false,
          lastUpdated: action.receivedAt,
          didInvalidate: false,
          items: action.payload
        });
      default:
        return state;
    }
  }

  function suggestions(
    state = {
      isFetching: false,
      didInvalidate: false,
      lastUpdated: null,
      items: []
    },
    action
  ) {
    switch (action.type) {
      case INVALIDATE_SUGGESTIONS:
        return Object.assign({}, state, {
          didInvalidate: true
        });
      case REQUEST_SUGGESTIONS:
        return Object.assign({}, state, {
          isFetching: true,
          didInvalidate: false
        });
      case RECEIVE_SUGGESTIONS:
        return Object.assign({}, state, {
          isFetching: false,
          lastUpdated: action.receivedAt,
          didInvalidate: false,
          items: action.payload,
        });
      default:
        return state;
    }
  }

const initialState = {
    users: {},
    suggestions: {},
};

const adminReducer = ( state = initialState, action) => {
    switch(action.type){
        case REQUEST_USERS:
        case RECEIVE_USERS:
        case INVALIDATE_USERS:
            return Object.assign({}, state, {
                users: {
                  ...state.users,
                  ...users(state.users, action)
                }
              });
        case REQUEST_SUGGESTIONS:
        case RECEIVE_SUGGESTIONS:
        case INVALIDATE_SUGGESTIONS:
            return Object.assign({}, state, {
                suggestions: {
                    ...state.suggestions,
                    ...suggestions(state.suggestions, action)
                }
            });
        case GET_USERS: 
            return Object.assign({}, state, {
                users: action.payload,
                isFetching: false,
                didInvalidate: false,
                lastUpdated: action.receivedAt
            });
        case GET_SUGGESTIONS:
            return Object.assign({}, state, {
                suggestions: action.payload
            })
        default: 
            return state;
    }
}

export default adminReducer;