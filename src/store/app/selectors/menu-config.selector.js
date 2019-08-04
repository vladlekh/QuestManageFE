import React from "react";
import { createSelector } from "reselect";
import { map } from 'lodash';
import { Icon } from "@material-ui/core";
import { selectRoomsList } from "./rooms-list.selector";
import { selectRouterConfig } from "./router-config.selector";

const numToStringMap = new Map([
	[1, 'looks_one'],
	[2, 'looks_two'],
	[3, 'looks_three'],
	[4, 'looks_four'],
	[5, 'looks_five'],
	[6, 'looks_six'],
	[7, 'looks_seven'],
	[8, 'looks_eight'],
	[9, 'looks_nine'],
]);

export const selectMenuConfig = createSelector(
	[ selectRoomsList, selectRouterConfig ],
	(rooms, routes) => map(rooms, (room, i) => ({
		path: routes[i].path,
		name: room.name,
		title: `${i + 1} комната`,
		icon: <Icon color="action">{numToStringMap.get(i+1)}</Icon>,
	}))
);
