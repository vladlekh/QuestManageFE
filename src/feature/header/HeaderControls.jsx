import React, { useCallback, useMemo } from "react";
import * as PropTypes from "prop-types";
import { connect } from "react-redux";
import styled from "styled-components";
import { makeStyles, withStyles } from "@material-ui/core";
import { amber, green } from "@material-ui/core/colors";
import Button from "@material-ui/core/Button";
import PauseIcon from "@material-ui/icons/Pause";
import LoopIcon from "@material-ui/icons/Loop"
import { Stopwatch } from "../../components/stopwatch";
import { selectQuestStatus } from "../../store/quest/selectors";
import { setQuestPauseAction } from "../../store/quest/actions";

export function HeaderControlsComponent({ questStarted, questPaused, setQuestPause }) {
	const classes = useStyles();

	const handlePauseClick = useCallback(() => setQuestPause(true), [ setQuestPause ]);

	const handleResumeClick = useCallback(() => setQuestPause(false), [ setQuestPause ]);

	const controlButton = useMemo(() => {
		if (questStarted) {
			if (questPaused) {
				return (
					<StartButton variant="contained" onClick={handleResumeClick}>
						<LoopIcon className={classes.icon}/>
						Возобновить
					</StartButton>
				);
			}
			return (
				<PauseButton variant="contained" onClick={handlePauseClick}>
					<PauseIcon className={classes.icon}/>
					Приостановить
				</PauseButton>
			)
		}
	}, [ questStarted, questPaused, classes, handleResumeClick, handlePauseClick ]);

	return (
		<HeaderControlsWrapper>
			{controlButton}
			<Stopwatch timerOn={questStarted} timerPaused={questPaused}/>
		</HeaderControlsWrapper>
	)
}

HeaderControlsComponent.propTypes = {
	questStarted: PropTypes.bool.isRequired,
	questPaused: PropTypes.bool.isRequired,
	setQuestPause: PropTypes.func.isRequired,
};

export const mapStateToProps = (state) => {
	const { started: questStarted, paused: questPaused } = selectQuestStatus(state);
	return { questPaused, questStarted }
};

export const mapDispatchToProps = {
	setQuestPause: setQuestPauseAction,
};

export const HeaderControls = connect(mapStateToProps, mapDispatchToProps)(HeaderControlsComponent);

const StartButton = withStyles({
	root: {
		backgroundColor: green[500],
		borderColor: green[500],
		color: '#fff',
		width: '190px',
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

const PauseButton = withStyles({
	root: {
		backgroundColor: amber[500],
		borderColor: amber[500],
		color: '#fff',
		width: '190px',
		'&:hover': {
			backgroundColor: amber[600],
			borderColor: amber[600],
		},
		'&:active': {
			boxShadow: 'none',
			backgroundColor: amber[700],
			borderColor: amber[700],
		}
	}
})(Button);

const HeaderControlsWrapper = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	flex-grow: 1;
`;

const useStyles = makeStyles(theme => ({
	icon: {
		marginRight: theme.spacing(1),
	},
	button: {
		margin: theme.spacing(1),
	},
}));
