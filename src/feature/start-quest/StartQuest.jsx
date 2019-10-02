import React from "react";
import { connect } from "react-redux";
import {
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	makeStyles,
	useMediaQuery,
	useTheme
} from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import { updateQuestPersonsAction } from "../../store/quest/actions";
import { selectQuestPersons } from "../../store/quest/selectors";
import { setStartModalOpenedAction } from "../../store/modal/actions";
import { selectStartModalIsOpened } from "../../store/modal/selectors";
import { initializePortsAction } from "../../store/ports/actions";

const useStyles = makeStyles(theme => ({
	container: {
		display: 'flex',
		flexWrap: 'wrap',
	},
	formControl: {
		margin: theme.spacing(1),
		minWidth: 120,
		width: '100%'
	},
}));

export function StartQuestComponent({ opened, value, onClose, onAccept, onChange }) {
	const classes = useStyles();
	const theme = useTheme();
	const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

	const handleChange = (e) => {
		onChange(e.target.value);
	};

	return (
		<Dialog fullScreen={fullScreen} open={opened} onClose={onClose}>
			<DialogTitle>Запуск квеста</DialogTitle>
			<DialogContent>
				<DialogContentText>Выберите количество игроков</DialogContentText>
				<form className={classes.container}>
					<FormControl className={classes.formControl}>
						<InputLabel htmlFor="persons-count">Кол-во</InputLabel>
						<Select
							value={value}
							onChange={handleChange}
							inputProps={{
								id: 'persons-count',
								name: 'persons'
							}}
						>
							<MenuItem value={3}>Три</MenuItem>
							<MenuItem value={4}>Четыре</MenuItem>
							<MenuItem value={5}>Пять</MenuItem>
							<MenuItem value={6}>Шесть</MenuItem>
						</Select>
					</FormControl>
				</form>
			</DialogContent>
			<DialogActions>
				<Button onClick={onClose} color="secondary">
					Отмена
				</Button>
				<Button onClick={onAccept} color="primary">
					Старт
				</Button>
			</DialogActions>
		</Dialog>
	)
}

const mapStateToProps = state => ({
	opened: selectStartModalIsOpened(state),
	value: selectQuestPersons(state),
});

const mapDispatchToProps = {
	onClose: () => setStartModalOpenedAction(false),
	onAccept: initializePortsAction,
	onChange: updateQuestPersonsAction,
};

export const StartQuestModal = connect(mapStateToProps, mapDispatchToProps)(StartQuestComponent);
