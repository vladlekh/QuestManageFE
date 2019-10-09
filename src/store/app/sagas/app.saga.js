import { takeLatest } from 'redux-saga/effects';
import { CREATE_SAGA_ACTION, GET_STRUCTURE_ACTION } from "../actions";
import { getStructureSaga } from "./get-structure.saga";
import { createSaga } from "./create.saga";

export function* appSaga() {
	yield takeLatest(GET_STRUCTURE_ACTION, getStructureSaga);
	yield takeLatest(CREATE_SAGA_ACTION, createSaga);
}
