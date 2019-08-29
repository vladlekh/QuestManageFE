import { createSelector } from "reselect";
import { selectRoom } from "./room.selector";

export const selectRoomControls = (name) => createSelector(
	selectRoom(name),
	room => room.controls || {}
);
