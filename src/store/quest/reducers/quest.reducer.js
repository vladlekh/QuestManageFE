import { combineReducers } from "redux";
import { notificationReducer } from "./notification.reducer";
import { statusReducer } from "./status.reducer";

export const questReducer = combineReducers({
	notification: notificationReducer,
	status: statusReducer,
});
