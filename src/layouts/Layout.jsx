import React from 'react';
import clsx from 'clsx';
import { connect } from "react-redux";
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { AppBar, CssBaseline, Divider, Drawer, IconButton, Toolbar, } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { Header } from "../feature/header";
import { StartQuestModal } from '../feature/start-quest';
import { StopQuestModal } from "../feature/stop-quest";
import { selectQuestIsInitialized } from "../store/quest/selectors";
import { LayoutMenuItems } from "./LayoutMenuItems";
import { LayoutAudioItems } from './LayoutAudioItems';

export function LayoutComponent({ children, menuConfig, questIsInitialized }) {
	const classes = useStyles();
	const theme = useTheme();
	const [open, setOpen] = React.useState(true);

	function handleDrawerOpen() {
		setOpen(true);
	}

	function handleDrawerClose() {
		setOpen(false);
	}

	return (
		<div className={classes.root}>
			<CssBaseline />
			<AppBar
				position="fixed"
				className={clsx(classes.appBar, {
					[classes.appBarShift]: open && questIsInitialized,
				})}
			>
				<Toolbar>
					<IconButton
						color="inherit"
						aria-label="Open drawer"
						onClick={handleDrawerOpen}
						edge="start"
						className={clsx(classes.menuButton, {
							[classes.hide]: open,
						})}
					>
						<MenuIcon />
					</IconButton>
					<Header />
				</Toolbar>
			</AppBar>
			{questIsInitialized && (
				<Drawer
					variant="permanent"
					className={clsx(classes.drawer, {
						[classes.drawerOpen]: open,
						[classes.drawerClose]: !open,
					})}
					classes={{
						paper: clsx({
							[classes.drawerOpen]: open,
							[classes.drawerClose]: !open,
						}),
					}}
					open={open}
				>
					<div className={classes.toolbar}>
						<IconButton onClick={handleDrawerClose}>
							{theme.direction === 'rtl' ? <ChevronRightIcon/> : <ChevronLeftIcon/>}
						</IconButton>
					</div>
					<Divider/>
					<LayoutMenuItems menuConfig={menuConfig}/>
					<Divider />
					<LayoutAudioItems />
				</Drawer>
			)}
			<main className={classes.content}>
				{children}
			</main>
			{/*<AppBar position="fixed" className={classes.bottomBar}>*/}
			{/*	<Toolbar>*/}
			{/*		<IconButton edge="start" color="inherit" aria-label="open drawer">*/}
			{/*			<MenuIcon/>*/}
			{/*		</IconButton>*/}
			{/*	</Toolbar>*/}
			{/*</AppBar>*/}
			<StartQuestModal/>
			<StopQuestModal />
		</div>
	);
}

const mapStateToProps = state => ({
	questIsInitialized: true,
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
		height: '100vh',
	},
	bottomBar: {
		top: 'auto',
		bottom: 0,
		backgroundColor: '#fff',
	}
}));
