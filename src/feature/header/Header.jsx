import React, { useCallback, useState } from "react";
import Button from "@material-ui/core/Button";
import { makeStyles, withStyles } from "@material-ui/core";
import { green } from "@material-ui/core/colors";
import PlayIcon from "@material-ui/icons/PlayArrow"
import { StartQuestModal } from "../start-quest";
import { startQuestAction } from "../../store/quest/actions";
import { connect } from "react-redux";
import { ActionHelper } from "../../utils/action.helper";
import { switchLightAction } from "../../store/light/actions/switch-light.action";

const useStyles = makeStyles(theme => ({
	icon: {
		marginRight: theme.spacing(1),
	},
	button: {
		margin: theme.spacing(1),
	},
	grow: {
		flexGrow: 1,
	},
}));

const StartButton = withStyles({
	root: {
		backgroundColor: green[500],
		borderColor: green[500],
		color: '#fff',
		'&:hover': {
			backgroundColor: green[600],
			borderColor: green[600],
		},
		'&:active': {
			boxShadow: 'none',
			backgroundColor: green[700],
			borderColor: green[700],
		}
	}
})(Button);

export function HeaderComponent({ startQuest, reset, switchLight }) {
	const classes = useStyles();

	const [ open, setOpen ] = useState(false);

	const handleClose = useCallback(() => setOpen(false), []);

	const handleOpen = useCallback(() => setOpen(true), []);

	const handleAccept = useCallback(() => {
		startQuest();
		handleClose();
	}, [ startQuest, handleClose ]);

	const handleReset = useCallback(() => {
		reset('reset')
	}, [ reset ]);

	const handleLight = useCallback(() => {
		switchLight('reset')
	}, [ switchLight ]);

	return (
		<>
			<StartButton variant="contained" onClick={handleOpen}>
				<PlayIcon className={classes.icon}/>
				Начать
			</StartButton>

			<div className={classes.grow}/>
			<Button className={classes.button} variant="contained" color="primary" onClick={handleLight}>Свет</Button>
			<Button className={classes.button} variant="contained" color="secondary" onClick={handleReset}>Reset</Button>
			<StartQuestModal open={open} onClose={handleClose} onAccept={handleAccept}/>
		</>
	)
}

export const mapDispatchToProps = {
	startQuest: startQuestAction,
	reset: ActionHelper.emit,
	switchLight: switchLightAction,
};

export const Header = connect(null, mapDispatchToProps)(HeaderComponent);
