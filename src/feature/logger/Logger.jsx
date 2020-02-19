import React, { useCallback, useEffect, useRef, useState } from 'react';
import { AppBar, makeStyles, Paper, Toolbar } from '@material-ui/core';
import { connect } from 'react-redux';
import { selectLoggerLogs } from '../../store/logger/selectors';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import CodeIcon from '@material-ui/icons/Code';
import Fab from '@material-ui/core/Fab';
import clsx from 'clsx';
import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles(theme => ({
  paper: {
    height: '0',
    margin: theme.spacing(2, 0),
    overflowY: 'auto',
    scrollBehavior: 'smooth',
    transition: 'height .5s ease-out',
    position: 'relative',
  },
  appBar: {
    boxShadow: 'none',
  },
  paperVisible: {
    height: '50vh',
  },
  switchLabel: {
    flexGrow: 1
  },
  listItem: {
    paddingTop: 0,
    paddingBottom: 0,
  },
  fab: {
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
}));

const LoggerComponent = (props) => {
  const [showPort, setShowPort] = useState(false);
  const [isLoggerVisible, setLoggerVisibility] = useState(false);
  const classes = useStyles();

  const lastMessageRef = useRef(null);

  useEffect(() => {
    lastMessageRef.current.scrollTop = lastMessageRef.current.scrollHeight;
  }, [lastMessageRef, props.logs]);

  const handleShowPortChange = useCallback(e => {
    setShowPort(e.target.checked);
  }, [setShowPort]);

  const toggleLogger = useCallback(() => {
    setLoggerVisibility(!isLoggerVisible);
  }, [isLoggerVisible, setLoggerVisibility]);

  return (
    <>
      <Paper className={clsx(classes.paper, { [classes.paperVisible]: isLoggerVisible })} ref={lastMessageRef}>
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
            <IconButton onClick={toggleLogger}>
              <CloseIcon/>
            </IconButton>
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
      </Paper>
      {!isLoggerVisible && (
        <Fab color="primary" aria-label="logs" className={classes.fab} onClick={toggleLogger}>
          <CodeIcon/>
        </Fab>
      )}
    </>
  );
};

const mapStateToProps = state => ({
  logs: selectLoggerLogs(state),
});

export const Logger = connect(mapStateToProps)(LoggerComponent);
