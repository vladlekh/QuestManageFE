import { setActiveAudioAction } from '../store/audio/actions';
import { AudioHelper } from '../utils/audio.helper';
import * as _ from 'lodash';

export const PLAY_AUDIO = 'PLAY_AUDIO';
export const playAudio = ({ endpoint, name }) => ({
  type: PLAY_AUDIO,
  payload: { endpoint, name },
});

export const STOP_AUDIO_SMOOTHLY = 'STOP_AUDIO_SMOOTHLY';
export const stopAudioSmoothly = ({ name }) => ({
  type: STOP_AUDIO_SMOOTHLY,
  payload: { name },
});

export const SOUND_EFFECTS = {
  room1: {
    name: 'fire',
    endpoint: 'room1/fire',
    gainValue: 0.1,
  },
  room4: {
    name: 'watches',
    endpoint: 'room4/watches',
    gainValue: 0.1,
  },
};

export const audioMiddleware = (store) => {
  const player = new AudioHelper();

  return next => async (action) => {
    switch (action.type) {
      case PLAY_AUDIO: {
        await player.playSound(action.payload, 1);
        if (_.has(SOUND_EFFECTS, action.payload.name)) {
          const { gainValue, ...sound } = { ...SOUND_EFFECTS[action.payload.name] };
          await player.playSound(sound, gainValue);
        }
        next(setActiveAudioAction(action.payload.name, true));
        break;
      }
      case STOP_AUDIO_SMOOTHLY: {
        player.stopSmoothly(action.payload);
        if (_.has(SOUND_EFFECTS, action.payload.name)) {
          const { gainValue, ...sound } = { ...SOUND_EFFECTS[action.payload.name] };
          player.stopSmoothly(sound);
        }
        next(setActiveAudioAction(action.payload.name, false));
        break;
      }
      default:
        break;
    }

    next(action);
  };
};
