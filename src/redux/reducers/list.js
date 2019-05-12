import { 
    
} from "../constants/actionTypes";

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
        default: 
            return state;
    }
  }
  
  
  export default listReducer;