import { 
    GET_USERS, GET_SUGGESTIONS
} from "../constants/actionTypes";


const initialState = {
    users: [],
    suggestions: [],
    isFetching: false,
    didInvalidate: false,
    lastUpdated: null,
};

const adminReducer = ( state = initialState, action) => {
    switch(action.type){
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