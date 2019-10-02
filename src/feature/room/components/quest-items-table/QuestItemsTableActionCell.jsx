import React, { useCallback } from "react";
import * as PropTypes from 'prop-types';
import { useDispatch } from "react-redux";
import { Button, makeStyles } from "@material-ui/core";
import { Table } from "../../../../components/table";
import { ActionHelper } from "../../../../utils/action.helper";

export function QuestItemsTableActionCell({ socketEvent, name, roomName }) {
	const classes = useStyles();
	const dispatch = useDispatch();

	const handleBtnClick = useCallback(() => dispatch(
		{
			type: ActionHelper.createEmitActionType(roomName),
			payload: { event: socketEvent, name }
		}
	), [ dispatch, name, socketEvent, roomName ]);

	return (
		<Table.Cell>
			<Button
				color="primary"
				variant="contained"
				className={classes.button}
				onClick={handleBtnClick}
			>
				Активировать
			</Button>
		</Table.Cell>
	)
}

QuestItemsTableActionCell.propTypes = {
	socketEvent: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
	roomName: PropTypes.string.isRequired,
};

const useStyles = makeStyles(theme => ({
	button: {
		margin: theme.spacing(1),
	},
}));
