import Timer from 'react-compound-timer';
import React from 'react';
import * as PropTypes from 'prop-types';
import { CountdownControls } from './CountdownControls';

const COUNTDOWN = 12 * 60 * 1000;

export function Countdown({ timerOn, timerPaused }) {
  return (
    <Timer initialTime={COUNTDOWN} startImmediately={false} direction="backward">
      {
        ({ start, resume, pause, stop, reset }) => (
          <CountdownControls
            startTimer={start}
            pauseTimer={pause}
            resumeTimer={resume}
            stopTimer={stop}
            resetTimer={reset}
            timerOn={timerOn}
            timerPaused={timerPaused}
          />
        )
      }
    </Timer>
  );
}

Countdown.propTypes = {
  timerOn: PropTypes.bool,
  timerPaused: PropTypes.bool
}
