import { put } from "@redux-saga/core/effects";
import { closeNotificationAction, putNotificationAction } from "../../quest/actions";
import { NotifierButton } from "../../../feature/notifier";
import { store } from "../../store";

export function* portSaga({ payload: { success, message, port }}) {
	const key = new Date().getTime() + Math.random();
	const handleClick = () => {
		store.dispatch(closeNotificationAction(key));
	};

	yield put(putNotificationAction({
		message: `[${port}] ${message}`,
		options: {
			key,
			variant: success ? 'success' : 'error',
			action: () => NotifierButton(handleClick),
		},
	}))
}
