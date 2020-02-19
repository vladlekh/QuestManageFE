import List from '@material-ui/core/List';
import { selectLoggerLogs } from '../../store/logger/selectors';
import { connect } from 'react-redux';
import React from 'react';
import { ListItemText } from '@material-ui/core';
import ListItem from '@material-ui/core/ListItem';

const LoggerListComponent = (props) => {
  return (
    <List>
      {props.logs.map(({ message, port }, i) => (
        <ListItem key={`${port}:${message}_${i}`}>
          <ListItemText>{port}: {message}</ListItemText>
        </ListItem>
      ))}
    </List>
  )
};

const mapStateToProps = state => ({
  logs: selectLoggerLogs(state)
});

export const LoggerList = connect(mapStateToProps)(LoggerListComponent)
