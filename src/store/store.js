import TEXT_ADDED from "../action/action";
import {createStore, combineReducers} from 'redux';
const DEFAULTSTATE = {
    'canvasText': "",
}

const textAddReducer = (state = "", action) => {
    if(action.type === TEXT_ADDED){
        return action.payload;
    }
    else{
        return state;
    }
}

const reducer = combineReducers({
    "canvasText": textAddReducer,
    
})
const store = createStore(reducer, DEFAULTSTATE);
export default store;