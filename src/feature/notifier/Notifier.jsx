import { Component } from 'react';
import { connect } from 'react-redux';
import { withSnackbar } from 'notistack';
import { selectNotificationsList } from "../../store/quest/selectors";
import { removeNotificationAction } from "../../store/quest/actions";

class NotifierComponent extends Component {
	displayed = [];

	storeDisplayed = (id) => {
		this.displayed = [ ...this.displayed, id ];
	};

	shouldComponentUpdate({ notifications: newSnacks }, newState, newContext) {
		if (!newSnacks.length) {
			this.displayed = [];
			return false;
		}

		const { notifications: currentSnacks } = this.props;
		let notExists = false;
		for (let i = 0; i < newSnacks.length; i += 1) {
			const newSnack = newSnacks[i];
			if (newSnack.dismissed) {
				this.props.closeSnackbar(newSnack.key);
				this.props.removeNotification(newSnack.key);
			}

			if (notExists) continue;
			notExists = notExists || !currentSnacks.filter(({ key }) => newSnack.key === key).length;
		}
		return notExists;
	}

	componentDidUpdate() {
		const { notifications = [] } = this.props;

		notifications.forEach(({ key, message, options = {} }) => {
			// Do nothing if snackbar is already displayed
			if (this.displayed.includes(key)) return;
			// Display snackbar using notistack
			this.props.enqueueSnackbar(message, {
				...options,
				onClose: (event, reason, key) => {
					if (options.onClose) {
						options.onClose(event, reason, key);
					}
					// // Dispatch action to remove snackbar from redux store
					// this.props.removeNotification(key);
				}
			});
			// Keep track of snackbars that we've displayed
			this.storeDisplayed(key);
		});
	}

	render() {
		return null;
	}
}

const mapStateToProps = state => ({
	notifications: selectNotificationsList(state),
});

const mapDispatchToProps = {
	removeNotification: removeNotificationAction
};

export const Notifier = withSnackbar(connect(
	mapStateToProps,
	mapDispatchToProps,
)(NotifierComponent));
