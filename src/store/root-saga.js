import { all, fork } from 'redux-saga/effects';
import { listenServerSaga } from "./room1/sagas/socket";
import { listenServerSaga2 } from "./room1/sagas/socket2";

export function* rootSaga() {
	yield all([
		// fork(room1Saga),
		fork(listenServerSaga),
		fork(listenServerSaga2),
	]);
}
