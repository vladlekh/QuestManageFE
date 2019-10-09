import { takeLatest, takeEvery } from "@redux-saga/core/effects";
import { INITIALIZE_PORTS_ACTION } from "../actions/initialize-ports.action";
import { initializePortsSaga } from "./initialize-ports.saga";
import { PORT_CONNECTION_ACTION, PORT_READY_ACTION } from "../actions";
import { portReadySaga } from "./port-ready.saga";
import { portConnectionSaga } from "./port-connection.saga";

export function* portsSaga() {
    yield takeLatest(INITIALIZE_PORTS_ACTION, initializePortsSaga);
    yield takeEvery(PORT_READY_ACTION, portReadySaga);
    yield takeEvery(PORT_CONNECTION_ACTION, portConnectionSaga);
}
