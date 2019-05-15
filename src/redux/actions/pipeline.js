import {
    CREATE_COLUMN, 
    CREATE_CARD,
} from './../constants/actionTypes'

export const createColumn = (title) => {
    return {
        type: CREATE_COLUMN,
        payload: title
    }
}

export const createCard = (colId, text) => {
    return {
        type: CREATE_CARD,
        payload: {colId, text}
    }
}