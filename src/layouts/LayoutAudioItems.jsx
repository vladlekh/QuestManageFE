import React, { useCallback, useMemo } from 'react';
import { audioListSelector } from '../store/audio/selectors';
import { connect } from 'react-redux';
import { List, ListItem, ListItemText, makeStyles } from '@material-ui/core';
import ListSubheader from '@material-ui/core/ListSubheader';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import PlayArrowIcon from '@material-ui/icons/PlayCircleOutline';
import PauseIcon from '@material-ui/icons/PauseCircleOutline';
import { playAudio, stopAudioSmoothly } from '../middleware/audio.middleware';
import clsx from 'clsx';

const useStyles = makeStyles(theme => ({
  list: {
    paddingLeft: '16px',
    paddingRight: '16px',
  },
  listSubHeader: {
    paddingLeft: 0,
    paddingRight: 0,
  },
  listItem: {
    padding: 0,
    borderRadius: '40px',
    marginTop: '8px',
    marginBottom: '8px',
    border: `1px solid ${theme.palette.divider}`,
  },
  listItemActive: {
    borderColor: theme.palette.primary.main,
  },
  listItemContent: {
    padding: '8px 16px',
    display: 'flex',
    position: 'relative',
    boxSizing: 'border-box',
    textAlign: 'left',
    alignItems: 'center',
    justifyContent: 'flex-start',
    textDecoration: 'none',
  },
}));

const LayoutAudioItemsComponent = (props) => {
  const classes = useStyles();

  const handleItemClick = useCallback(item => {
    item.isActive ? props.stopAudio(item) : props.playAudio(item);
  });

  const listItemClassName = (isActive) => clsx(
    classes.listItem,
    {
      [classes.listItemActive]: isActive
    }
  );

  return (
    <List
      className={classes.list}
      aria-labelledby="audio-list-subheader"
      subheader={
        <ListSubheader component="div" id="audio-list-subheader" className={classes.listSubHeader}>
          Аудио
        </ListSubheader>
      }>
      {props.list.map(item => (
        <ListItem button key={item.name} className={listItemClassName(item.isActive)} onClick={e => handleItemClick(item)}>
          <div className={classes.listItemContent}>
            <ListItemIcon>
              {item.isActive ? <PauseIcon/> : <PlayArrowIcon/>}
            </ListItemIcon>
            <ListItemText primary={item.displayName}/>
          </div>
        </ListItem>
      ))}
    </List>
  );
};

const mapStateToProps = (state) => ({
  list: audioListSelector(state),
});

const mapDispatchToProps = {
  playAudio,
  stopAudio: stopAudioSmoothly,
};

export const LayoutAudioItems = connect(mapStateToProps, mapDispatchToProps)(LayoutAudioItemsComponent);
