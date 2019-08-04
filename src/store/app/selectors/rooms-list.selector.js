import { createSelector } from "reselect";
import { reduce } from "lodash";
import { selectRoomsObject } from "./rooms-object.selector";

export const selectRoomsList = createSelector(
	selectRoomsObject,
	rooms => reduce(rooms || {}, (acc, val, key) => {
		return [
			...acc,
			{
				name: key,
				...val
			}
		]
	}, [])
);
