import React from "react";
import * as PropTypes from 'prop-types';
import { makeStyles } from "@material-ui/core";
import { connect } from "react-redux";
import { selectRoomControlsList } from "../../../../store/room/selectors";
import { Table } from "../../../../components/table";
import { QuestItemsTableRow } from "./QuestItemsTableRow";

export function QuestItemsTableComponent({ controls = [], name }) {
	const classes = useStyles();

	return (
		<Table>
			<Table.Head>
				<Table.Row>
					<Table.Cell className={classes.cellState}/>
					<Table.Cell>Название</Table.Cell>
					<Table.Cell>Порт</Table.Cell>
					<Table.Cell>Действия</Table.Cell>
					<Table.Cell className={classes.cellWarning} align="right"/>
				</Table.Row>
			</Table.Head>
			<Table.Body>
				{controls.map(control => <QuestItemsTableRow key={control.name} control={control} roomName={name}/>)}
			</Table.Body>
		</Table>
	)
}

QuestItemsTableComponent.propTypes = {
	name: PropTypes.string.isRequired,
	controls: PropTypes.arrayOf(
		PropTypes.shape({
			socketEvent: PropTypes.string,
			socketReply: PropTypes.string,
			cmd: PropTypes.string,
			name: PropTypes.string,
			displayName: PropTypes.string,
			path: PropTypes.string,
			actionReply: PropTypes.string,
			warning: PropTypes.bool,
			state: PropTypes.bool
		})
	).isRequired,
};

QuestItemsTableComponent.defaultProps = {
	controls: [],
};

const mapStateToProps = (state, props) => ({
	controls: selectRoomControlsList(props.name)(state),
});

export const QuestItemsTable = connect(mapStateToProps)(QuestItemsTableComponent);

const useStyles = makeStyles(theme => ({
	cellState: {
		width: '165px',
	},
	cellWarning: {
		width: '40px',
	},
}));
