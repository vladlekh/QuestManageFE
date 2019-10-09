import { put } from "@redux-saga/core/effects";
import { closeNotificationAction, putNotificationAction } from "../../quest/actions";
import { NotifierButton } from "../../../feature/notifier";
import { store } from "../../store";
import { setPortConnectedAction } from "../actions";

export function* portConnectionSaga({ payload: { success, message, port }}) {
	const key = new Date().getTime() + Math.random();
	const handleClick = () => {
		store.dispatch(closeNotificationAction(key));
	};

	yield put(setPortConnectedAction(port, success));
	yield put(putNotificationAction({
		message: `[${port}] ${message}`,
		options: {
			key,
			variant: success ? 'success' : 'error',
			action: () => NotifierButton(handleClick),
		},
	}))
}
