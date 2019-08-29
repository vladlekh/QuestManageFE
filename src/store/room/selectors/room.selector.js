import { createSelector } from "reselect";
import { selectRoomsObject } from "./rooms-object.selector";

export const selectRoom = (name) => createSelector(
	selectRoomsObject,
	rooms => rooms[name] || {}
);
