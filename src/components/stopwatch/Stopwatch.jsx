import React from "react";
import * as PropTypes from 'prop-types';
import styled from 'styled-components';

const displayStopWatchValue = (timerTime) => {
	const seconds = ("0" + (Math.floor(timerTime / 1000) % 60)).slice(-2);
	const minutes = ("0" + (Math.floor(timerTime / 60000) % 60)).slice(-2);
	const hours = ("0" + Math.floor(timerTime / 3600000)).slice(-2);
	return `${hours}:${minutes}:${seconds}`;
};

const StopwatchWrapper = styled.div`
	border: 2px solid #fff;
	border-radius: 4px;
	padding: 10px;
	font-weight: bold;
	font-size: 1.125rem;
`;

export class Stopwatch extends React.Component {
	static propTypes = {
		timerOn: PropTypes.bool,
		timerPaused: PropTypes.bool,
		onTimerStart: PropTypes.func,
		onTimerPause: PropTypes.func,
		onTimerStop: PropTypes.func,
	};

	state = {
		timerStart: 0,
		timerTime: 0
	};

	componentDidUpdate(prevProps, prevState, snapshot) {
		if (this.props.timerOn && !prevProps.timerOn) {
			this.startTimer()
		}
		if (!this.props.timerOn && prevProps.timerOn) {
			this.resetTimer();
			this.stopTimer();
		}
		if (this.props.timerPaused && !prevProps.timerPaused) {
			this.stopTimer()
		}
		if (!this.props.timerPaused && prevProps.timerPaused && this.props.timerOn) {
			this.startTimer()
		}
	}

	componentWillUnmount() {
		this.resetTimer();
		this.stopTimer();
	}

	startTimer = () => {
		this.setState({
			timerTime: this.state.timerTime,
			timerStart: Date.now() - this.state.timerTime
		});
		this.timer = setInterval(() => {
			this.setState({
				timerTime: Date.now() - this.state.timerStart
			});
		}, 1000);
	};

	stopTimer = () => {
		clearInterval(this.timer);
	};

	resetTimer = () => {
		this.setState({
			timerStart: 0,
			timerTime: 0
		});
	};

	render() {
		return (
			<StopwatchWrapper>
				{displayStopWatchValue(this.state.timerTime)}
			</StopwatchWrapper>
		);
	}
}
