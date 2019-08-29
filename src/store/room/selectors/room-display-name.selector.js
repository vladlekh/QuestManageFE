import { createSelector } from "reselect";
import { selectRoom } from "./room.selector";

export const selectRoomDisplayName = (name) => createSelector(
	selectRoom(name),
	room => room.displayName || ''
);
