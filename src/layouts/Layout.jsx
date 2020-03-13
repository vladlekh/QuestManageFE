import React, { useState } from 'react';
import clsx from 'clsx';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, CssBaseline, Divider, Drawer, Toolbar, Grid } from '@material-ui/core';
import { Header } from '../feature/header';
import { StartQuestModal } from '../feature/start-quest';
import { StopQuestModal } from '../feature/stop-quest';
import { LayoutMenuItems } from './LayoutMenuItems';
import { LayoutAudioItems } from './LayoutAudioItems';
import { selectQuestIsInitialized } from '../store/quest/selectors';
import { Logger } from '../feature/logger';
import { Light } from '../feature/light';

export function LayoutComponent({ children, menuConfig, questIsInitialized }) {
  const classes = useStyles();
  const [isLoggerVisible, setIsLoggerVisible] = useState(false);

  const toggleLoggerIsVisible = () => {
    setIsLoggerVisible(!isLoggerVisible);
  };

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
          <Header onLoggerClick={toggleLoggerIsVisible}/>
        </Toolbar>
      </AppBar>
      {questIsInitialized && (
        <Drawer
          variant="permanent"
          className={classes.drawer}
          classes={{
            paper: classes.drawerOpen,
          }}
        >
          <LayoutMenuItems menuConfig={menuConfig}/>
          <Divider/>
          <LayoutAudioItems/>
        </Drawer>
      )}
      <main className={classes.content}>
        <Grid container>
          <Grid item xs={4}>
            <Light/>
          </Grid>
          <Grid item xs={12}>
            {children}
          </Grid>
        </Grid>
      </main>
      <Drawer anchor="right" open={isLoggerVisible}
              variant="permanent"
              className={clsx(classes.loggerDrawer, {
                [classes.loggerDrawerOpen]: isLoggerVisible,
                [classes.loggerDrawerClose]: !isLoggerVisible,
              })}
              classes={{
                paper: clsx(classes.loggerPaper, {
                    [classes.loggerDrawerOpen]: isLoggerVisible,
                    [classes.loggerDrawerClose]: !isLoggerVisible,
                  },
                ),
              }}
      >
        <Logger/>
      </Drawer>
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
const loggerDrawerWidth = 350;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    paddingTop: '64px',
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
  },
  loggerDrawer: {
    width: loggerDrawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  loggerDrawerOpen: {
    top: 'unset',
    width: loggerDrawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  loggerDrawerClose: {
    width: 0,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  loggerPaper: {
    backgroundColor: '#424242',
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
    padding: theme.spacing(3),
    height: '100%',
  },
  bottomBar: {
    top: 'auto',
    bottom: 0,
    backgroundColor: '#fff',
  },
}));
