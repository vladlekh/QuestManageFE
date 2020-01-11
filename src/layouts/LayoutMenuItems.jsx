import React from 'react';
import { Link, Router } from 'react-router-dom';
import {
  ListItem,
  ListItemText,
  List,
  ListItemIcon,
} from '@material-ui/core';
import { routerHistory } from '../router/history';
import ListSubheader from '@material-ui/core/ListSubheader';

export function LayoutMenuItems({ menuConfig }) {
  return (
    <List
      aria-labelledby="rooms-list-subheader"
      subheader={
        <ListSubheader component="div" id="rooms-list-subheader">
          Список комнат
        </ListSubheader>
      }
    >
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
