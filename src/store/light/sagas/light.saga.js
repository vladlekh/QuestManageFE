import { all, fork } from "@redux-saga/core/effects";
import { lightSocketSaga } from "./light-socket.saga";

export function* lightSaga() {
	yield all([
		fork(lightSocketSaga)
	])
}
