import { composeWithDevTools } from "redux-devtools-extension";
import { createStore } from "redux-dynamic-reducer";
import { applyMiddleware } from "redux";
import { rootReducer } from "./root-reducer";
import { rootSaga } from "./root-saga";
import { sagaMiddleware } from "./saga";
import { audioMiddleware } from '../middleware/audio.middleware';

export const store = createStore(
	rootReducer,
	composeWithDevTools(
		applyMiddleware(sagaMiddleware, audioMiddleware),
	)
);
sagaMiddleware.run(rootSaga);

