import { combineReducers } from "redux";
import { appReducer } from "./app/reducers";
import { questReducer } from "./quest/reducers";
import { modalReducer } from "./modal/reducers";
import { audioReducer } from './audio/reducers';
import { loggerReducer } from './logger/reducers';

export const rootReducer = combineReducers({
	app: appReducer,
	quest: questReducer,
	modal: modalReducer,
	audio: audioReducer,
	logger: loggerReducer,
});
