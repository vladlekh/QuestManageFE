import React from "react";
import { createSelector } from "reselect";
import { map } from 'lodash';
import { Icon } from "@material-ui/core";
import { selectRoomsList } from "../../room/selectors/rooms-list.selector";
import { selectRouterConfig } from "./router-config.selector";

const numToStringMap = new Map([
	[1, 'looks_one'],
	[2, 'looks_two'],
	[3, 'looks_3'],
	[4, 'looks_4'],
	[5, 'looks_5'],
	[6, 'looks_6'],
	[7, 'looks_7'],
	[8, 'looks_8'],
	[9, 'looks_9'],
]);

export const selectMenuConfig = createSelector(
	[ selectRoomsList, selectRouterConfig ],
	(rooms, routes) => map(rooms, (room, i) => ({
		path: routes[i].path,
		name: room.name,
		title: room.displayName,
		icon: <Icon color="action">{numToStringMap.get(i+1)}</Icon>,
	}))
);
