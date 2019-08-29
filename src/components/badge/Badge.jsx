import React from "react";
import PropTypes from "prop-types";
import { Chip, makeStyles } from "@material-ui/core";
import { green, orange, red } from "@material-ui/core/colors";

export function Badge(props) {
	const classes = useStyles();

	return (
		<Chip
			className={props.success
				? classes.badgeSuccessful
				: classes.badge
			}
			label={props.success
				? 'Пройдено'
				: 'Не пройдено'
			}
		/>
	);
}

const useStyles = makeStyles(theme => ({
	badge: {
		backgroundColor: red[500],
		color: '#fff',
	},
	badgeWarning: {
		backgroundColor: orange[500],
		color: '#fff',
	},
	badgeSuccessful: {
		backgroundColor: green[500],
		color: '#fff',
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
