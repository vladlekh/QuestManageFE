import React, { useMemo } from "react";
import * as PropTypes from 'prop-types';
import { LinearProgress, makeStyles } from "@material-ui/core";
import { ReportProblemOutlined } from "@material-ui/icons";
import { Table } from "../../../../components/table";
import { QuestItemsTableStateCell } from "./QuestItemsTableStateCell";
import { QuestItemsTableActionCell } from "./QuestItemsTableActionCell";

export function QuestItemsTableRow({ control = {}, roomName }) {
	const classes = useStyles();

	const loadingRow = useMemo(() => (
		control.warning && (
			<Table.Row>
				<Table.Cell colSpan={5} padding="none" className={classes.cellLoading}>
					<LinearProgress color="secondary"/>
				</Table.Cell>
			</Table.Row>
		)
	), [ control.warning, classes ]);

	return (
		<>
			{loadingRow}
			<Table.Row>
				<QuestItemsTableStateCell state={control.state}/>
				<Table.Cell>{control.displayName}</Table.Cell>
				<Table.Cell>{control.path}</Table.Cell>
				<QuestItemsTableActionCell socketEvent={control.socketEvent} name={control.name} roomName={roomName}/>
				<Table.Cell>
					{control.warning && <ReportProblemOutlined color="secondary" fontSize="large"/>}
				</Table.Cell>
			</Table.Row>
		</>
	)
}

QuestItemsTableRow.propTypes = {
	control: PropTypes.shape({
		socketEvent: PropTypes.string,
		socketReply: PropTypes.string,
		cmd: PropTypes.string,
		name: PropTypes.string,
		displayName: PropTypes.string,
		path: PropTypes.string,
		actionReply: PropTypes.string,
		warning: PropTypes.bool,
		state: PropTypes.bool
	}).isRequired,
	roomName: PropTypes.string.isRequired,
};

const useStyles = makeStyles(theme => ({
	cellLoading: {
		border: 'none',
	},
}));
