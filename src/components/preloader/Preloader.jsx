import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { makeStyles, CircularProgress } from "@material-ui/core";

export function Preloader(props) {
	const classes = useStyles();

	return (
		<div className={clsx(classes.wrapper, {
			[classes.wrapperFull]: props.full,
		})}>
			<CircularProgress
				className={classes.progress}
				size={props.size}
				color={props.color}
			/>
		</div>
	)
}

const useStyles = makeStyles(theme => ({
	wrapper: {
		width: '100%',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	},
	wrapperFull: {
		height: '100%',
	},
	progress: {
		margin: theme.spacing(2),
	},
}));

Preloader.propTypes = {
	size: PropTypes.number,
	color: PropTypes.oneOf(['primary', 'secondary']),
	full: PropTypes.bool,
};

Preloader.defaultProps = {
	size: 40,
	color: 'primary',
	full: false,
};
