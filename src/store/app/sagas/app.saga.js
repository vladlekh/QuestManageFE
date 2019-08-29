import { takeLatest, takeEvery } from 'redux-saga/effects';
import { CREATE_SAGA_ACTION, GET_STRUCTURE_ACTION, PORT_ACTION } from "../actions";
import { getStructureSaga } from "./get-structure.saga";
import { createSaga } from "./create.saga";
import { portSaga } from "./port.saga";

export function* appSaga() {
	yield takeLatest(GET_STRUCTURE_ACTION, getStructureSaga);
	yield takeLatest(CREATE_SAGA_ACTION, createSaga);
	yield takeEvery(PORT_ACTION, portSaga);
}
