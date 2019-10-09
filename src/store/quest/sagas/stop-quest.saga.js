import { put } from "@redux-saga/core/effects";
import { setStopModalOpenedAction } from "../../modal/actions";
import { clearRoomsAction } from "../../room/actions";
import { clearPortsAction } from "../../ports/actions";

export function* stopQuestSaga() {
	yield put(setStopModalOpenedAction(false));
	yield put(clearRoomsAction());
	yield put(clearPortsAction());
}
