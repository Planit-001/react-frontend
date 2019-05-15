import {
    CREATE_COLUMN, 
    CREATE_CARD,
    DRAGGED
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

export const sort = (
    droppableIdStart,
    droppableIdEnd,
    droppableIndexStart,
    droppableIndexEnd,
    draggableId,
    type
  ) => {
    return (dispatch, getState) => {
      const boardID = getState().activeBoard;
      dispatch({
        type: DRAGGED,
        payload: {
          droppableIdStart,
          droppableIdEnd,
          droppableIndexEnd,
          droppableIndexStart,
          draggableId,
          type,
          boardID
        }
      });
    };
  };