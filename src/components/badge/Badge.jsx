import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { Chip, makeStyles } from "@material-ui/core";
import { green, orange, red } from "@material-ui/core/colors";

export function Badge(props) {
	const classes = useStyles();

	const chipClassNames = clsx(classes.badge, {
		[classes.badgeSuccessful]: props.success,
		[classes.badgeWarning]: props.warning,
		[classes.badgePrimary]: props.primary,
		[classes.badgeError]: props.error,
	});

	return (
		<Chip
			className={chipClassNames}
			label={props.label}
		/>
	);
}

Badge.propTypes = {
	label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
	success: PropTypes.bool,
	warning: PropTypes.bool,
	primary: PropTypes.bool,
	error: PropTypes.bool,
};

Badge.defaultProps = {
	label: '',
	warning: false,
	success: false,
	primary: false,
	error: false,
};

const useStyles = makeStyles(theme => {
	return {
		badge: {
			color: '#fff',
		},
		badgeWarning: {
			backgroundColor: orange[500],
		},
		badgeSuccessful: {
			backgroundColor: green[500],
		},
		badgeError: {
			backgroundColor: red[500],
		},
		badgePrimary: {
			backgroundColor: theme.palette.primary.main,
		}
	}
});

