import { all, fork } from 'redux-saga/effects';
import { appSaga } from "./app/sagas";

export function* rootSaga() {
	yield all([
		fork(appSaga),
	]);
}
