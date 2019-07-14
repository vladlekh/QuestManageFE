import React from "react";
import { menuConfig } from "../router";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import List from "@material-ui/core/List";
import { Link, Router } from 'react-router-dom';
import { routerHistory } from "../router/history";

export function LayoutMenu() {
	return (
		<List>
			<Router history={routerHistory}>
				{menuConfig.map(item => (
					<Link to={item.path} className="nav_item">
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
