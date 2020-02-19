import { all, fork } from '@redux-saga/core/effects';
import { loggerSocketSaga } from './logger-socket.saga';

export function* loggerSaga() {
  yield all([
    fork(loggerSocketSaga)
  ]);
}
