import React, { useCallback } from "react";
import { connect, useDispatch } from "react-redux";
import { Button, makeStyles, Paper } from "@material-ui/core";
import { selectRoomControlsList } from "../../store/app/selectors";
import { Table } from "../../components/table";
import { Badge } from "../../components/badge";
import { emitAction } from "../../store/app/actions";
import { ActionHelper } from "../../utils/action.helper";

export function RoomComponent(props) {
	const classes = useStyles();
	const dispatch = useDispatch();
	const handleBtnClick = useCallback((event, name) => dispatch(
		{
			type: ActionHelper.createEmitActionType(props.name),
			payload: { event, name }
		}
	), [ dispatch ]);

	return (
		<Paper>
			<Table>
				<Table.Head>
					<Table.Row>
						<Table.Cell>Состояние</Table.Cell>
						<Table.Cell>Название</Table.Cell>
						<Table.Cell>Действия</Table.Cell>
					</Table.Row>
				</Table.Head>
				<Table.Body>
					{props.controls.map(control => (
						<Table.Row key={control.name}>
							<Table.Cell>
								<Badge success={control.state} warning={control.warning} />
							</Table.Cell>
							<Table.Cell>{control.displayName}</Table.Cell>
							<Table.Cell>
								<Button
									color="primary"
									variant="contained"
									className={classes.button}
									// disabled={control.state}
									onClick={() => handleBtnClick(control.socketEvent, control.name)}
								>
									Активировать
								</Button>
							</Table.Cell>
						</Table.Row>
					))}
				</Table.Body>
			</Table>
		</Paper>
	)
}

const mapStateToProps = (state, props) => ({
	controls: selectRoomControlsList(props.name)(state)
});

const mapDispatchToProps = {
	emitAction,
};

export const Room = connect(mapStateToProps, mapDispatchToProps)(RoomComponent);

const useStyles = makeStyles(theme => ({
	button: {
		margin: theme.spacing(1),
	},
}));
