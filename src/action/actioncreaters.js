import {TEXT_ADDED, OBJECT_SELECTED} from './action'
//action creaters
export const textAdded = (text) => ({
    "type": TEXT_ADDED,
    "payload": text,
});
export const objectSelected = (objType) => ({
    "type": OBJECT_SELECTED,
    "payload": objType
})