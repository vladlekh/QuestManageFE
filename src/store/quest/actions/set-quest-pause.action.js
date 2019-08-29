export const SET_QUEST_PAUSE_ACTION = 'SET_QUEST_PAUSE_ACTION';

export const setQuestPauseAction = (value) => ({
	type: SET_QUEST_PAUSE_ACTION,
	payload: { paused: value }
});
