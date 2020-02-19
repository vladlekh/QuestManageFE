export const PUT_NOTIFICATION_ACTION = 'PUT_NOTIFICATION_ACTION';

export const putNotificationAction = notification => {
	const key = notification.options && notification.options.key;

	return {
		type: PUT_NOTIFICATION_ACTION,
		payload: {
			notification: {
				...notification,
				key: key,
			},
		}
	};
};
