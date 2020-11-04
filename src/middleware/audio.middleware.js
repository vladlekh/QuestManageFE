import { setActiveAudioAction } from '../store/audio/actions';
import { AudioHelper } from '../utils/audio.helper';
import * as _ from 'lodash';
import { SOUND_EFFECTS } from '../constants';
import { PLAY_AUDIO, PLAY_SOUND_EFFECT, STOP_AUDIO_SMOOTHLY } from './audio.actions';

export const audioMiddleware = (store) => {
  const player = new AudioHelper();

  return next => async (action) => {
    switch (action.type) {
      case PLAY_AUDIO: {
        await player.playSound(action.payload, .3, true);
        if (_.has(SOUND_EFFECTS, action.payload.name)) {
          const { gainValue, ...sound } = { ...SOUND_EFFECTS[action.payload.name] };
          await player.playSound(sound, gainValue, true);
        }
        next(setActiveAudioAction(action.payload.name, true));
        break;
      }
      case PLAY_SOUND_EFFECT: {
        await player.playSound(action.payload, action.payload.gainValue, action.payload.loop);
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
