import React, { useCallback, useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import clsx from 'clsx';
import { AppBar, makeStyles, Toolbar } from '@material-ui/core';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Divider from '@material-ui/core/Divider';
import { selectLoggerLogs } from '../../store/logger/selectors';

const useStyles = makeStyles(theme => ({
  paper: {
    margin: theme.spacing(0),
    overflowY: 'auto',
    scrollBehavior: 'smooth',
    transition: 'height .5s ease-out',
    position: 'relative',
    backgroundColor: '#424242',
  },
  appBar: {
    boxShadow: 'none',
    backgroundColor: '#424242',
  },
  switchLabel: {
    flexGrow: 1,
    color: '#fff'
  },
  listItem: {
    paddingTop: 0,
    paddingBottom: 0,
    color: '#fff'
  },
}));

const LoggerComponent = (props) => {
  const [showPort, setShowPort] = useState(false);
  const classes = useStyles();

  const lastMessageRef = useRef(null);

  useEffect(() => {
    lastMessageRef.current.scrollTop = lastMessageRef.current.scrollHeight;
  }, [lastMessageRef, props.logs]);

  const handleShowPortChange = useCallback(e => {
    setShowPort(e.target.checked);
  }, [setShowPort]);

  return (
    <div className={clsx(classes.paper)} ref={lastMessageRef}>
      <AppBar position="sticky" color="transparent" className={classes.appBar}>
        <Toolbar>
          <FormControlLabel
            edge="start"
            control={
              <Switch checked={showPort} onChange={handleShowPortChange}/>
            }
            className={classes.switchLabel}
            label="Показать порт"
          />
        </Toolbar>
      </AppBar>
      <Divider/>
      <List disablePadding>
        {props.logs.map(({ message, port }, i) => (
          <ListItem key={`${port}:${message}_${i}`} className={classes.listItem}>
            <ListItemText>> {showPort && `${port}: `}{`\t${message}`}</ListItemText>
          </ListItem>
        ))}
      </List>
    </div>
  );
};

const mapStateToProps = state => ({
  logs: selectLoggerLogs(state),
});

export const Logger = connect(mapStateToProps)(LoggerComponent);
