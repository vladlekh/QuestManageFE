import React, { useCallback } from "react";
import { connect, useDispatch } from "react-redux";
import { Button, LinearProgress, makeStyles, Paper, Typography } from "@material-ui/core";
import { ReportProblemOutlined } from "@material-ui/icons";
import { selectRoomControlsList, selectRoomDisplayName } from "../../store/room/selectors";
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
	), [ dispatch, props.name ]);

	return (
		<>
			<Typography variant="h3" color="textPrimary" gutterBottom>{props.displayName}</Typography>
			<Paper>
				<Table>
					<Table.Head>
						<Table.Row>
							<Table.Cell className={classes.cellState}/>
							<Table.Cell>Название</Table.Cell>
							<Table.Cell>Порт</Table.Cell>
							<Table.Cell>Действия</Table.Cell>
							<Table.Cell className={classes.cellState} align="right"/>
						</Table.Row>
					</Table.Head>
					<Table.Body>
						{props.controls.map(control => (
							<>
								{control.warning && <Table.Row key={`loading_${control.name}`}>
									<Table.Cell colSpan={5} padding="none" className={classes.cellLoading}>
										<LinearProgress color="secondary"/>
									</Table.Cell>
								</Table.Row>}
								<Table.Row key={control.name}>
									<Table.Cell>
										<Badge success={control.state}/>
									</Table.Cell>
									<Table.Cell>{control.displayName}</Table.Cell>
									<Table.Cell>{control.path}</Table.Cell>
									<Table.Cell>
										<Button
											color="primary"
											variant="contained"
											className={classes.button}
											onClick={() => handleBtnClick(control.socketEvent, control.name)}
										>
											Активировать
										</Button>
									</Table.Cell>
									<Table.Cell>
										{control.warning && <ReportProblemOutlined color="secondary" fontSize="large"/>}
									</Table.Cell>
								</Table.Row>
							</>
						))}
					</Table.Body>
				</Table>
			</Paper>
		</>
	)
}

const mapStateToProps = (state, props) => ({
	controls: selectRoomControlsList(props.name)(state),
	displayName: selectRoomDisplayName(props.name)(state),
});

const mapDispatchToProps = {
	emitAction,
};

export const Room = connect(mapStateToProps, mapDispatchToProps)(RoomComponent);

const useStyles = makeStyles(theme => ({
	cellState: {
		width: '165px',
	},
	cellWarning: {
		width: '40px',
	},
	cellLoading: {
		border: 'none',
	},
	button: {
		margin: theme.spacing(1),
	},
}));
