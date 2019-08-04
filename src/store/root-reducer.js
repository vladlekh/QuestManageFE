import { combineReducers } from "redux";
import { appReducer } from "./app/reducers";

export const rootReducer = combineReducers({
	app: appReducer,
});
