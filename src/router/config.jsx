import React from "react";
import { Redirect } from "react-router-dom";
import { Room1 } from "../views/room1/Room1";

export const room1RouterConfig = {
	path: '/room1',
	component: Room1,
};

export const routerConfig = [
	room1RouterConfig,
	{
		path: '/room2',
		render: () => <h1>ROOM 2</h1>
	},
	{
		exact: true,
		path: '',
		render: () => <Redirect to="/room1"/>
	},
];
