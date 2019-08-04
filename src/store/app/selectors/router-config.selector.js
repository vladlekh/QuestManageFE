import React from "react";
import { Redirect } from "react-router-dom";
import { createSelector } from "reselect";
import { Room } from "../../../views/room";
import { selectRoomsList } from "./rooms-list.selector";

const staticRoutes = [
	{
		exact: true,
		path: '',
		render: () => <Redirect to="/room1"/>
	}
];

export const selectRouterConfig = createSelector(
	selectRoomsList,
	rooms => [ ...rooms.map(room => ({
		path: `/${room.name}`,
		component: () => <Room name={room.name}/>,
	})), ...staticRoutes ]
);
