import React, { useCallback } from "react";
import { connect } from "react-redux";
import * as PropTypes from 'prop-types';
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core";
import { ActionHelper } from "../../utils/action.helper";
import { selectQuestPaused } from "../../store/quest/selectors";
import { setStopModalOpenedAction } from "../../store/modal/actions";
import { HeaderControls } from "./HeaderControls";

export function HeaderComponent({ questPaused, stopQuest, emit }) {
	const classes = useStyles();

	const handleReset = useCallback(() => emit('reset'), [ emit ]);

	return (
		<>
			<HeaderControls className={classes.controls}/>
			<div className={classes.grow}/>
			<Button className={classes.button} disabled={!questPaused} variant="contained" color="secondary"
							onClick={stopQuest}>Завершить</Button>
			<Button className={classes.button} variant="contained" color="secondary" onClick={handleReset}>Reset</Button>
		</>
	)
}

HeaderComponent.propTypes = {
	questPaused: PropTypes.bool,
	stopQuest: PropTypes.func.isRequired,
	emit: PropTypes.func.isRequired,
};

HeaderComponent.defaultProps = {
	questPaused: false,
};

export const mapStateToProps = (state) => ({
	questPaused: selectQuestPaused(state)
});

export const mapDispatchToProps = {
	stopQuest: () => setStopModalOpenedAction(true),
	emit: ActionHelper.emit,
};

export const Header = connect(mapStateToProps, mapDispatchToProps)(HeaderComponent);

const useStyles = makeStyles(() => ({
	grow: {
		flexGrow: 7,
	}
}));
