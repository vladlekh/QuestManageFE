import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { CircularProgress, makeStyles } from "@material-ui/core";

export function Preloader(props) {
	const classes = useStyles();

	return (
		<div className={clsx(classes.wrapper, {
			[classes.wrapperFull]: props.full,
		})} color={props.color}>
			<CircularProgress
				className={classes.progress}
				size={props.size}
				color="inherit"
			/>
		</div>
	)
}

Preloader.propTypes = {
	size: PropTypes.number,
	color: PropTypes.string,
	full: PropTypes.bool,
};

Preloader.defaultProps = {
	size: 40,
	color: 'primary',
	full: false,
};
const useStyles = makeStyles(theme => ({
	wrapper: {
		width: '100%',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		color: props => props.color,
	},
	wrapperFull: {
		height: '100%',
	},
	progress: {
		margin: theme.spacing(2),
	},
}));
