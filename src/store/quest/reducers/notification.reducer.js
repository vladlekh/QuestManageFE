import { CLOSE_NOTIFICATION_ACTION, PUT_NOTIFICATION_ACTION, REMOVE_NOTIFICATION_ACTION } from "../actions";

const initialState = {
	notifications: [],
};

export const notificationReducer = (state = initialState, action) => {
	switch (action.type) {
		case PUT_NOTIFICATION_ACTION: {
			const { notification } = action.payload;

			return {
				...state,
				notifications: [
					...state.notifications,
					{
						key: action.key,
						...notification,
					},
				],
			};
}
		case CLOSE_NOTIFICATION_ACTION: {
			const { dismissAll, key } = action.payload;
			return {
				...state,
				notifications: state.notifications.map(notification => (
					(dismissAll || notification.key === key)
						? { ...notification, dismissed: true }
						: { ...notification }
				)),
			}
		}
		case REMOVE_NOTIFICATION_ACTION: {
			const { key } = action.payload;
			return {
				...state,
				notifications: state.notifications.filter(
					notification => notification.key !== key,
				),
			};
		}
		default:
			return state;
	}
};
