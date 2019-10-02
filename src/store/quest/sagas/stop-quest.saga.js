import { put } from "@redux-saga/core/effects";
import { setStopModalOpenedAction } from "../../modal/actions";

export function* stopQuestSaga() {
	yield put(setStopModalOpenedAction(false));
}
