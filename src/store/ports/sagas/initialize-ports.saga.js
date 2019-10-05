import { actionChannel, flush, put, take } from "@redux-saga/core/effects";
import { ActionHelper } from "../../../utils/action.helper";
import {
	PORT_INITIALIZATION_SUCCESS_ACTION,
	portInitializationErrorAction,
	setPortInitializingAction
} from "../../ports/actions";
import { initializeQuestAction, startQuestAction } from "../../quest/actions";
import { setStartModalOpenedAction } from "../../modal/actions";

export function* initializePortsSaga() {
	let channel;

	try {
		yield put(setPortInitializingAction(true));
		yield put(setStartModalOpenedAction(false));
		yield put(ActionHelper.emit(ActionHelper.eventEnum.reset));

		channel = yield actionChannel(PORT_INITIALIZATION_SUCCESS_ACTION);

		while (true) {
			yield take(channel);

			yield put(setPortInitializingAction(false));
			yield put(initializeQuestAction(true));
			yield put(startQuestAction());
		}
	} catch (e) {
		yield put(portInitializationErrorAction());
	} finally {
		channel.close();
		yield flush(channel)
	}
}
