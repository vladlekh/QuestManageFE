import { combineReducers } from "redux";
import { room1Reducer } from "./room1/reducers";

export const rootReducer = combineReducers({
	room1: room1Reducer,
});
