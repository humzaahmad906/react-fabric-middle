import {TEXT_ADDED, OBJECT_SELECTED} from "../action/action";
import {createStore, combineReducers} from 'redux';
const DEFAULTSTATE = {
    'canvasText': "",
    "actionPerformed": "",
    "selectedObject": "",
}

const textAddReducer = (state = "", action) => {
    console.log(TEXT_ADDED)
    if(action.type === TEXT_ADDED){
        return action.payload;
    }
    else{
        return state;
    }
}
const storeActionReducer = (state = "", action) => (action.type)
const selectObjectReducer = (state = "", action) => {
    if(action.type === OBJECT_SELECTED){
        return action.payload;
    }
    else{
        return state;
    }
}

const reducer = combineReducers({
    "canvasText": textAddReducer,
    "actionPerformed": storeActionReducer,
    "selectedObject": selectObjectReducer,
    
})
const store = createStore(reducer, DEFAULTSTATE);
export default store;