import { createSelector } from "reselect";
import { selectNotification } from "./notification.selector";

export const selectNotificationsList = createSelector(
	selectNotification,
	({ notifications }) => notifications || []
);
