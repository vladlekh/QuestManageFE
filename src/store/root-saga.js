import { all, fork } from 'redux-saga/effects';
import { appSaga } from './app/sagas';
import { questSaga } from './quest/sagas';
import { lightSaga } from './light/sagas';
import { portsSaga } from './ports/sagas';
import { audioSaga } from './audio/sagas';

export function* rootSaga() {
  yield all([
    fork(appSaga),
    fork(questSaga),
    fork(lightSaga),
    fork(portsSaga),
    fork(audioSaga),
  ]);
}
