import {
    CREATE_COLUMN, 
    CREATE_CARD,
    DRAGGED
} from './../constants/actionTypes'


export const addList = title => {
  return {
    type: CREATE_COLUMN,
    payload: title
  };
};

export const sort = (
  droppableIdStart,
  droppableIdEnd,
  droppableIndexStart,
  droppableIndexEnd,
  draggableId,
  type
) => {
  return {
    type: DRAGGED,
    payload: {
      droppableIdStart,
      droppableIdEnd,
      droppableIndexStart,
      droppableIndexEnd,
      draggableId,
      type
    }
  };
};


export const addCard = (listID, text) => {
  return {
    type: CREATE_CARD,
    payload: { text, listID }
  };
};
