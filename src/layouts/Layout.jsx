import React from 'react';
import clsx from 'clsx';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, CssBaseline, Divider, Drawer, Toolbar } from '@material-ui/core';
import { Header } from '../feature/header';
import { StartQuestModal } from '../feature/start-quest';
import { StopQuestModal } from '../feature/stop-quest';
import { LayoutMenuItems } from './LayoutMenuItems';
import { LayoutAudioItems } from './LayoutAudioItems';
import { selectQuestIsInitialized } from '../store/quest/selectors';
import { Logger } from '../feature/logger';

export function LayoutComponent({ children, menuConfig, questIsInitialized }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CssBaseline/>
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: questIsInitialized,
        })}
      >
        <Toolbar>
          <Header/>
        </Toolbar>
      </AppBar>
      {questIsInitialized && (
        <Drawer
          variant="permanent"
					className={classes.drawer}
					classes={{
						paper: classes.drawerOpen
					}}
        >
          <LayoutMenuItems menuConfig={menuConfig}/>
          <Divider/>
          <LayoutAudioItems/>
        </Drawer>
      )}
      <main className={classes.content}>
        {children}
        <Logger/>
      </main>
      <AppBar position="fixed" className={clsx(classes.appBar, classes.bottomBar, {
        [classes.appBarShift]: questIsInitialized,
      })}>
      </AppBar>
      <StartQuestModal/>
      <StopQuestModal/>
    </div>
  );
}

const mapStateToProps = state => ({
  questIsInitialized: selectQuestIsInitialized(state),
});

export const Layout = connect(mapStateToProps)(LayoutComponent);

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(10, 3),
    height: '100%',
  },
  bottomBar: {
    top: 'auto',
    bottom: 0,
    backgroundColor: '#fff',
  },
}));
