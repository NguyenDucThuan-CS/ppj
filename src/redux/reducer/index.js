import { combineReducers } from "redux";
import itemReducer from "../modules/reducer";
import masterDataReducer from "../masterData/reducer";

const rootReducer = combineReducers({
    itemReducer,
    masterDataReducer
});

export default rootReducer;