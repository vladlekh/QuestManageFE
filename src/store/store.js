import { composeWithDevTools } from "redux-devtools-extension";
import { createStore } from "redux-dynamic-reducer";
import { applyMiddleware } from "redux";
import { rootReducer } from "./root-reducer";
import { rootSaga } from "./root-saga";
import { sagaMiddleware } from "./saga";

export const store = createStore(
	rootReducer,
	composeWithDevTools(
		applyMiddleware(sagaMiddleware)
	)
);
sagaMiddleware.run(rootSaga);

