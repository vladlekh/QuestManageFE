import React from "react";
import { Redirect } from "react-router-dom";
import { createSelector } from "reselect";
import { Room } from "../../../feature/room";
import { selectRoomsList } from "../../room/selectors/rooms-list.selector";
import { Initial } from "../../../feature/initial/Initial";
import { Guard } from "../../../feature/guard";

const staticRoutes = [
	{
		path: '/initial',
		render: () => <Initial />
	},
	{
		exact: true,
		path: '',
		render: () => <Redirect to="/room1"/>
	},
];

export const selectRouterConfig = createSelector(
	selectRoomsList,
	rooms => [ ...rooms.map(room => ({
		path: `/${room.name}`,
		guard: Guard,
		render: () => <Room name={room.name}/>,
	})), ...staticRoutes ]
);
