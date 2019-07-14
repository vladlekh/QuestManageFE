import React, { useCallback } from "react";
import { makeStyles } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { useDispatch, useSelector } from "react-redux";
import { toggleBox } from "../../store/room1/actions";
import { toggleCoffin } from "../../store/room1/actions/toggle-coffin";

const useStyles = makeStyles(theme => ({
	button: {
		margin: theme.spacing(1),
	},
	input: {
		display: 'none',
	},
}));

export function Room1() {
	const classes = useStyles();
	const dispatch = useDispatch();
	const boxState = useSelector(state => state.room1.box);
	const coffinState = useSelector(state => state.room1.coffin);

	const handleBoxClick = useCallback(() => dispatch(toggleBox()), [dispatch]);
	const handleCoffinClick = useCallback(() => dispatch(toggleCoffin()), [dispatch]);

	return (
		<React.Fragment>
			<Button
				variant="contained"
				color="primary"
				disabled={boxState}
				className={classes.button}
				onClick={handleBoxClick}
			>
				Открыть ящик
			</Button>
			<Button
				variant="contained"
				color="primary"
				disabled={coffinState}
				className={classes.button}
				onClick={handleCoffinClick}
			>
				Открыть гроб
			</Button>
		</React.Fragment>
	);
};
