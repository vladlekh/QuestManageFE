import { takeLatest } from '@redux-saga/core/effects';
import { LOAD_AUDIO_LIST_ACTION } from '../actions';
import { loadAudioListSaga } from './load-audio-list.saga';

export function* audioSaga() {
  yield takeLatest(LOAD_AUDIO_LIST_ACTION, loadAudioListSaga);
}
