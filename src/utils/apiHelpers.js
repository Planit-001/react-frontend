export function handleErrors(response) {
    if (!response.ok) {
        throw Error(response.statusText);
    }
    return response;
}

export function buildHeaders(token, tokenOnly=false){
    if(tokenOnly){
        return {
            "Authorization": token
        }    
    }
    return {
        "Content-Type": "application/json",
        "Authorization": token
    }
}