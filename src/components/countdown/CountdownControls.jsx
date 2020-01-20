import * as React from 'react';
import * as PropTypes from 'prop-types';
import styled from 'styled-components';
import Timer from 'react-compound-timer';

const CoundtdownWrapper = styled.div`
	border: 2px solid rgba(0, 0, 0, 0.87);
	border-radius: 4px;
	padding: 10px;
	font-weight: bold;
	font-size: 1.125rem;
	color: rgba(0, 0, 0, 0.87);
`;

export class CountdownControls extends React.PureComponent {
  static propTypes = {
    timerOn: PropTypes.bool,
    timerPaused: PropTypes.bool,
    startTimer: PropTypes.func,
    resetTimer: PropTypes.func,
    stopTimer: PropTypes.func,
    pauseTimer: PropTypes.func,
    resumeTimer: PropTypes.func,
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.timerOn && !prevProps.timerOn) {
      this.props.startTimer()
    }
    if (!this.props.timerOn && prevProps.timerOn) {
      this.props.resetTimer();
      this.props.stopTimer();
    }
    if (this.props.timerPaused && !prevProps.timerPaused) {
      this.props.pauseTimer()
    }
    if (!this.props.timerPaused && prevProps.timerPaused && this.props.timerOn) {
      this.props.resumeTimer()
    }
  }

  componentWillUnmount() {
    this.props.resetTimer();
    this.props.stopTimer();
  }

  render() {
    return (
      <CoundtdownWrapper>
        <Timer.Minutes/> : <Timer.Seconds/>
      </CoundtdownWrapper>
    );
  }
}
