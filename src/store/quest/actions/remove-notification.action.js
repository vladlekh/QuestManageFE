export const REMOVE_NOTIFICATION_ACTION = 'REMOVE_NOTIFICATION_ACTION';

export const removeNotificationAction = key => ({
	type: REMOVE_NOTIFICATION_ACTION,
	payload: { key },
});
