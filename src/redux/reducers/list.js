import { 
   CREATE_COLUMN,
   CREATE_CARD,
   DRAGGED,
} from "./../constants/actionTypes";


let listId = 2;
let cardId = 5;

const initialState = [
  {
    title: 'Last Episode',
    id: 0,
    cards: [
      {
        id: 0,
        text: "We created a static list and static card"
      },
      {
        id: 1,
        text: "we used a mix between material ui and styled components"
      }
    ]

  },
  {
    title: 'This Episode',
    id: 1,
    cards: [
      {
        id: 2,
        text: "We will create our first reducer"
      },
      {
        id: 3,
        text: "and render cards on our list with static data"
      },
      {
        id: 4,
        text: "and make some small cleanup changes"
      }
    ]

  }
]

  
  function listReducer(state = initialState, action) {
    switch(action.type){
        case CREATE_COLUMN:
          const newColumn = {
            title: action.payload,
            cards: [],
            id: listId
          }
          listId += 1;
          return [...state, newColumn]
        case CREATE_CARD: {
          const newCard = {
            text: action.payload.text,
            id: cardId
          }
          cardId += 1;
          const newState = state.map(col => {
            if(col.id === action.payload.colId){
              return {
                ...col,
                cards: [...col.cards, newCard]
              }
            }else{
              return col;
            }
          });
          return newState;
        }
        case DRAGGED:
          const newState = [...state];
          const {
            droppableIdStart,
            droppableIdEnd,
            droppableIndexEnd,
            droppableIndexStart,    
            type
          } = action.payload;

          console.log(action.payload)

          // in same column
          if (droppableIdStart === droppableIdEnd){
            const col = state.find(col => String(col.id) === droppableIdStart)
            const card = col.cards.splice(droppableIndexStart, 1)
            col.cards.splice(droppableIndexEnd, 0, ...card);
          }

          return newState;

        default: 
            return state;
    }
  }
  
  
  export default listReducer;