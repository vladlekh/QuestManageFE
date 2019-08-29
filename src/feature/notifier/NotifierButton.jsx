import React from "react";
import { IconButton, withStyles } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";

const StyledButton = withStyles({
	root: {
		color: '#fff'
	}
})(IconButton);

export function NotifierButton(handleClick) {

	return (
		<StyledButton aria-label="close" onClick={handleClick}>
			<CloseIcon />
		</StyledButton>
	);
}
