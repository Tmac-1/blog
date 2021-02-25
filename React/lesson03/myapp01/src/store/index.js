
import { createStore, applyMiddleware} from 'redux';

function counterReducer(state = 100, action)  {
    console.log('state',state)
    switch (action.type) {
      case "ADD":
        return state + 1;
      case "MINUS":
        return state - 1;
      default:
        return state;
    }
  }
  
  const store = createStore(counterReducer)
  
  export default store

