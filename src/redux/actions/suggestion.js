import { 
    CREATE_SUGGESTION
  } from "../constants/actionTypes";
  
import { handleErrors, buildHeaders, apiBase } from '../../utils/apiHelpers';
import { toastEvent } from '../../utils/uiFuncs';

export function createSuggestion(payload) {
    console.log('payload: ', payload)
    return function(dispatch, getState){
        const headers = buildHeaders(getState().auth.token)
        return fetch(`${apiBase}/api/v1/suggestions`, {
                method: "POST",
                body: JSON.stringify(payload),
                headers
            })
            .then(handleErrors)
            .then(response => response.json())
            .then(json => {
                dispatch({ type: CREATE_SUGGESTION, payload: json })
                toastEvent("Suggestion Sent!")
        })
        .catch(err => {
            console.log(err)
        });
    }
};

  