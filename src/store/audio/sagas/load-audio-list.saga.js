import { call, put } from '@redux-saga/core/effects';
import { setAudioListAction } from '../actions';
import { SoundApi } from '../../../api/sound';

export function* loadAudioListSaga() {
  try {
    const audioList = yield call(SoundApi.getAudioList);
    yield put(setAudioListAction(audioList));
  } catch (e) {
    alert(e);
  }
}
