import React from "react";
import { connect } from "react-redux";
import { Paper, Typography } from "@material-ui/core";
import { selectRoomDisplayName } from "../../store/room/selectors";
import { QuestItemsTable } from "./components/quest-items-table";

export function RoomComponent(props) {
	return (
		<>
			<Typography variant="h3" color="textPrimary" gutterBottom>{props.displayName}</Typography>
			<Paper>
				<QuestItemsTable name={props.name}/>
			</Paper>
		</>
	)
}

const mapStateToProps = (state, props) => ({
	displayName: selectRoomDisplayName(props.name)(state),
});

export const Room = connect(mapStateToProps)(RoomComponent);
