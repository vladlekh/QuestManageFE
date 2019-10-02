import React from "react";
import { connect } from "react-redux";
import {
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	useMediaQuery,
	useTheme
} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { selectStopModalIsOpened } from "../../store/modal/selectors";
import { setStopModalOpenedAction } from "../../store/modal/actions";
import { stopQuestAction } from "../../store/quest/actions";

export function StopQuestComponent({ opened, onClose, onAccept }) {
	const theme = useTheme();
	const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

	return (
		<Dialog fullScreen={fullScreen} open={opened} onClose={onClose}>
			<DialogTitle>Завершение квеста</DialogTitle>
			<DialogContent>
				<DialogContentText>Вы уверены что хотите завершить квест?</DialogContentText>
			</DialogContent>
			<DialogActions>
				<Button onClick={onClose} color="secondary">
					Нет
				</Button>
				<Button onClick={onAccept} color="primary">
					Да
				</Button>
			</DialogActions>
		</Dialog>
	)
}

const mapStateToProps = state => ({
	opened: selectStopModalIsOpened(state),
});

const mapDispatchToProps = {
	onClose: () => setStopModalOpenedAction(false),
	onAccept: stopQuestAction,
};

export const StopQuestModal = connect(mapStateToProps, mapDispatchToProps)(StopQuestComponent);
