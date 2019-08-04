import React from "react";
import PropTypes from "prop-types";
import { Avatar, makeStyles } from "@material-ui/core";
import { green, orange, red } from "@material-ui/core/colors";

export function Badge(props) {
	const classes = useStyles();

	return <Avatar className={props.warning
		? classes.badgeWarning
		: props.success
			? classes.badgeSuccessful
			: classes.badge
	}/>;
}

const useStyles = makeStyles(theme => ({
	badge: {
		backgroundColor: red[500]
	},
	badgeWarning: {
		backgroundColor: orange[500]
	},
	badgeSuccessful: {
		backgroundColor: green[500],
	}
}));

Badge.propTypes = {
	warning: PropTypes.bool,
	success: PropTypes.bool,
};

Badge.defaultProps = {
	warning: false,
	success: false,
};
