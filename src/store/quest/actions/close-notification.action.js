export const CLOSE_NOTIFICATION_ACTION = 'CLOSE_NOTIFICATION_ACTION';

export const closeNotificationAction = key => ({
	type: CLOSE_NOTIFICATION_ACTION,
	payload: {
		dismissAll: !key, // dismiss all if no key has been defined
		key,
	}
});
