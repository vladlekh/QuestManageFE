import React from "react";
import { makeStyles, Paper } from "@material-ui/core";
import { PortsTable } from "../initial/components/PortsTable";

const useStyles = makeStyles(() => ({
	paper: {
		width: '100%',
	}
}));

export function PortsComponent() {
	const classes = useStyles();

	return (
		<Paper className={classes.paper}>
			<PortsTable/>
		</Paper>
	)
}
