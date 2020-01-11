export const SET_ACTIVE_AUDIO_ACTION = 'SET_ACTIVE_AUDIO_ACTION';
export const setActiveAudioAction = (name, isActive) => ({
  type: SET_ACTIVE_AUDIO_ACTION,
  payload: { name, isActive },
});
