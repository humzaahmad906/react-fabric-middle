//actions
const TEXT_ADDED = "TEXT_ADDED";
//action creaters
const textAdded = (text) => ({
    "type": TEXT_ADDED,
    "payload": text,
});
export default textAdded;