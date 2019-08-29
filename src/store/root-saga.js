import { all, fork } from 'redux-saga/effects';
import { appSaga } from "./app/sagas";
import { questSaga } from "./quest/sagas";
import { lightSaga } from "./light/sagas";

export function* rootSaga() {
	yield all([
		fork(appSaga),
		fork(questSaga),
		fork(lightSaga)
	]);
}
