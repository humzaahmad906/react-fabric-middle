import {TEXT_ADDED, OBJECT_SELECTED, TEXTBOX_EVENT, APPEND_TEXT_OBJ, SELECTION_CLEARED} from "../action/action";
import {createStore, combineReducers} from 'redux';
const DEFAULTSTATE = {
    'canvasText': "",
    "actionPerformed": [],
    "selectedObject": {},
    "textboxEvent": []
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
const storeActionReducer = (state = "", action) => ([...state, action.type])
const selectObjectReducer = (state = "", action) => {
    if(action.type === OBJECT_SELECTED){
        return {id: action.payload.id, type: action.payload.type};
    }
    else if(action.type === SELECTION_CLEARED){
        return {}
    }
    else{
        return state;
    }
}
const textboxReducer = (state = [], action) => {
    if(action.type === TEXTBOX_EVENT){
        state.forEach((item) =>{
            
            if (item.selected === true){
                switch(action.payload.name){
                    case "BOLD":
                        if(item.bold === false) item.italic = false
                        item.bold = !item.bold;
                        break;
                    case "ITALIC":
                        if(item.italic === false) item.bold = false
                        item.italic = !item.italic;
                        break;
                    case "UNDERLINE":
                        item.underline = !item.underline;
                        break;
                    case "FONT_SIZE":
                        console.log(item.fontSize);
                        item.fontSize = action.payload.fontSize;
                        break;
                    case "FILL":
                        item.fill = action.payload.fillColor;
                        break;
                    case "SHADOW":
                        item.shadow.isShadow = true;
                        item.shadow.shadowColor = action.payload.shadowColor;
                        break;
                    case "FONT_FAMILY":
                        console.log(item.fontFamily);
                        item.fontFamily = action.payload.font;
                        break;
                    case "TEXT":
                        item.text = action.payload.text;
                        break
                    default:
                        console.log(action.payload.name);
                }
            }
        })
        return state;
    }
    else if(action.type === APPEND_TEXT_OBJ){
        return [...state, {id: action.payload,
                     text: "TEXT HERE",
                     selected: false, 
                     underline: false, 
                     bold: false,
                     italic: false, 
                     stroke: false, 
                     fontSize: 30,
                     fontFamily: "times new roman",
                     fill: null,
                     shadow: {isShadow: false, shadowColor: null}}];
    }
    else if(action.type === OBJECT_SELECTED){
        console.log(action.payload.type);
        if(action.payload.type === "textbox"){
            state.forEach((item) => {
                if(item.id === action.payload.id){
                    item.selected = true;
                }
            });
            return state;
        }
        else{
            return state;
        }
    }
    else if(action.type === SELECTION_CLEARED){
        state.forEach((item) => {
            item.selected = false
        })
        return state;
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