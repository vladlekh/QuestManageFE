export const PLAY_AUDIO = 'PLAY_AUDIO';
export const playAudio = ({ endpoint, name }) => ({
  type: PLAY_AUDIO,
  payload: { endpoint, name },
});

export const PLAY_SOUND_EFFECT = 'PLAY_SOUND_EFFECT';
export const playSoundEffect = ({ endpoint, name, gainValue }, loop = false) => ({
  type: PLAY_SOUND_EFFECT,
  payload: { endpoint, name, gainValue, loop },
});

export const STOP_AUDIO_SMOOTHLY = 'STOP_AUDIO_SMOOTHLY';
export const stopAudioSmoothly = ({ name }) => ({
  type: STOP_AUDIO_SMOOTHLY,
  payload: { name },
});
