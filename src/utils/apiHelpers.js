export function handleErrors(response) {
    if (!response.ok) {
        throw Error(response.statusText);
    }
    return response;
}

export function buildHeaders(token){
    return {
        "Content-Type": "application/json",
        "Authorization": token
    }
}