import React, { useCallback } from 'react';
import * as PropTypes from 'prop-types';
import { makeStyles, withStyles } from "@material-ui/core";
import { green } from "@material-ui/core/colors";
import Button from "@material-ui/core/Button";
import PlayIcon from "@material-ui/icons/PlayArrow";
import styled from "styled-components";
import { connect } from "react-redux";
import { setStartModalOpenedAction } from '../../store/modal/actions';
import { PortsComponent } from "../ports/Ports";

export function InitialComponent({ setStartModalOpened }) {
	const classes = useStyles();

	const handleStartButtonClick = useCallback(() => setStartModalOpened(true), [ setStartModalOpened ]);

	return (
		<InitialWrapper>
			<StartButton variant="contained" className={classes.button} onClick={handleStartButtonClick}>
				<PlayIcon className={classes.icon}/>
				Начать
			</StartButton>
			<PortsWrapper>
				<PortsComponent/>
			</PortsWrapper>
		</InitialWrapper>
	)
}

InitialComponent.propTypes = {
	setStartModalOpened: PropTypes.func.isRequired,
};


const mapDispatchToProps = {
	setStartModalOpened: setStartModalOpenedAction,
};

export const Initial = connect(null, mapDispatchToProps)(InitialComponent);

const useStyles = makeStyles(theme => ({
	icon: {
		marginRight: theme.spacing(1),
	},
	button: {
		margin: theme.spacing(1),
	},
}));

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

const InitialWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    height: 100%;
`;

const PortsWrapper = styled.div`
    width: 100%;
`;
