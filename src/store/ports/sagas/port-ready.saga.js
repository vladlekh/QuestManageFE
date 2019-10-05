import { put, select } from "@redux-saga/core/effects";
import { portInitializationSuccessAction, setPortReadyAction } from "../actions";
import { selectPortsAreInitializing, selectUninitializedPorts } from "../selectors";

export function* portReadySaga({ payload }) {
	const portsAreInitializing = yield select(selectPortsAreInitializing);
	if (portsAreInitializing) {
		yield put(setPortReadyAction(payload.path, true));
		const uninitializedPorts = yield select(selectUninitializedPorts);
		if (!uninitializedPorts.length) {
			yield put(portInitializationSuccessAction())
		}
	}
}
