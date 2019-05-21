import { 
    DARK_MODE,
    GET_COORDINATES,
    INVALIDATE_COORDINATES,
} from "../constants/actionTypes";


function coordinates(
    state = {
      isFetching: false,
      didInvalidate: false,
      lat: null,
      lng: null
    },
    action
  ) {
    switch (action.type) {
      case INVALIDATE_COORDINATES:
        return Object.assign({}, state, {
          didInvalidate: true
        })
      case GET_COORDINATES:
        return Object.assign({}, state, {
          isFetching: false,
          didInvalidate: false,
          lat: action.payload.lat,
          lng: action.payload.lng,
          lastUpdated: action.receivedAt
        })
      default:
        return state
    }
  }

const initialState = {
  darkMode: false,
  showToast: false,
  toastMsg: '',
  toastType: null,
  coordinates: {},
};

function uiReducer(state = initialState, action){

    switch (action.type) {
        case INVALIDATE_COORDINATES:
        case GET_COORDINATES:
          return Object.assign({}, state, {
            coordinates: coordinates(state.coordinates, action)
          });
        case DARK_MODE:
            return {
                ...state,
                darkMode: action.payload
            }
        default:
          return state
      }
}

export default uiReducer;