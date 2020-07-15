import {TEXT_ADDED, OBJECT_SELECTED, TEXTBOX_EVENT} from "../action/action";
import {createStore, combineReducers} from 'redux';
const DEFAULTSTATE = {
    'canvasText': "",
    "actionPerformed": "",
    "selectedObject": {},
    "textboxEvent": ""
}

const textAddReducer = (state = "", action) => {
    console.log(action)
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
        return {id: action.payload.id, type: action.payload.id};
    }
    else{
        return state;
    }
}
const textboxReducer = (state = "", action) => {
    if(action.type === TEXTBOX_EVENT){
        return action.payload;
    }
    else return state;
} 

const reducer = combineReducers({
    "canvasText": textAddReducer,
    "actionPerformed": storeActionReducer,
    "selectedObject": selectObjectReducer,
    "textboxEvent": textboxReducer,
    
})
const store = createStore(reducer, DEFAULTSTATE);
export default store;