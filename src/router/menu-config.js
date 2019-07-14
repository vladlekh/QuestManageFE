import React from "react";
import { room1RouterConfig } from "./config";
import LooksOneIcon from '@material-ui/icons/LooksOne';
import LooksTwoIcon from '@material-ui/icons/LooksTwo';

export const menuConfig = [
	{
		path: room1RouterConfig.path,
		name: 'room1',
		title: '1 комната',
		icon: <LooksOneIcon />,
	},
	{
		path: '/room2',
		name: 'room2',
		title: '2 комната',
		icon: <LooksTwoIcon/>,
	}
];
