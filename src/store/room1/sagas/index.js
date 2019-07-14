import { RESET_ACTION, TOGGLE_BOX_ACTION } from "../actions";
import { toggleBoxSaga } from "./toggle-box";
import { takeEvery } from 'redux-saga/effects';
import { TOGGLE_COFFIN_ACTION } from "../actions/toggle-coffin";
import { toggleCoffinSaga } from "./toggle-coffin";
import { resetSaga } from "./reset";

export function* room1Saga(socket) {
	yield takeEvery(TOGGLE_BOX_ACTION, toggleBoxSaga, socket);
	yield takeEvery(TOGGLE_COFFIN_ACTION, toggleCoffinSaga, socket);
	yield takeEvery(RESET_ACTION, resetSaga, socket);
	// yield takeEvery(RESET_ACTION, resetSaga);
}
