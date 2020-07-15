import {TEXT_ADDED, OBJECT_SELECTED, TEXTBOX_EVENT, SELECTION_CLEARED} from './action'
//action creaters
export const textAdded = (text) => ({
    "type": TEXT_ADDED,
    "payload": text,
});
export const objectSelected = (id, objType) => ({
    "type": OBJECT_SELECTED,
    "payload": {
        id: id,
        type: objType,
    }
})
export const textboxEvent = (act) => ({
    type: TEXTBOX_EVENT,
    payload: act,
})
export const selectionCleared = () => ({
    type: SELECTION_CLEARED,
})