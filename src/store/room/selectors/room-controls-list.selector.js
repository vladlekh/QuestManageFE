import { createSelector } from "reselect";
import { reduce } from "lodash";
import { selectRoom } from "./room.selector";

export const selectRoomControlsList = (name) => createSelector(
	selectRoom(name),
	room => reduce(room.controls || {}, (acc, val) => [...acc, val], []) || []
);
