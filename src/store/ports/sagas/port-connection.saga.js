import { put, select } from '@redux-saga/core/effects';
import { closeNotificationAction, putNotificationAction } from "../../quest/actions";
import { NotifierButton } from "../../../feature/notifier";
import { store } from "../../store";
import { setPortConnectedAction } from "../actions";
import { selectNotificationItem } from '../../quest/selectors';

export function* portConnectionSaga({ payload: { success, message, port }}) {
	const key = `${port}:${success ? 'connected' : 'disconnected'}`;
	const handleClick = () => {
		store.dispatch(closeNotificationAction(key));
	};

	yield put(setPortConnectedAction(port, success));
	const notificationExists = yield select(selectNotificationItem(key));
	if(!notificationExists) {
		yield put(putNotificationAction({
			message: `[${port}] ${message}`,
			options: {
				key,
				variant: success ? 'success' : 'error',
				action: () => NotifierButton(handleClick),
			},
		}))
	}
}
