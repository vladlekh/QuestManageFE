import React from "react";
import { Link, Router } from 'react-router-dom';
import {
	ListItem,
	ListItemText,
	List,
	ListItemIcon
} from "@material-ui/core";
import { routerHistory } from "../router/history";

export function LayoutMenu({ menuConfig }) {
	return (
		<List>
			<Router history={routerHistory}>
				{menuConfig.map(item => (
					<Link to={item.path} className="nav_item" key={item.name}>
						<ListItem button key={item.name}>
							<ListItemIcon>{item.icon}</ListItemIcon>
							<ListItemText primary={item.title}/>
						</ListItem>
					</Link>
				))}
			</Router>
		</List>
	);
};
