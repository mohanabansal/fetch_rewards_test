import { combineReducers } from "redux";
import getInfoReducer from "./GetInfo";

const appReducer = combineReducers({
  getInfo: getInfoReducer,
});

export default appReducer;
